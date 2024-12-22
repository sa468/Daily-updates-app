import React from "react";
import './Header.css';
import updateLogo from "./updatelogo.png";

function Header(){
    return(
       
        <header className="header v-align">

            <img className="header-logo" src={updateLogo} />

            <h1 className="flex-one">Daily Work Updates</h1>
        </header>
        
    )
}

export default Header;