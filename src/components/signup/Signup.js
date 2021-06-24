import React,{useState,useContext} from "react";
import Styles from "../signup/Signup.module.css";
import { Link,useHistory } from "react-router-dom";
import UserPool from "../../UserPool";
import { AccountContext } from "../../Account";
import { CognitoUser } from "amazon-cognito-identity-js";
import Spinner from "../Spinner/Spinner";

const HomeStyle = {
    backgroundImage:"url(back.jpg)",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    textAlign:"center",
    padding:"1%"
}

function Signup(props)
{
    let history = useHistory();

    const { Authenticate } = useContext(AccountContext);

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [otp,setOtp] = useState("");
    const [authMessage,setAuthMessage] = useState("")
    const [formCode,setFormCode] = useState(0);
    const [loading,setLoading] =useState(0);

    function onChangeEmail(event)
    {
        setEmail(event.target.value);
    }

    function onChangePassword(event)
    {
        setPassword(event.target.value);
    }

    function onChangeOTP(event)
    {
        setOtp(event.target.value);
    }

    function formSubmitHandler(event)
    {   
        event.preventDefault();
        setLoading(1);
        UserPool.signUp(email,password,[],null,(err,data)=>{
            if(err){
                setLoading(0);
                setAuthMessage(err.message)
            }else{
                setAuthMessage("");
                setLoading(0);
                setFormCode(1);
            }
        })
    }

    function formSubmitHandler2(event)
    {   
        event.preventDefault();
        setLoading(1);
        const user = new CognitoUser({
            Username:email,
            Pool:UserPool
        })

        user.confirmRegistration(otp,true,(err,data)=>{
            if(err){
                setLoading(0);
                setAuthMessage(err.message);
            }else{
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
        },null)
    }

    let form = <form onSubmit={formSubmitHandler} autoComplete="off">
                    <div className="form-group">
                        <input type="email" autoComplete="off" value={email} onChange={onChangeEmail} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="ENTER EMAIL"/>
                    </div>
                    <div className="form-group">
                        <input type="password" autoComplete="off" value={password} onChange={onChangePassword} className="form-control" id="exampleInputPassword1" placeholder="PASSWORD"/>
                    </div>
                    <button className="btn btn-secondary btn-lg btn-block">SIGN UP</button>
                </form>

    if(formCode===1)
    {
        form = <form onSubmit={formSubmitHandler2} autoComplete="off">
                    <div className="form-group">
                        <input type="email" autoComplete="off" value={email} onChange={onChangeEmail} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="ENTER EMAIL"/>
                    </div>
                    <div className="form-group">
                        <input type="password" autoComplete="off" value={password} onChange={onChangePassword} className="form-control" id="exampleInputPassword1" placeholder="PASSWORD"/>
                    </div>
                    <div className="form-group">
                    <input type="text" value={otp} autoComplete="off" onChange={onChangeOTP} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="ENTER OTP"/>
                    </div>
                    <button className="btn btn-secondary btn-lg btn-block">SIGN UP</button>
                </form>
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
                    <h1 className={Styles.Text}>SIGN UP</h1>
                    {formCode===1?<h3 className={Styles.Text2}>ENTER VERIFICATION CODE</h3>:null}
                    <h5 className={Styles.hello}>{authMessage.toUpperCase()}</h5>
                    <div className={Styles.Content}>
                        <div className="card">
                        <div className="card-body">
                            {form}
                        </div>
                        </div>
                    </div>
                </div>
                </div>
    
    if(loading===1)
    {
        data=<Spinner/>
    }

    return data
}

export default Signup;


