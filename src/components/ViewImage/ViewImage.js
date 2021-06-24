import React from "react";
import { useParams,Link, useHistory } from "react-router-dom";
import Styles from "../ViewImage/ViewImage.module.css";

const HomeStyle = {
    backgroundImage:"url(back2.jpg)",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    textAlign:"center",
    padding:"1%"
}

function ViewImage()
{
    let history = useHistory();

    function GoBack()
    {
        history.goBack("/Home")
    }

    let params = useParams();

    const prefix = "https://nature-project.s3.amazonaws.com/s3_";

    const suffix = ".jpg";

    return <div style={HomeStyle}>
            <nav className="navbar navbar-expand-lg navbar-dark">
                    <Link className="navbar-brand" to="/">NATURE</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <button className="btn btn-light" onClick={GoBack}>GO BACK</button>
                            </li>
                        </ul>
                    </div>
                </nav>
            <img className={Styles.Img} src={prefix+params.ImageID+suffix} height="500px" width="1000px" alt={params.ImageID}></img>
           </div>
}

export default ViewImage;