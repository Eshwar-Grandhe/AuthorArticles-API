import React, {Component} from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import Footer from './Footer';
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
            live: [],
            hydnews: [],
            tv9: [],
            tv6: [],
            times_illegal_entries: 0,
            hindu_illegal_entries: 0,
            live_illegal_entries: 0,
            hydnews_illegal_entries: 0,
            tv9_illegal_entries: 0,
            tv6_illegal_entries: 0,
        }
    }



    componentDidMount() {
        var timesFallback, hinduFallback, liveFallback, hydnewsFallback, tv9Fallback, tv6Fallback;
        if(this.props.timesdata.length===0){
            var timesd = localStorage.getItem("timesdata");
            if(timesd===null){
                timesFallback = [];
            }else {
                var d = JSON.parse(timesd);
                timesFallback = d;
            }
        }else {
            timesFallback = this.props.timesdata;
        }
        if(this.props.hindudata.length===0) {
            var hindud = localStorage.getItem("hindudata");
            if(hindud===null){
                hinduFallback = [];
            }else {
                var h = JSON.parse(hindud);
                hinduFallback = h;
            }
        }else {
            hinduFallback = this.props.hindudata;
        }
        if(this.props.livedata.length===0) {
            var lived = localStorage.getItem("livedata");
            if(lived===null){
                liveFallback = [];
            }else {
                var l = JSON.parse(lived);
                liveFallback = l;
            }
        }else {
            liveFallback = this.props.livedata;
        }
        if(this.props.hydnewsdata.length===0) {
            var hydnewsd = localStorage.getItem("hydnewsdata");
            if(hydnewsd===null){
                hydnewsFallback = [];
            }else {
                var hy = JSON.parse(hydnewsd);
                hydnewsFallback = hy;
            }
        }else {
            hydnewsFallback = this.props.hydnewsdata;
        }
        if(this.props.tv9data.length===0) {
            var tv9d = localStorage.getItem("tv9data");
            if(tv9d===null){
                tv9Fallback = [];
            }else {
                var t9 = JSON.parse(tv9d);
                tv9Fallback = t9;
            }
        }else {
            tv9Fallback = this.props.tv9data;
        }
        if(this.props.tv6data.length===0) {
            var tv6d = localStorage.getItem("tv6data");
            if(tv6d===null){
                tv6Fallback = [];
            }else {
                var t6 = JSON.parse(tv6d);
                tv6Fallback = t6;
            }
        }else {
            tv6Fallback = this.props.tv6data;
        }

        // ------------------------- Collecting Times Now data -----------------------------------
        // axios.get(url, { headers: {'Access-Control-Allow-Origin': *} } )
        timesFallback.map((data) => {
            var tags = data.authorTag.split('/');
            var aname = data.authorName;
            var collected = [];
            var times_url = base_url+"timesnow/requests?author="+tags[0].trim()+"&id="+tags[1].trim();
            // console.log(times_url);
            axios.get(times_url, { headers: {'Access-Control-Allow-Origin': '*'} }).then(res => {

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
                    axios.get(times_sub_url, { headers: {'Access-Control-Allow-Origin': '*'} }).then(res => {
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
        hinduFallback.map((data) => {
            var tags = data.authorTag.split('-');
            var id = tags[tags.length-1];
            id = id.replace('/','');
            tags.splice(tags.length-1, 1);
            var aname = tags.join('-');
            var collected = [];
            var hindu_url = base_url+"thehindu/requests?author="+aname+"&id="+id;
            // console.log(hindu_url);
            axios.get(hindu_url, { headers: {'Access-Control-Allow-Origin': '*'} }).then(res => {
                if(res.data.length>10){
                    res.data.splice(10, res.data.length-10);
                }
                var alength = res.data.length; 
                res.data.map((datai) => {
                    var actualLink = datai;
                    datai = datai.substring(hindu_base_url.length);
                    var dataa = datai.split('/');
                    var id = dataa[dataa.length-1];
                    var fallbackTitle = dataa[dataa.length-2];
                    fallbackTitle = fallbackTitle.replace('-'," ");
                    dataa.splice(-1, 1);
                    datai = dataa.join('/');
                    var hindu_sub_url = base_url+"thehindu/article?articleName="+datai.trim()+"&id="+id.trim();
                    // console.log(hindu_sub_url);
                    axios.get(hindu_sub_url, { headers: {'Access-Control-Allow-Origin': '*'} }).then(res => {
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
        // ---------------------------------------- LiveMint -----------------------------------------------------------------
        liveFallback.map((data) => {
            var live_url = base_url+"livemint/author?name="+data.authorTag;
            axios.get(live_url, { headers: {'Access-Control-Allow-Origin': '*'} }).then(res => {
                if(res.data.length>15){
                    res.data.splice(15, res.data.length-15);
                }
                var collected = [];
                console.log(res.data);
                res.data.map((result) => {
                    var ameta = result.readtime + " | " + result.uploadtime;
                    collected = [...collected, {heading: result.heads, time: ameta, link: result.articlelink}];
                });
                this.setState({
                    live: [...this.state.live, {[data.authorName]: collected}]
                });
            }).catch(error => {
                console.log(error);
                this.setState({
                    live_illegal_entries: this.state.live_illegal_entries+1,
                })
            });
        });
        //------------------------------------- HydNews------------------------------------------------
        hydnewsFallback.map((data) => {
            var hyd_url = base_url+"hydnews/author?authorname="+data.authorTag;
            axios.get(hyd_url, { headers: {'Access-Control-Allow-Origin': '*'} }).then(res => {
                if(res.data.length>15){
                    res.data.splice(15, res.data.length-15);
                }
                var collected = [];
                console.log(res.data);
                res.data.map((result) => {
                    collected = [...collected, {heading: result.article, time: result.uploadedDate, link: result.articlelink}];
                });
                this.setState({
                    hydnews: [...this.state.hydnews, {[data.authorName]: collected}]
                });
            }).catch(error => {
                console.log(error);
                this.setState({
                    hydnews_illegal_entries: this.state.hydnews_illegal_entries+1,
                })
            });
        });
        //---------------------------------- tv9 ---------------------------------------------------
        tv9Fallback.map((data) => {
            var tv9_url = base_url+"tv9/author?authorname="+data.authorTag;
            axios.get(tv9_url, { headers: {'Access-Control-Allow-Origin': '*'} }).then(res => {
                if(res.data.length>15){
                    res.data.splice(15, res.data.length-15);
                }
                var collected = [];
                console.log(res.data);
                res.data.map((result) => {
                    collected = [...collected, {heading: result.article, time: result.uploadedDate, link: result.articlelink}];
                });
                this.setState({
                    tv9: [...this.state.tv9, {[data.authorName]: collected}]
                });
            }).catch(error => {
                console.log(error);
                this.setState({
                    tv9_illegal_entries: this.state.tv9_illegal_entries+1,
                })
            });
        });
        //----------------------------------- tv6 ------------------------------------------------------
        tv6Fallback.map((data) => {
            var tv6_url = base_url+"tv6/author?authorname="+data.authorTag;
            axios.get(tv6_url, { headers: {'Access-Control-Allow-Origin': '*'} }).then(res => {
                if(res.data.length>15){
                    res.data.splice(15, res.data.length-15);
                }
                var collected = [];
                console.log(res.data);
                res.data.map((result) => {
                    collected = [...collected, {heading: result.heading, time: result.uploadedDate, link: result.articlelink}];
                });
                this.setState({
                    tv6: [...this.state.tv6, {[data.authorName]: collected}]
                });
            }).catch(error => {
                console.log(error);
                this.setState({
                    tv6_illegal_entries: this.state.tv6_illegal_entries+1,
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
                        { this.state.times.length>0  && <Col xs={12} className="source-heading-col" ><span className="text-center source-heading">Times Now</span><hr/></Col>}
                        
                    </Row>
                    <Row>
                        {this.state.times.map((author) => {
                            var authorName= Object.keys(author)[0];
                            console.log(author[authorName]);
                            return (
                                <>
                                    <Col xs={12} lg={6} className="card-margin">
                                        <Card className="article-card">
                                            <Card.Body style={{height: 500}}>
                                                <Card.Title className="text-center author-heading"> {authorName} </Card.Title>
                                                <hr/>
                                                <div className="scrollable">
                                                    {author[authorName].map((article) => {
                                                        return (
                                                            <div className="article-card">
                                                                <a href={article.link} target="_blank" className="article-title">{article.heading}</a> 
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
                        { this.state.hindu.length>0  && <Col xs={12} className="source-heading-col" ><span className="text-center source-heading">The Hindu</span><hr/></Col>}
                    </Row>
                    <Row>
                        {this.state.hindu.map((author) => {
                            var authorName= Object.keys(author)[0];
                            console.log(author[authorName]);
                            return (
                                <>
                                    <Col xs={12} lg={6} className="card-margin">
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
                                                                <a href={article.link} target="_blank" className="article-title">{article.heading}</a> 
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
                        { this.state.live.length>0  && <Col xs={12} className="source-heading-col" ><span className="text-center source-heading">LiveMint</span><hr/></Col>}
                    </Row>
                    <Row>
                        {this.state.live.map((author) => {
                            var authorName= Object.keys(author)[0];
                            console.log(author[authorName]);
                            return (
                                <>
                                    <Col xs={12} lg={6} className="card-margin">
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
                                                                <a href={article.link} target="_blank" className="article-title">{article.heading}</a> 
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
                        { this.state.hydnews.length>0  && <Col xs={12} className="source-heading-col" ><span className="text-center source-heading">Hydnews</span><hr/></Col>}
                    </Row>
                    <Row>
                        {this.state.hydnews.map((author) => {
                            var authorName= Object.keys(author)[0];
                            console.log(author[authorName]);
                            return (
                                <>
                                    <Col xs={12} lg={6} className="card-margin">
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
                                                                <a href={article.link} target="_blank" className="article-title">{article.heading}</a> 
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
                        { this.state.tv9.length>0  && <Col xs={12} className="source-heading-col" ><span className="text-center source-heading">Tv9</span><hr/></Col>}
                    </Row>
                    <Row>
                        {this.state.tv9.map((author) => {
                            var authorName= Object.keys(author)[0];
                            console.log(author[authorName]);
                            return (
                                <>
                                    <Col xs={12} lg={6} className="card-margin">
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
                                                                <a href={article.link} target="_blank" className="article-title">{article.heading}</a> 
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
                        { this.state.tv6.length>0  && <Col xs={12} className="source-heading-col" ><span className="text-center source-heading">Tv6</span><hr/></Col>}
                    </Row>
                    <Row>
                        {this.state.tv6.map((author) => {
                            var authorName= Object.keys(author)[0];
                            console.log(author[authorName]);
                            return (
                                <>
                                    <Col xs={12} lg={6} className="card-margin">
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
                                                                <a href={article.link} target="_blank" className="article-title">{article.heading}</a> 
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
                <Footer />
            </div>
        )
    }
    
}

export default News
