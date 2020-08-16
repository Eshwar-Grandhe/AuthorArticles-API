import React, {Component} from 'react'
import axios from 'axios';

// https://news-restapi.herokuapp.com/timesnow/requests?author=a-didar-singh&id=368

const base_url = "localhost:5000/";
// const base_url = "https://news-restapi.herokuapp.com/";

class News extends Component {

    constructor(props){
        super(props);

    }

    componentDidMount() {
        this.props.timesdata.map((data) => {
            var tags = data.authorTag.split('/');
            var times_url = base_url+"timesnow/requests?author="+tags[0].trim()+"&id="+tags[1].trim();
            console.log(times_url);
            const link = "http://news-restapi.herokuapp.com/";
            this.getData(times_url);
        })
    }

    getData = (url) => {
        axios.get(url).then(res => {
            console.log(res);
        });
    }
    // getData = async (url) => {
    //     axios.get(url).then(res => {
    //         console.log(res);
    //     });

    // }

    render() {
        return (
            <div>
                
            </div>
        )
    }
    
}

export default News
