import React from 'react'
import Logo from '../images/logo.svg';

const Footer = () => {
    return (
        <footer class=" bg-dark p-3 text-white ">
        <div class="d-flex justify-content-between text-jsutify mt-3">
            <p class="text-left p-3">
                Copyright©
            </p>
            <img src={Logo} alt="Logo" width="50" height="50"/>
            <p class="p-3">
                Jonas Balsys
            </p>
            </div>
            <div class="width-max text-center" >
            <text class=" font-weight-bold p-3 h5">2021</text>
            </div>
        </footer>
    )
}

export default Footer