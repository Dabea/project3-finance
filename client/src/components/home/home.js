import React, { Component } from "react";


class home extends React.Component {


render() {
    
    return (        
     
 
        <div class="row">
        <div class="col s12 m6">
            <div class="card  ">
                        <div class="card-content grey darken-4">
                            <p> Welcome to our APP </p>
                        </div>
                <div class="card-tabs ">
                    <ul class="tabs tabs-fixed-width grey lighten-3">
                        <li class="tab"><a href="#test4">About</a></li>
                        <li class="tab"><a class="active" href="#test5">FAQ</a></li>
                        <li class="tab"><a href="#test6">Dev-Team</a></li>
                    </ul>
                </div>
                    <div class="card-content grey lighten-5">
                        <div id="test4">About</div>
                        <div id="test5">FAQ</div>
                        <div id="test6">Test 3</div>
                    </div>
            </div>
        </div>
      </div>
                

       
          
    );
  }
}

export default home;
