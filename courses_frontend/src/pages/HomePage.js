import React, {Component} from 'react'
import { Table } from 'react-bootstrap';

import logo from '../images/earth.jpg';

export class HomePage extends Component{

    render(){
        //const {cats} = this.state;
        return(
            <div style={{position:"relative"}} class="d-flex justify-content-center">
            <img src={logo} alt="Logo" class="img-fluid" />
          <div style={{position: "absolute", top: "35%"}}>
             <h1 class="text-light display-1 fade-in"> Courses.World </h1>
             <br/>
             <a class="d-flex justify-content-center text-decoration-none text-white h2" href="/categories">BEGIN</a>
          </div>
      </div>
        )
    }
}