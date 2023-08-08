import React, { useContext, useEffect } from 'react'
// import { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import styles from '../components/css/about.module.css'


const About = () => {
    const context = useContext(noteContext);
    const {fetchUser} = context;
    useEffect(() => {
        document.title = 'CloudNotes - About Us';
        fetchUser();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <h1 className={styles.heading}>About Us</h1>
            <div className={`${styles.container}`}>
                <div className={styles.content}>
                    <h3>Get more from your note-taking app</h3>
                    <p>Capture important ideas and information in ways that help you stay productive.</p>
                    <h3>Safe and synced</h3>
                    <p>Tired of not having the right info handy when you need it? CloudNotes automatically saves notes online and syncs them to all your devices.</p>
                    <h3>The right information, right at your fingertips</h3>
                    <p>With smart ways to save and access your notes, the information you need is always available when you need it.</p>
                </div>
                <div >
                    <img className={styles.notesImage} src="https://img.freepik.com/free-vector/manager-prioritizing-tasks-list_74855-5272.jpg?w=1380&t=st=1680460250~exp=1680460850~hmac=5d4b71e0f006636334caa06a61550c922c0602e8e349399654cf86539d85253b" alt="NotesImage" />
                </div>
            </div>
        </>
    )
}

export default About
