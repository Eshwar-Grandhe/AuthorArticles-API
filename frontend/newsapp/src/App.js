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
      livedata: [],
      hydnewsdata: [],
      tv9data: [],
      tv6data: [],
    }

  };

  componentDidMount() {
    var timesd = localStorage.getItem("timesdata");
    var hindud = localStorage.getItem("hindudata");
    var lived = localStorage.getItem("livedata");
    var hydnewsd = localStorage.getItem("hydnewsdata");
    var tv9d = localStorage.getItem("tv9data");
    var tv6d = localStorage.getItem("tv6data");
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
    if(hydnewsd !== null) {
      var l = JSON.parse(hydnewsd);
      this.setState({hydnewsdata: l});
    }if(tv9d !== null) {
      var l = JSON.parse(tv9d);
      this.setState({tv9data: l});
    }if(tv6d !== null) {
      var l = JSON.parse(tv6d);
      this.setState({tv6data: l});
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

  addHydNewsData = (authorName, authorTag) => {
    this.setState({hydnewsdata: [...this.state.hydnewsdata, {authorName: authorName, authorTag: authorTag}]}, () => {
      localStorage.setItem("hydnewsdata", JSON.stringify(this.state.hydnewsdata));
    });
  }

  addTv9Data = (authorName, authorTag) => {
    this.setState({tv9data: [...this.state.tv9data, {authorName: authorName, authorTag: authorTag}]}, () => {
      localStorage.setItem("tv9data", JSON.stringify(this.state.tv9data));
    });
  }

  addTv6Data = (authorName, authorTag) => {
    this.setState({tv6data: [...this.state.tv6data, {authorName: authorName, authorTag: authorTag}]}, () => {
      localStorage.setItem("tv6data", JSON.stringify(this.state.tv6data));
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

  deleteHydNewsData = (data) => {
    var array = [...this.state.hydnewsdata];
    var index = array.indexOf(data);
    if(index!==-1) {
      array.splice(index, 1);
      this.setState({hydnewsdata: array}, () => {
        localStorage.setItem("hydnewsdata", JSON.stringify(array));
      });
    }
  }

  deleteTv9Data = (data) => {
    var array = [...this.state.tv9data];
    var index = array.indexOf(data);
    if(index!==-1) {
      array.splice(index, 1);
      this.setState({tv9data: array}, () => {
        localStorage.setItem("tv9data", JSON.stringify(array));
      });
    }
  }

  deleteTv6Data = (data) => {
    var array = [...this.state.tv6data];
    var index = array.indexOf(data);
    if(index!==-1) {
      array.splice(index, 1);
      this.setState({tv6data: array}, () => {
        localStorage.setItem("tv6data", JSON.stringify(array));
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
                hydnewsdata={this.state.hydnewsdata}
                tv9data={this.state.tv9data}
                tv6data={this.state.tv6data}

                aTimes={this.addTimesData} 
                aHindu={this.addHinduData} 
                aLive={this.addLiveData}
                aHydNewsData={this.addHydNewsData}
                atv9Data={this.addTv9Data}
                atv6Data={this.addTv6Data}

                dtimes={this.deleteTimesData} 
                dhindu={this.deleteHinduData} 
                dlive={this.deleteLiveData}
                dHydNewsData={this.deleteHydNewsData}
                dTv6Data={this.deleteTv6Data}
                dTv9Data={this.deleteTv9Data}
              />
            </Route>
            <Route path="/news">
              <News timesdata={this.state.timesdata}
                hindudata={this.state.hindudata}
                livedata={this.state.livedata}
                hydnewsdata={this.state.hydnewsdata}
                tv9data={this.state.tv9data}
                tv6data={this.state.tv6data}
               />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
  
}

export default App;
