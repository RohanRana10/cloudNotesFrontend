import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from '../components/css/signup.module.css'
import Spinner from './Spinner';

const Signup = (props) => {

    const [loading, setLoading] = useState(false);
    const host = "https://cloudnotesbackend-ttl6.onrender.com";

    useEffect(() => {
        if(localStorage.getItem("token") !== null){
            navigate("/");
        }
        document.title = 'CloudNotes - Signup and Start Noting';
    }, []);

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // let url = "http://localhost:5000/api/auth/createuser";
        let url = `${host}/api/auth/createuser`;
        setLoading(true);
        let { name, password, email, cpassword } = credentials;
        if(password === cpassword){
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            });
            const json = await response.json();
            console.log(json);
            if (json.success) {
                //save the auth token and redirect
                localStorage.setItem('token', json.authToken);
                setLoading(false);
                navigate("/");
                props.showAlert("Account Created Successfully!", "success");
            }
            else {
                setLoading(false);
                props.showAlert("Invalid Credentials!", "danger");
            }
        }
        else{
            setLoading(false);
            props.showAlert("Passwords do not match!", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className='container mt-4'>
            <h2 className={`mt-5 ${styles.heading}`}>Sign up to CloudNotes</h2>
            {loading && <Spinner/>}
            <div className={styles.container}>
                <div className={styles.signupForm}>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label" style={{
                                fontFamily: 'Roboto',
                                color: "#ff6917",
                            }}>Name</label>
                            <input type="text" className="form-control" id="name" name='name' onChange={onChange} style={{
                                fontFamily: 'Roboto',
                            }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label" style={{
                                fontFamily: 'Roboto',
                                color: "#ff6917",
                            }}>Email Address</label>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' onChange={onChange} style={{
                                fontFamily: 'Roboto',
                            }} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label" style={{
                                fontFamily: 'Roboto',
                                color: "#ff6917",
                            }}>Password</label>
                            <input type="password" className="form-control" id="password" name='password' onChange={onChange} required minLength={5} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cpassword" className="form-label" style={{
                                fontFamily: 'Roboto',
                                color: "#ff6917",
                            }}>Confirm Password</label>
                            <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} required minLength={5} />
                        </div>
                        <button type="submit" className={`btn btn-warning ${styles.button}`}>Sign up</button>
                    </form>
                </div>
                <div className={styles.imageContainer}>
                    <img className={styles.signupImage} src="https://img.freepik.com/free-vector/demand-insurance-service-digital-insurer-mobile-app-innovative-business-model-female-customer-ordering-insurance-policy-online_335657-1156.jpg?w=826&t=st=1680512982~exp=1680513582~hmac=8ad2cbe8a09943404c5b37ffdcd12f84e52281e220238a971380985fcedbdebb" alt="SignupImage" />
                </div>
            </div>
        </div>
    )
}

export default Signup
