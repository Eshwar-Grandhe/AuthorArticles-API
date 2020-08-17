import React, {Component} from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import "./News.css";

// https://news-restapi.herokuapp.com/timesnow/requests?author=a-didar-singh&id=368

// const base_url = "https://localhost:5000/";
const base_url = "https://news-restapi.herokuapp.com/";
const times_base_url = "https://www.timesnownews.com/";
const hindu_base_url = "https://www.thehindu.com/";

class News extends Component {

    constructor(props){
        super(props);
        this.state = {
            times: [],
            hindu: [],
        }
    }

    componentDidMount() {

        // ------------------------- Collecting Times Now data -----------------------------------
        this.props.timesdata.map((data) => {
            var tags = data.authorTag.split('/');
            var aname = data.authorName;
            var collected = [];
            var times_url = base_url+"timesnow/requests?author="+tags[0].trim()+"&id="+tags[1].trim();
            // console.log(times_url);
            axios.get(times_url).then(res => {
                if(res.data.length>10){
                    res.data.splice(10, res.data.length-10);
                }
                var alength = res.data.length; 
                res.data.map((datai) => {
                    // console.log(datai);
                    var actualLink = datai;
                    datai = datai.substring(times_base_url.length);
                    var dataa = datai.split('/');
                    var id = dataa[dataa.length-1];
                    dataa.splice(-1, 1);
                    datai = dataa.join('/');
                    var times_sub_url = base_url+"timesnow/article?articleName="+datai.trim()+"&id="+id.trim();
                    // console.log(times_sub_url);
                    axios.get(times_sub_url).then(res => {
                        // console.log(res.data[0].heading);
                        // console.log(res.data[0].uploadedDate);
                        collected = [...collected, {heading: res.data[0].heading, time: res.data[0].uploadedDate, link: actualLink}];
                        if(collected.length===alength ){
                            this.setState({
                                times: [...this.state.times, {[aname.trim()]: collected}]
                            }, () => {console.log(this.state.times)})
                        }  
                    })
                });
            })         
        });

        // ------------------------------- Collecting The Hindu data ---------------------------
        this.props.hindudata.map((data) => {
            var tags = data.authorTag.split('-');
            var id = tags[tags.length-1];
            id = id.replace('/','');
            tags.splice(tags.length-1, 1);
            var aname = tags.join('-');
            var collected = [];
            var hindu_url = base_url+"thehindu/requests?author="+aname+"&id="+id;
            // console.log(hindu_url);
            axios.get(hindu_url).then(res => {
                if(res.data.length>10){
                    res.data.splice(10, res.data.length-10);
                }
                var alength = res.data.length; 
                res.data.map((datai) => {
                    console.log(datai);
                    var actualLink = datai;
                    datai = datai.substring(hindu_base_url.length);
                    var dataa = datai.split('/');
                    var id = dataa[dataa.length-1];
                    dataa.splice(-1, 1);
                    datai = dataa.join('/');
                    var hindu_sub_url = base_url+"thehindu/article?articleName="+datai.trim()+"&id="+id.trim();
                    // console.log(hindu_sub_url);
                    axios.get(hindu_sub_url).then(res => {
                        // console.log(res.data[0].heading);
                        // console.log(res.data[0].uploadedDate);
                        collected = [...collected, {heading: res.data[0].heading, time: res.data[0].uploadedDate, link: actualLink}];
                        if(collected.length===alength ){
                            this.setState({
                                hindu: [...this.state.hindu, {[aname.trim()]: collected}]
                            }, () => {console.log(this.state.hindu)})
                        }  
                    })
                });
            });
        });
    
    }

    render() {
        return (
            <div>
                <Container>
                    <Row className="text-center">
                        { this.state.times.length>0  && <Col xs={12} className="source-heading-col" ><span className="text-center source-heading">Times Now</span></Col>}
                    </Row>
                    <Row>
                        {this.state.times.map((author) => {
                            var authorName= Object.keys(author)[0];
                            console.log(author[authorName]);
                            return (
                                <>
                                    <Col xs={12} lg={6} className="card">
                                        <h4 className="card-heading">{authorName}</h4>
                                        {author[authorName].map((article) => {
                                            return (
                                            <Row className="card-body">
                                                <Col xs={12}>
                                                    <h5> {article.heading}</h5>
                                                    <p> {article.time} </p>
                                                    
                                                </Col>
                                            </Row>
                                            );
                                        })}
                                    </Col>
                                </>
                            );
                        })}
                    </Row>
                </Container>
            </div>
        )
    }
    
}

export default News
