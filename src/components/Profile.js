import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import styles from '../components/css/profile.module.css'


const Profile = (props) => {
    const context = useContext(noteContext);
    const { user, fetchUser } = context;
    const host = "https://cloudnotesbackend-ttl6.onrender.com";
    useEffect(() => {
        fetchUser();
        document.title = 'CloudNotes - User Profile';
        // eslint-disable-next-line
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        updateUser(credentials.username, credentials.email);
    }

    const updateUser = async (username, email) => {
        // let url = "http://localhost:5000/api/auth/updateuser";
        let url = `${host}/api/auth/updateuser`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ username: username, email: email })
        });
        const json = await response.json();
        console.log(json);
        fetchUser();
        if (json.success) {
            props.showAlert("Details Updated!", "success");
        }
        else {
            props.showAlert("Unauthorised!", "danger");
        }
    }

    const [credentials, setCredentials] = useState({
        username: user.name,
        email: user.email
    })

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <div className='container'>

            <div className={styles.container}>
                <div>
                    <div className=''>
                        <h1 className={` ${styles.heading} mb-4`}>User Profile</h1>
                        <p className={styles.para}>Name : {user.name}</p>
                        <p className={styles.para}>Email Id: {user.email}</p>
                        <p className={styles.para}>Last updated on: {user.date}</p>
                    </div>
                    <div className={styles.updationForm}>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label" style={{
                                    fontFamily: 'Roboto',
                                    color: "#ff6917",
                                }}>User Name</label>
                                <input type="text" value={credentials.username} className="form-control" name='username' onChange={onChange} id="username" required minLength={3} style={{
                                    fontFamily: 'Roboto',
                                }} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label" style={{
                                    fontFamily: 'Roboto',
                                    color: "#ff6917",
                                }}>Email</label>
                                <input type="email" className="form-control" name='email'
                                    value={credentials.email} onChange={onChange} id="email" aria-describedby="emailHelp" required style={{
                                        fontFamily: 'Roboto',
                                    }} />
                            </div>
                            <button type="submit" className={`btn btn-warning ${styles.button}`}>Update Details</button>
                        </form>
                    </div>
                </div>
                <div className={styles.imageContainer}>
                    <img className={styles.loginImage} src="https://img.freepik.com/free-vector/benchmark-testing-abstract-concept-illustration_335657-3853.jpg?w=740&t=st=1691432233~exp=1691432833~hmac=c30adb8bf766e896085de47e42871102af500a60093d8d8425a5e248eac69550" alt='LoginImage' />
                </div>
            </div>
        </div>
    )
}

export default Profile

