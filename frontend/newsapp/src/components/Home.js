import React, {Component} from 'react';
import { Container, Row, Col, Form, Button  } from 'react-bootstrap';
import './Home.css';
import { AiFillCloseSquare } from "react-icons/ai";
import { Link } from 'react-router-dom';


const base_url = {
    "times_now": "https://www.timesnownews.com/expert/",
    "the_hindu": "https://www.thehindu.com/profile/author/",
    "livemint": "https://www.livemint.com/Search/Link/Author/",
};

class Home extends Component {

    constructor(props) {
        super(props);
        this.name = React.createRef(); 
        this.asbase = React.createRef();
        this.atag = React.createRef();
        this.asource = React.createRef();
    }

    onSave = (event) => {
        let authorName = this.name.current.value;
        let full_url = this.atag.current.value;
        let authorTag;
        if(this.asource.current.value === 'Times Now') {
            if(full_url.substring(0, base_url.times_now.length)===base_url.times_now){
                authorTag = full_url.substring(base_url.times_now.length);
            }else{
                alert("URL is not of Times Now, Please enter the right one");
                return;
            }
        }else if(this.asource.current.value === 'The Hindu') {
            if(full_url.substring(0, base_url.the_hindu.length)===base_url.the_hindu){
                authorTag = full_url.substring(base_url.the_hindu.length);
            }else{
                alert("URL is not of The Hindu, Please enter the right one");
                return;
            }
        }else if(this.asource.current.value === 'Livemint') {
            if(full_url.substring(0, base_url.livemint.length)===base_url.livemint){
                authorTag = full_url.substring(base_url.livemint.length);
            }else{
                alert("URL is not of Livemint, Please enter the right one");
                return;
            }
        }
        if(authorTag.charAt(0)==='/') {
            authorTag = authorTag.slice(1);
        }
        // console.log(authorName+'-'+authorSource+'-'+authorTa g);
        if(authorTag === '' || authorName === '') {
            alert("Please fill the form completely");
            return; 
        }
        if(this.asource.current.value === 'Times Now') {
            if(this.props.timesdata.some((e) => {return JSON.stringify({authorName: authorName, authorTag: authorTag})===JSON.stringify(e)})) {
                alert("This Entry already exists");
                return; 
            } 
            this.props.aTimes(authorName, authorTag);
            //this.props.timesdata.push({authorName: authorName, authorTag: authorTag});
            
        }else if(this.asource.current.value === 'The Hindu') {
            if(this.props.hindudata.some((e) => {return JSON.stringify({authorName: authorName, authorTag: authorTag})===JSON.stringify(e)})) {
                alert("This Entry already exists");
                return; 
            }
            this.props.aHindu(authorName, authorTag);
        }else if(this.asource.current.value === 'Livemint') {
            if(this.props.livedata.some((e) => {return JSON.stringify({authorName: authorName, authorTag: authorTag})===JSON.stringify(e)})) {
                alert("This Entry already exists");
                return; 
            }
            this.props.aLive(authorName, authorTag);
        }
        this.name.current.value = "";
        this.atag.current.value = "";
    };

    

    deleteTimes = (Name) => {
        this.props.dtimes(Name);
    }

    deleteHindu = (Name) => {
        this.props.dhindu(Name);
    }

    deleteLive = (Name) => {
        this.props.dlive(Name);
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col lg={6} className="entrycol">
                            <h3 className="form-heading text-center">Add Your Favorite Author</h3>
                            <hr />

                            <Form className="author-form">
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control size="md" type="text" placeholder="Author's Name" ref={this.name} />
                                    <br />
                                    <Form.Label>Select the source</Form.Label>
                                    <Form.Control as="select" ref={this.asource}>
                                        <option>Times Now</option>
                                        <option>The Hindu</option>
                                        <option>Livemint</option>
                                    </Form.Control>
                                    <br />
                                    <Form.Row>
                                        {/* <Col xs={8} ><Form.Control size="md" ref={this.asbase} disabled defaultValue="https://www.timesnownews.com/expert/"></Form.Control> </Col> */}
                                        <Col xs={12} ><Form.Control size="md" ref={this.atag} placeholder="Author's Profile URL"></Form.Control></Col>
                                    </Form.Row>
                                    <br />
                                    <Form.Row>
                                        <Col xs={2}><Button variant="outline-success" className="form-button" onClick={this.onSave} >Save</Button></Col>
                                        <Col xs={8}></Col>
                                        <Col xs={2}><Button variant="outline-primary" className="form-button" as={Link} to="/news" >Next</Button></Col>
                                    </Form.Row>
                                    
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col lg={{span: 5, offset: 1}} style={{marginBottom: 30, marginTop: 40}} >
                            <h3 className="form-heading text-center">Authors list</h3>
                            <hr/>
                            { this.props.timesdata.length>0 && (
                                <h5 className="form-sub-heading">Times Now Authors</h5>
                            ) }
                            {this.props.timesdata.map((data, idx) => (
                                <span key={idx} className="tagbox-span">
                                    <a className="tagbox-name" target="_blank" href={base_url.times_now+data.authorTag} >
                                        <span>{data.authorName}</span>
                                    </a>
                                    <a><AiFillCloseSquare className="cross" onClick={() => this.deleteTimes(data)}/></a>
                                </span>
                            ))}
                            { this.props.hindudata.length>0 && (<h5 className="form-sub-heading">The Hindu Authors</h5>) }  
                            {this.props.hindudata.map((data, idx) => (
                                <span key={idx} className="tagbox-span">
                                    <a className="tagbox-name" target="_blank" href={base_url.the_hindu+data.authorTag} >
                                        <span>{data.authorName}</span>
                                    </a>
                                    <a><AiFillCloseSquare className="cross" onClick={() => this.deleteHindu(data)}/></a>
                                </span>
                            ))}
                            { this.props.livedata.length>0 && (<h5 className="form-sub-heading">LiveMint Authors</h5>) }  
                            {this.props.livedata.map((data, idx) => (
                                <span key={idx} className="tagbox-span">
                                    <a className="tagbox-name" target="_blank" href={base_url.livemint+data.authorTag} >
                                        <span>{data.authorName}</span>
                                    </a>
                                    <a><AiFillCloseSquare className="cross" onClick={() => this.deleteLive(data)}/></a>
                                </span>
                            ))}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
    
}

export default Home
