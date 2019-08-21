import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import Filter from './Filter.js'

const fetch = require('isomorphic-fetch')

class Cars extends React.Component{
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

    // fetch the data to populate the page
    callAPI = () => {
        let fetchURL = "http://localhost:4000/api"
        if( window.location.href.indexOf("/older/") !== -1 ){
            fetchURL += `/older/${window.location.href.split("/older/")[1]}`
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

    // delete function that is referenced in the delete buttons
    deleteItem = (_id) => {
        // make sure they want to delete the car
        if(window.confirm("Are you sure you want to delete this car?\n\nCar _id:" + _id + "\n\nNote, I would likely update some sort of history instead of completely removing it")){
            // use the API to delete
            fetch(`http://localhost:4000/api/delete/${_id}`, {method: 'delete'})
                .then(res => {
                    res.text()
                    // use the API to select all cars in order to update state and force a re-render
                    this.callAPI()
                })
                .catch(err => err)
        }
    }
    
    render(){
        let carArray = this.state.apiResponse;
        // DEBUG:console.log("this.state.apiResponse");
        // DEBUG:console.log(this.state.apiResponse);
        // DEBUG:console.log("carArray.length")
        // DEBUG:console.log(carArray.length)
        // DEBUG:console.log("carArray")
        // DEBUG:console.log(carArray)

        // set up a header
        let header = "Cars"
        if( this.state.filteredByOlderThanYear ){
            header += ` (${this.state.olderThanYear} and earlier)`
        }

        return(
            <>
            <h1>{header}</h1>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Color</th>
                        <th>VIN</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {carArray.map((item, index, state) => {
                        const editURL = `/car/${item._id}`
                        return(
                            <tr key={item._id}>
                                <td>{item.year}</td>
                                <td>{item.make}</td>
                                <td>{item.model}</td>
                                <td>{item.color}</td>
                                <td>{item.VIN}</td>
                                <td>
                                    <Button variant="primary" href={editURL}>Edit</Button>&nbsp;&nbsp;
                                    <Button variant="danger" onClick={() => this.deleteItem(item._id)}>Delete</Button>
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
export default Cars;