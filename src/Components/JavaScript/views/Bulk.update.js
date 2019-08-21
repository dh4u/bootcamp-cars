// this is a page that shows all of the cars in the database and allows you to change their colors... of course that wouldn't really be necessary.
import React from 'react';
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form';
import Filter from './Filter.js'

const fetch = require('isomorphic-fetch')

class BulkUpdate extends React.Component{
    constructor(props){
        super(props)
        const currentDate = new Date(Date.now())
        const currentYear = currentDate.getFullYear()
        this.state = { 
            apiResponse: []
            ,filteredByOlderThanYear: window.location.href.indexOf("/older") !== -1 ? true: false
            ,olderThanYear: window.location.href.indexOf("/older/") !== -1 ? window.location.href.split("/older/")[1] : currentYear
        }
    }

    // fetch the data
    callAPI = () => {
        // base fetchURL... we could be looking at cars that are earlier than a certain year
        let fetchURL = "http://localhost:4000/api"
        // if the URL has "/older/" we can grab the year and append it to fetchURL
        if( window.location.href.indexOf("/older/") !== -1 ){
            fetchURL += `/older/${window.location.href.split("/older/")[1]}`
        // if the URL has "/older" get the currentYear and append it to fetchURL
        }else if ( window.location.href.indexOf("/older") !== -1 ){
            const currentDate = new Date(Date.now())
            fetchURL += `/older/${currentDate.getFullYear()}`
        }
        //console.log(fetchURL)
        fetch(fetchURL)
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: [...JSON.parse(res)] }))
            .catch(err => err)
    }
  
    // get the data after the component mounts
    componentDidMount(){
        this.callAPI();
    }

    save = (_id, color) => {
        // select the current info for the _id in order to use it for the update (fields are required. I was hoping that I could find a way to make them required on insert but not on update...)
        
        let fetchURL = `http://localhost:4000/api/car/${_id}`
        //DEBUG: console.log("fetchURL")
        //DEBUG: console.log(fetchURL)
        fetch(fetchURL)
            .then(res => res.text())
            .then( data => {
                let carArray = JSON.parse(data);
                // set the fetchURL
                fetchURL = `http://localhost:4000/api/update/${carArray._id}`
                // use the fetchURL to update the color
                return fetch(`${fetchURL}?year=${carArray.year}&make=${carArray.make}&model=${carArray.model}&color=${color}&VIN=${carArray.VIN}`, {method: "put"})
                .then(res => {
                    //DEBUG: console.log(res)
                    return res.json()
                })
                .catch(err => err)
            })
            .catch(err => err)
    }

    render(){
        let carArray = this.state.apiResponse;
        let save = this.save;
        // DEBUG:console.log("this.state.apiResponse");
        // DEBUG:console.log(this.state.apiResponse);
        // DEBUG:console.log("carArray.length")
        // DEBUG:console.log(carArray.length)
        // DEBUG:console.log("carArray")
        // DEBUG:console.log(carArray)

        // set up a header
        let header = "Bulk Edit Cars"
        if( this.state.filteredByOlderThanYear ){
            header += ` (${this.state.olderThanYear} and earlier)`
        }
        
        return(
            <>
            <h1>{header}</h1>
            <p>The database is updated with each change to the "Color" inputs</p>
            
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Make</th>
                        <th>Model</th>
                        <th>VIN</th>
                        <th>Color</th>
                    </tr>
                </thead>
                <tbody>
                    {carArray.map((item, index, state) => {
                        return(
                            <tr key={item._id}>
                                <td>{item.year}</td>
                                <td>{item.make}</td>
                                <td>{item.model}</td>
                                <td>{item.VIN}</td>
                                <td style={{textAlign: 'left'}}>
                                    <Form.Control id={`color${item._id}`} name="color" key={item._id} defaultValue={item.color} style={{width: 200}} onChange={() => {save(item._id, document.getElementById(`color${item._id}`).value);}} />
                                    Originally: "{item.color}"
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Filter />
            </>
        )
    }
}
export default BulkUpdate