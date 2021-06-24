import React from "react";
import Styles from "../Detail/ImageCard.module.css";

function ImageCard(props)
{
    const prefix = "https://nature-project.s3.amazonaws.com/s3_";

    const suffix = ".jpg";

    function ViewImage()
    {
        props.View(props.ImageID)
    }

    return <div className={Styles.Inline}>
                <div class="card" style={{width: "18rem"}}>
                <img class="card-img-top" src={prefix+props.ImageID+suffix} alt="Card"/>
                <div class="card-body">
                <button onClick={ViewImage} className="btn btn-secondary btn-lg btn-block">VIEW</button>
                </div>    
                </div>
            </div>
}

export default ImageCard;