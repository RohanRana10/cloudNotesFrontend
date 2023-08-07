import { React, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from '../components/css/navbar.module.css'
import noteContext from '../context/notes/noteContext'



const Navbar = (props) => {
    const context = useContext(noteContext);
    const {user} = context;

    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
        props.showAlert("Logged out successfully!", "success");
    }

    const getProfile = () => {
        navigate("/profile");
    }

    let location = useLocation();
    // useEffect(() => {
    //     console.log(location.pathname);
    // }, [location]);

    return (
        <nav className={`navbar navbar-expand-lg navbar-dark ${styles.navbar}`}>
            <div className="container-fluid">
                <Link className={`navbar-brand ${styles.heading}`} to="/">CloudNotes</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""} ${styles.navButton}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""} ${styles.navButton}`} to="/about">About Us</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ? <form className="d-flex" role="search">
                        <Link className={`btn btn-outline-warning mx-2 ${styles.button}`} to='/login' role="button">Log in</Link>
                        <Link className={`btn btn-outline-warning mx-2 ${styles.button}`} role="button" to='/Signup'>Sign up</Link>
                    </form> : <div className='d-flex'>
                        <button type="button" onClick={getProfile} className={`btn  mx-2 ${styles.button}`}>{user.name}</button>
                        <button onClick={handleLogout} className={`btn btn-outline-warning ${styles.button}`}>Log out</button>
                    </div> 
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
