import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import '../../CSS/App.css';
// import the various components that we could be routed to
import BulkUpdate from './Bulk.update.js';
import Car from './Car.js';
import Cars from './Cars.js';
import Navigation from './Navigation.js';

class App extends Component {

render(){
    // determine which page we are on and pass it to the nav in order to highlight it
    let currentPage = ""
    let URL = window.location.href
    if( URL.indexOf("bulkUpdate") !== -1 ){
        currentPage = "bulkUpdate"
    }else if( URL.indexOf("/0") !== -1 ){
        currentPage = "add"
    }else if( URL.indexOf("/cars/") !== -1 ){
        currentPage = "home"
    }else{
        currentPage = ""
    }

    //DEBUG:console.log("currentPage in App.js")
    //DEBUG:console.log(currentPage)

    return(
        <div className="App">
            <Navigation currentPage={currentPage} />
            <Router>
                <Route path="/" exact component={Cars} />
                <Route path="/car/" component={Car} />
                <Route path="/cars/" exact component={Cars} />
                <Route path="/cars/bulkUpdate/" component={BulkUpdate} />
                <Route path="/cars/older/:year" exact component={Cars} />
            </Router>
        </div>
        )
    }
}

export default App;