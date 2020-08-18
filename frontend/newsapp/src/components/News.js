import React, {Component} from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
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
            times_illegal_entries: 0,
            hindu_illegal_entries: 0,
        }
    }

    componentDidMount() {
        
        console.log(this.props.timesdata.length);
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
            }).catch(error => {
                console.log(error);
                this.setState({
                    times_illegal_entries: this.state.times_illegal_entries+1,
                })
            });         
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
                    var fallbackTitle = dataa[dataa.length-2];
                    fallbackTitle.replace('-'," ");
                    dataa.splice(-1, 1);
                    datai = dataa.join('/');
                    var hindu_sub_url = base_url+"thehindu/article?articleName="+datai.trim()+"&id="+id.trim();
                    // console.log(hindu_sub_url);
                    axios.get(hindu_sub_url).then(res => {
                        // console.log(res.data[0].heading);
                        // console.log(res.data[0].uploadedDate);
                        if(res.data[0].heading==="") res.data[0].heading=fallbackTitle;
                        collected = [...collected, {heading: res.data[0].heading, time: res.data[0].uploadedDate, link: actualLink}];
                        if(collected.length===alength ){
                            this.setState({
                                hindu: [...this.state.hindu, {[aname.trim()]: collected}]
                            }, () => {console.log(this.state.hindu)})
                        }  
                    })
                });
            }).catch(error => {
                console.log(error);
                this.setState({
                    hindu_illegal_entries: this.state.hindu_illegal_entries+1,
                })
            });      
        });
    
    }

    render() {
        if((this.props.timesdata.length-this.state.times_illegal_entries)!==this.state.times.length || (this.props.hindudata.length-this.state.hindu_illegal_entries)!==this.state.hindu.length){
            return (
                <div className="waiting text-center">
                    <h2>Kindly wait for sometime, We are picking everything for you..</h2>
                    <Spinner animation="grow" variant="primary" />
                </div>
            );
        }
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
                                    <Col xs={12} lg={6} >
                                        <Card className="article-card">
                                            <Card.Body style={{height: 500}}>
                                                <Card.Title className="text-center author-heading"> {authorName} </Card.Title>
                                                <hr/>
                                                <div className="scrollable">
                                                    {author[authorName].map((article) => {
                                                        return (
                                                            <div className="article-card">
                                                                <a href={article.link} className="article-title">{article.heading}</a> 
                                                                <br/>
                                                                <span className="article-time">{article.time}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </Card.Body>
                                        </Card>
                                        
                                    </Col>
                                </>
                            );
                        })}
                    </Row>
                    <Row className="text-center">
                        { this.state.hindu.length>0  && <Col xs={12} className="source-heading-col" ><span className="text-center source-heading">The Hindu</span></Col>}
                    </Row>
                    <Row>
                        {this.state.hindu.map((author) => {
                            var authorName= Object.keys(author)[0];
                            console.log(author[authorName]);
                            return (
                                <>
                                    <Col xs={12} lg={6} >
                                        <Card className="article-card">
                                            <Card.Body style={{height: 500}}>
                                                <Card.Title className="text-center author-heading"> {authorName} </Card.Title>
                                                <hr/>
                                                <div className="scrollable">
                                                    {author[authorName].map((article) => {
                                                        if(article.heading===''){
                                                            article.heading = "Unable to pick the data!!";
                                                        }
                                                        return (
                                                            <div className="article-card">
                                                                <a href={article.link} className="article-title">{article.heading}</a> 
                                                                <br/>
                                                                <span className="article-time">{article.time}</span>
                                                            </div>
                                                        
                                                        );
                                                    })}
                                                </div>
                                            </Card.Body>
                                        </Card>
                                        
                                    </Col>
                                </>
                            );
                        })}
                    </Row>
                    <Row style={{height: 100}}></Row>
                </Container>
            </div>
        )
    }
    
}

export default News
