import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import '../App.css';
import styles from '../components/css/noteItem.module.css'

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    const formatDate = () => {
        let date = new Date(note.date);
        let options = {
            weekday: "long", year: "numeric", month: "short",
            day: "numeric", hour: "2-digit", minute: "2-digit"
        };

        return date.toLocaleTimeString("en-us", options);
    }

    return (
        <div className="col-md-4">
            <div className="card my-3">
                <div className={styles.cornerBoxTop} style={{

                }}>{`${note.tag === "" ? "General" : note.tag}`}</div>

                <div className={styles.cornerBoxBottom} style={{

                }}>{`${formatDate()}`}</div>


                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className={styles.card_title}>{note.title}</h5>
                    </div>

                    <div className="position-absolute top-0 end-0" style={{ marginTop: "8px", marginRight: "8px", color: '#555555' }}>

                        <i className="fa-solid fa-trash mx-2" onClick={() => {
                            deleteNote(note._id);
                            props.showAlert("Deleted Successfully!", "success");
                        }}></i>
                        <i className="fa-regular fa-pen-to-square mx-2" onClick={() => { updateNote(note); }}></i>
                    </div>
                    <p className={styles.cardText} style={{ marginBottom: "30px" }}>{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
