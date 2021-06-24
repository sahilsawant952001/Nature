import React,{useState,useContext} from "react";
import Styles from "../signin/Signin.module.css";
import { Link,useHistory } from "react-router-dom";
import { AccountContext } from "../../Account";
import Spinner from "../Spinner/Spinner";

const HomeStyle = {
    backgroundImage:"url(back.jpg)",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    textAlign:"center",
    padding:"1%"
}

function Signin(props)
{
    const history = useHistory();

    const [loading,setLoading] = useState(0);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [authMessage,setAuthMessage] = useState("")

    const { Authenticate } = useContext(AccountContext);

    function onChangeEmail(event)
    {
        setEmail(event.target.value);
    }

    function onChangePassword(event)
    {
        setPassword(event.target.value);
    }

    function formSubmitHandler(event)
    {   
        event.preventDefault(); 
        setLoading(1);
        Authenticate(email,password)
        .then(data=>{
            props.changeAuthState(1);
            history.push("/Home");
            setLoading(0);
        })
        .catch(err => {
            setAuthMessage(err.message);
            setLoading(0);
        })
        
    }

    let data = <div style={HomeStyle}>
                    <div className={Styles.form}>
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
                    <h1 className={Styles.Text}>SIGN IN</h1>
                    <h5 className={Styles.hello}>{authMessage.toUpperCase()}</h5>
                    <div className={Styles.Content}>
                        <div className="card">
                        <div className="card-body">
                            <form onSubmit={formSubmitHandler} autoComplete="off">
                                <div className="form-group">
                                <input type="email" value={email} autoComplete="off" onChange={onChangeEmail} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="ENTER EMAIL"/>
                                </div>
                                <div className="form-group">
                                <input type="password" value={password} autoComplete="off" onChange={onChangePassword} className="form-control" id="exampleInputPassword1" placeholder="PASSWORD"/>
                                </div>
                                <button className="btn btn-secondary btn-lg btn-block">SIGN IN</button>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
    
    if(loading===1)
    {
        data = <Spinner/>
    }

    return data
}

export default Signin;


