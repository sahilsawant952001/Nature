import React from "react";
import { Link } from "react-router-dom";
import Styles from "../../components/welcome/Welcome.module.css";

const HomeStyle = {
    backgroundImage:"url(back.jpg)",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    textAlign:"center",
    padding:"1%"
}

function Home()
{
    return <div style={HomeStyle}>
        <nav className="navbar navbar-expand-lg navbar-dark">
        <Link className="navbar-brand" to="/">NATURE</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/Signup">SIGN UP</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/Signin">SIGN IN</Link>
                </li>
            </ul>
        </div>
        </nav>
        <div className={Styles.Content}>
            <h1 className={Styles.Abc}>WELCOME TO NATURE WEBSITE</h1>
            <h5 className={Styles.ABC}>SIGN UP TO SEE SOME OF THE BEAUTIFUL PICTURES OF NATURE</h5>
        </div>
        <div className={Styles.form}>
            <div className="card-deck">
                    <div className="card w-50">
                        <div className="card-body">
                            <p className="card-text">CLICK HERE TO SIGN UP</p>
                            <Link to="/Signup" className="btn btn-secondary btn-lg btn-block">SIGN UP</Link>
                        </div>
                    </div>
                    <div className="card w-50">
                        <div className="card-body">
                            <p className="card-text">CLICK HERE TO SIGN IN</p>
                            <Link to="/Signin" className="btn btn-secondary btn-lg btn-block">SIGN IN</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
}

export default Home;