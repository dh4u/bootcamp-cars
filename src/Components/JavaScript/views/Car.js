import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

const fetch = require('isomorphic-fetch')

class Car extends React.Component{
    constructor(props){
        super(props)
        // set up a date and the currentYear
        const d = new Date();
        const currentYear = d.getFullYear()
        // get an array of years from the currentYear to 21 years previous
        let yearArray = []
        for(let i = currentYear; i > currentYear - 21; i--){
            yearArray.push(i)
        }
        // split the URL in order to find the _id
        const pathArray = props.location.pathname.split("/")
        const _id = pathArray[pathArray.length-1]
        // DEBUG:console.log(pathArray)
        // DEBUG:console.log(pathArray.length)
        // DEBUG:console.log(pathArray[pathArray.length-1])
        this.state = { 
            _id: _id
            ,year: ""
            ,make: ""
            ,model: ""
            ,yearArray: yearArray
        }
    }

    // fetch the data
    callAPI = () => {
        let fetchURL = `http://localhost:4000/api/car/${this.state._id}`
        fetch(fetchURL)
            .then(res => res.text())
            .then(res => {
                //DEBUG: console.log(res)
                //DEBUG: console.log(typeof(res))
                //DEBUG: console.log([res])
                //DEBUG: console.log(JSON.parse(res))
                let result = JSON.parse(res);
                this.setState({ 
                    year: result.year 
                    ,make: result.make
                    ,model: result.model
                    ,color: result.color
                    ,VIN: result.VIN
                })
                //DEBUG: console.log([...JSON.parse(res)])
            })
            .catch(err => err)
    }

    // save the car. this handles inserts and updates 
    save = () => {
        // get the URL based on the _id value
        let fetchURL = (this.state._id === "0") ? `http://localhost:4000/api/insert` : `http://localhost:4000/api/update/${this.state._id}`
        // get the fetchMethod based on the _id value as well
        let fetchMethod = (this.state._id === "0") ? "post" : "put"
        
        // use the API to insert or update
        fetch(`${fetchURL}?year=${document.getElementById('year').value}&make=${document.getElementById('make').value}&model=${document.getElementById('model').value}&color=${document.getElementById('color').value}&VIN=${document.getElementById('VIN').value}`, {method: fetchMethod})
        .then(res => {
            // redirect to the home page
            window.location = "/cars/"
            //console.log(res)
        })
        .catch(err => err)
    }
  
    // get the data after the component mounts
    componentDidMount(){
        this.callAPI();
        //alert("called callAPI")
    }

    render(){
        let yearArray = this.state.yearArray
        let save = this.save
        let label = (this.state._id === "0") ? "Insert a Car" : "Update this Car"
        return(
            <>
                <Form>
                    <Row>
                        <Col sm="8">
                            {label}
                        </Col>
                    </Row>
                    <Row><Col sm="8">&nbsp;</Col></Row>
                    <Row>
                        <Col sm="2">
                            <Form.Label>Year</Form.Label>
                        </Col>
                        <Col sm="4">
                            <Form.Control id="year" name="year" as="select">
                                {yearArray.map((item, index, state) => {
                                    return(
                                        <option key={item} value={item}>{item}</option>
                                    )
                                })}
                            </Form.Control>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="2">
                            <Form.Label>Make</Form.Label>
                        </Col>
                        <Col sm="4">
                            <Form.Control id="make" name="make" defaultValue={this.state.make} onChange={() => {return false}} />
                            {/* <Form.Control as="select">
                            <option value=""></option>
                            <option value="ACURA">ACURA</option>
                            <option value="ASTON MARTIN">ASTON MARTIN</option>
                            <option value="AUDI">AUDI</option>
                            <option value="BENTLEY">BENTLEY</option>
                            <option value="BMW">BMW</option>
                            <option value="BUICK">BUICK</option>
                            <option value="CADILLAC">CADILLAC</option>
                            <option value="CHEVROLET">CHEVROLET</option>
                            <option value="CHRYSLER">CHRYSLER</option>
                            <option value="DODGE">DODGE</option>
                            <option value="FERRARI">FERRARI</option>
                            <option value="FORD">FORD</option>
                            <option value="GMC">GMC</option>
                            <option value="HONDA">HONDA</option>
                            <option value="HUMMER">HUMMER</option>
                            <option value="HYUNDAI">HYUNDAI</option>
                            <option value="INFINITI">INFINITI</option>
                            <option value="ISUZU">ISUZU</option>
                            <option value="JAGUAR">JAGUAR</option>
                            <option value="JEEP">JEEP</option>
                            <option value="KIA">KIA</option>
                            <option value="LAMBORGHINI">LAMBORGHINI</option>
                            <option value="LAND ROVER">LAND ROVER</option>
                            <option value="LEXUS">LEXUS</option>
                            <option value="LINCOLN">LINCOLN</option>
                            <option value="LOTUS">LOTUS</option>
                            <option value="MASERATI">MASERATI</option>
                            <option value="MAYBACH">MAYBACH</option>
                            <option value="MAZDA">MAZDA</option>
                            <option value="MERCEDES-BENZ">MERCEDES-BENZ</option>
                            <option value="MERCURY">MERCURY</option>
                            <option value="MINI">MINI</option>
                            <option value="MITSUBISHI">MITSUBISHI</option>
                            <option value="NISSAN">NISSAN</option>
                            <option value="PONTIAC">PONTIAC</option>
                            <option value="PORSCHE">PORSCHE</option>
                            <option value="ROLLS-ROYCE">ROLLS-ROYCE</option>
                            <option value="SAAB">SAAB</option>
                            <option value="SATURN">SATURN</option>
                            <option value="SUBARU">SUBARU</option>
                            <option value="SUZUKI">SUZUKI</option>
                            <option value="TOYOTA">TOYOTA</option>
                            <option value="VOLKSWAGEN">VOLKSWAGEN</option>
                            <option value="VOLVO">VOLVO</option>
                            </Form.Control> */}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="2">
                            <Form.Label>Model</Form.Label>
                        </Col>
                        <Col sm="4">
                            <Form.Control id="model" name="model" defaultValue={this.state.model} onChange={() => {return false}} />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="2">
                            <Form.Label>Color</Form.Label>
                        </Col>
                        <Col sm="4">
                        <Form.Control id="color" name="color" defaultValue={this.state.color} onChange={() => {return false}} />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="2">
                            <Form.Label>VIN</Form.Label>
                        </Col>
                        <Col sm="4">
                        <Form.Control id="VIN" name="VIN" defaultValue={this.state.VIN} onChange={() => {return false}} />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="2">

                        </Col>
                        <Col sm="4">
                            <br />
                            <Button onClick={() => save()}>Save</Button>
                        </Col>
                    </Row>
                </Form>
            </>
        )
    }
}
export default Car