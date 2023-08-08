import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert("Note Added Successfully!", "success");
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <div className="container my-4">
            <h2 className='mb-4' style={{
                fontFamily: 'Lobster Two',
                color: 'maroon',
                fontSize: "50px"
            }}>New Note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label" style={{
                        fontFamily: 'Roboto',
                    }}>Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={5} required value={note.title} style={{
                        fontFamily: 'Roboto',
                    }}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label" style={{
                        fontFamily: 'Roboto',
                    }}>Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} minLength={5} required value={note.description} style={{
                        fontFamily: 'Roboto',
                    }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label" style={{
                        fontFamily: 'Roboto',
                    }}>Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag} style={{
                        fontFamily: 'Roboto',
                    }} />
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-warning" style={{
                    fontFamily: 'Roboto',
                    fontSize: "18px"
                }} onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
