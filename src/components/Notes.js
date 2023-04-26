import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    let navigate = useNavigate();
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" });
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        }
        else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag
        });
    }
    const ref = useRef(null);
    const refClose = useRef(null);

    const handleClick = (e) => {
        console.log("updating the note...", note);
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Note udated successfully!", "success");
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title " id="exampleModalLabel" style={{
                                fontFamily: 'Lobster Two',
                                color: 'maroon',
                                fontSize: "30px"
                            }}>Edit Note</h1>
                            <button type="button" ref={refClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label" style={{
                                        fontFamily: 'Roboto',
                                    }}>Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required style={{
                                        fontFamily: 'Roboto',
                                    }} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label" style={{
                                        fontFamily: 'Roboto',
                                    }}>Description</label>
                                    <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} minLength={5} required style={{
                                        fontFamily: 'Roboto',
                                    }} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label" style={{
                                        fontFamily: 'Roboto',
                                    }}>Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} style={{
                                        fontFamily: 'Roboto',
                                    }} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-warning" style={{
                    fontFamily: 'Roboto',
                    fontSize: "18px"
                }} data-bs-dismiss="modal">Close</button> */}
                            <button type="button" className="btn btn-warning" style={{
                                fontFamily: 'Roboto',
                                fontSize: "18px",
                            }} onClick={handleClick} disabled={note.etitle.length < 5 || note.edescription.length < 5}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2 className='mt-4' style={{
                    fontFamily: 'Lobster Two',
                    color: 'maroon',
                    fontSize: "50px"
                }}>Your Notes</h2>
                <div className="container">
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <NoteItem showAlert={props.showAlert} note={note} updateNote={updateNote} key={note._id} />
                })}
            </div>
        </>
    )
}

export default Notes
