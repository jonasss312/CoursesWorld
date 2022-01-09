import React, { Component } from 'react'
import Logo from '../images/About.svg';

export class About extends Component {

    render() {
        return (
            <>
                <div style={{ position: "relative" }} class="d-flex justify-content-center">
                    <img src={Logo} alt="Logo" class="img-fluid" />
                    <div style={{ position: "absolute", top: "20%" }}>
                        <h1 class="font-effect-fire d-flex justify-content-center">Courses.World</h1>
                        <br />
                        <h2 class="d-flex justify-content-center text-white">About</h2>
                        <br />
                        <p class="d-flex justify-content-center text-white">This website was designed for easier and</p>
                        <p class="d-flex justify-content-center text-white">more comfortable access to every kind of courses.</p>
                        <br />
                        <br />
                        <h5 class="d-flex justify-content-center  text-white">Created by: Jonas Balsys</h5>
                        <br />
                        <p class="d-flex justify-content-center text-white">Contacts:</p>
                        <p class="d-flex justify-content-center text-white">jonas.balsys.9@gmail.com</p>
                    </div>
                </div>
            </>
        )
    }
}