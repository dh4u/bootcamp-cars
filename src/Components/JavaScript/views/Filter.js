// this is a filter for distinct years of cars in the database
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'

const fetch = require('isomorphic-fetch')

class Filter extends React.Component{
    constructor(props){
        super(props)
        this.state = {distinctYears: []}
    }

    // get the data after the component mounts
    componentDidMount(){
        fetch("http://localhost:4000/api/years")
            .then(res => res.text())
            .then(res => this.setState({distinctYears: res}))
            .catch(err => err)
    }

    render(){
        // get distinctYears from state
        let distinctYears = this.state.distinctYears
        // mutate distinctYears into something iterable
        distinctYears = distinctYears.toString().split(",")
        // set up the filterURL based on the page we are on (I'm only using the filter on bulkupdate and home)
        let filterURL = window.location.href.toLowerCase().indexOf("bulkupdate") !== -1 ? "/cars/bulkupdate/older/" : "/cars/older/"
        //DEBUG: console.log(filterURL)
        //DEBUG: console.log(window.location.href)
        //DEBUG: console.log(window.location.href.indexOf("bulkUpdate"))
        return(
            <>
                {/* DEBUG: Filter.js {distinctYears}<br /> {distinctYears[0]}<br /> {typeof(distinctYears)} {distinctYears.toString().split(",").length}<br /> */}
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Show Cars from...
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {distinctYears.map((item, index, state) => {
                            //console.log(item.toString().split(","))
                            let numericYearValue = item.replace("[", "")
                            numericYearValue = numericYearValue.replace("]", "")
                            const URL = `${filterURL}${numericYearValue}`
                            return(
                                <Dropdown.Item key={numericYearValue} href={URL}>{numericYearValue} and before</Dropdown.Item>
                            )
                        })}
                    </Dropdown.Menu>
                </Dropdown>
            </>
        )
    }
}
export default Filter