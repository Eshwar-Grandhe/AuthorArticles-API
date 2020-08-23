import React, { Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Home from './components/Home';
import News from './components/News';
import AppBar from './components/AppBar';



class App extends Component{

  constructor(props) {
    super(props);
    
    this.state = {
      timesdata: [],
      hindudata: [],
      livedata:[],
    }
  };

  componentDidMount() {
    var timesd = localStorage.getItem("timesdata");
    var hindud = localStorage.getItem("hindudata");
    var lived = localStorage.getItem("livedata");
    if(timesd !== null) {
      var d = JSON.parse(timesd);
      this.setState({timesdata: d});
    } 
    if(hindud !== null) {
      var h = JSON.parse(hindud);
      this.setState({hindudata: h});
    }
    if(lived !== null) {
      var l = JSON.parse(lived);
      this.setState({livedata: l});
    }
    console.log("App-ComponentDidMount");

  }


  addTimesData = (authorName, authorTag) => {
    this.setState({timesdata: [...this.state.timesdata, {authorName: authorName, authorTag: authorTag}]}, () => {
      localStorage.setItem("timesdata", JSON.stringify(this.state.timesdata));
    });
  } 
  
  addHinduData = (authorName, authorTag) => {
    this.setState({hindudata: [...this.state.hindudata, {authorName: authorName, authorTag: authorTag}]}, () => {
      localStorage.setItem("hindudata", JSON.stringify(this.state.hindudata));
    });
  }

  addLiveData = (authorName, authorTag) => {
    this.setState({livedata: [...this.state.livedata, {authorName: authorName, authorTag: authorTag}]}, () => {
      localStorage.setItem("livedata", JSON.stringify(this.state.livedata));
    });
  }

  deleteTimesData = (data) => {
    var array = [...this.state.timesdata];
    var index = array.indexOf(data);
    if(index !== -1) {
        array.splice(index, 1);
        this.setState({timesdata: array}, () => {
          localStorage.setItem("timesdata", JSON.stringify(array));   
        }); 
    }
  }
  deleteHinduData = (data) => {
    var array = [...this.state.hindudata];
    var index = array.indexOf(data);
    if(index !== -1) {
        array.splice(index, 1);
        this.setState({hindudata: array}, () => {
          localStorage.setItem("hindudata", JSON.stringify(array));   
        });          
    }
  }

  deleteLiveData = (data) => {
    var array = [...this.state.livedata];
    var index = array.indexOf(data);
    if(index!==-1) {
      array.splice(index, 1);
      this.setState({livedata: array}, () => {
        localStorage.setItem("livedata", JSON.stringify(array));
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <AppBar />
          <Switch>
            <Route exact path="/">
              <Home timesdata={this.state.timesdata} 
                hindudata={this.state.hindudata} 
                livedata={this.state.livedata}
                aTimes={this.addTimesData} 
                aHindu={this.addHinduData} 
                aLive={this.addLiveData}
                dtimes={this.deleteTimesData} 
                dhindu={this.deleteHinduData} 
                dlive={this.deleteLiveData}
              />
            </Route>
            <Route path="/news">
              <News timesdata={this.state.timesdata}
               hindudata={this.state.hindudata}
               livedata={this.state.livedata}
               />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
  
}

export default App;
