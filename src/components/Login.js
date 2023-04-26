import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../components/css/login.module.css'

const Login = (props) => {

    const host = "https://cloudnotesbackend-ttl6.onrender.com";

    useEffect(() => {
        document.title = 'CloudNotes - Log In and Start Noting';
    }, []);

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // let url = "http://localhost:5000/api/auth/login";
        let url = `${host}/api/auth/login`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            //save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            props.showAlert("Logged in Successfully!", "success");
            navigate("/");
        }
        else {
            props.showAlert("Invalid Credentials!", "danger");
        }

    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className='container mt-4'>
            <h2 className={` ${styles.heading}`}>Login to continue to CloudNotes</h2>
            <div className={styles.container}>
                <div className={styles.loginForm}>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label" style={{
                                fontFamily: 'Roboto',
                                color: "#ff6917",
                            }}>Email Address</label>
                            <input type="email" required className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={onChange} style={{
                                fontFamily: 'Roboto',
                            }} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label" style={{
                                fontFamily: 'Roboto',
                                color: "#ff6917",
                            }}>Password</label>
                            <input type="password" required className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} style={{
                                fontFamily: 'Roboto',
                            }} />
                        </div>
                        <button type="submit" className={`btn btn-warning ${styles.button}`}>Log in</button>
                    </form>
                </div>
                <div className={styles.imageContainer}>
                    <img className={styles.loginImage} src="https://img.freepik.com/free-vector/sign-page-abstract-concept-illustration_335657-3875.jpg?w=826&t=st=1680512175~exp=1680512775~hmac=b0703872db880ff68cd0ede2fd15e5d1841ab87469b2cbf9b1088e09967036b3" alt='LoginImage' />
                </div>
            </div>
        </div>
    )
}

export default Login
