import React, {Component} from 'react';
// import csv from 'fast-csv';
// import mongoose from 'mongoose';
import axios from 'axios';

class UploadData extends Component {


    state = {
        data: []
    }

    // Convert data from CSV to JSON
    // Add JSON to mongo database
    addData = () => {
        axios.post ('/api/:id')
            .then( response => {
                console.log(response)
            }
            )
            .catch((err) =>{
                console.log(err)
            })
    }
    
    render(){
        return (
            <div>
                <p>Use the form below to upload a list of authors.
                    Click <a href="/template">here</a> for an example template.
                </p>
                <form action="/api/:id" method="POST" encType="multipart/form-data">
                    <input type="file" name="file" accept="*.csv" />
                    <br/>
                    <br/>
                    <input onClick={this.addData} type="submit" value="Upload Transcations" />
                </form>
            </div>
        )
    }
}


export default UploadData;