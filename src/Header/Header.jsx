import React from "react"
import { Link } from "react-router-dom"

function Header(){
    return(
        <div className="header-bar">
            <p>My E-Commerce</p>
            <Link to={"/cartpage"} >myCart</Link>
        </div>
    )
}

export default Header