import React, {Component} from 'react';
import { Container, Row, Col, Form, Button  } from 'react-bootstrap';
import './Home.css';
import { AiFillCloseSquare } from "react-icons/ai";
import { Link } from 'react-router-dom';


const base_url = {
    "times_now": "https://www.timesnownews.com/expert/",
    "the_hindu": "https://www.thehindu.com/profile/author/",
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
        let authorTag = this.atag.current.value;
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
        }
        this.name.current.value = "";
        this.atag.current.value = "";
    };

    onSourceChange = () => {
        if(this.asource.current.value === 'Times Now') {
            this.asbase.current.value = base_url.times_now;
        }else if(this.asource.current.value === 'The Hindu') {
            this.asbase.current.value = base_url.the_hindu;
        }
    }

    deleteTimes = (Name) => {
        this.props.dtimes(Name);
    }

    deleteHindu = (Name) => {
        this.props.dhindu(Name);
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col lg={6}>
                            <h3 className="form-heading">Add Your Favorite Author</h3>
                            <Form className="author-form">
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control size="md" type="text" placeholder="Author's Name" ref={this.name} />
                                    <br />
                                    <Form.Label>Select the source</Form.Label>
                                    <Form.Control as="select" ref={this.asource} onChange={this.onSourceChange}>
                                        <option>Times Now</option>
                                        <option>The Hindu</option>
                                    </Form.Control>
                                    <br />
                                    <Form.Row>
                                        <Col xs={8} ><Form.Control size="md" ref={this.asbase} disabled defaultValue="https://www.timesnownews.com/expert/"></Form.Control> </Col>
                                        <Col xs={4} ><Form.Control size="md" ref={this.atag} placeholder="author tag"></Form.Control></Col>
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
                        <Col lg={{span: 5, offset: 1}} style={{marginBottom: 30}} >
                            <h3 className="form-heading">Authors list</h3>
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
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
    
}

export default Home
