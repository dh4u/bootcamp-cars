import React from 'react';

class Navigation extends React.Component{
    render(){
        const currentPage = this.props.currentPage
        
        switch (currentPage){
        // nav for bulkUpdate
        case "bulkUpdate":
            return(
                
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/car/0">Add a Car</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="/cars/bulkUpdate/">Bulk Edit Cars <span className="sr-only">(current)</span></a>
                            </li>
                        </ul>
                    </div>
                </nav>
            )
        // nav for add page
        case "add":
            return(
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Home</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="/car/0">Add a Car <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/cars/bulkUpdate/">Bulk Edit Cars</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            )
        // nav for the home
        case "home":
            return(
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link active" href="/">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/car/0">Add a Car</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/cars/bulkUpdate/">Bulk Edit Cars</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            )
        // default to nothing highlighted
        default:
            return(
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/car/0">Add a Car</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/cars/bulkUpdate/">Bulk Edit Cars</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            )
        }
    }
}
export default Navigation