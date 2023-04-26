import React, { useEffect } from 'react'
// import AddNote from './AddNote';
import Notes from './Notes';

const Home = (props) => {

    useEffect(() => {
        document.title = 'CloudNotes - Notes on the Go!';
    }, []);

    return (
        <div>
            <Notes showAlert={props.showAlert}/>
        </div>
    )
}

export default Home
