import React from "react";
import { Link,useHistory } from "react-router-dom";
import Styles from "../home/Home.module.css";
import UserPool from "../../UserPool";
import ImageCard from "../Detail/ImageCard";

const HomeStyle = {
    backgroundImage:"url(back2.jpg)",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    textAlign:"center",
    paddingBottom:"10%",
    padding:"1%"
}

function Home(props)
{
    let history = useHistory();

    function LogoutHandler()
    {
        const user = UserPool.getCurrentUser();
        
        if(user){
            user.signOut();
            props.changeAuthState(0);
            history.replace('/');
        }
    }

    function View(ImageID)
    {
        history.push('/Home/'+ImageID)
    }

    let arr_images = []

    for(var i=1;i<=6;i++)
    {
        arr_images.push(<ImageCard ImageID={i.toString()} View={View}/>)
    }

    return  <div style={HomeStyle}>
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <Link className="navbar-brand" to="/">NATURE</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <button className="btn btn-light" onClick={LogoutHandler}>LOGOUT</button>
                            </li>
                        </ul>
                    </div>
                </nav>
                <h1 className={Styles.Abc}>NATURE IMAGES</h1>
                {arr_images.map((x)=>{
                    return x
                })}
            </div>
}

export default Home;