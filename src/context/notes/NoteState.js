import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    // const host = "http://localhost:5000";
    const host = "https://cloudnotesbackend-ttl6.onrender.com";
    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);
        const [user, setUser] = useState({});

    //fetch user details
    const fetchUser = async () => {
        // let url = "http://localhost:5000/api/auth/getuser";
        let url = `${host}/api/auth/getuser`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log("fetchuser running")
        let date = new Date(json.date);
        let options = {
            weekday: "long", year: "numeric", month: "short",
            day: "numeric", hour: "2-digit", minute: "2-digit"
        };
        setUser({
            name: json.name,
            email: json.email,
            date: date.toLocaleTimeString("en-us", options)
        });
    }


    //get all notes
    const getNotes = async () => {
        //api call
        let url = `${host}/api/notes/fetchallnotes`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            }
        });
        const json = await response.json();
        // console.log("getnotes called");
        setNotes(json);
    }

    //Add a note
    const addNote = async (title, description, tag) => {
        // api call
        let url = `${host}/api/notes/addnote`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, description, tag })
        });

        const note = await response.json();
        setNotes(notes.concat(note));
    }


    //delete a note
    const deleteNote = async (id) => {
        //api call
        let url = `${host}/api/notes/deletenote/${id}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            }
        });
        const json = await response.json();
        console.log(json);

        //frontend part done to avoid reload
        console.log("deleting the node with id", id);
        const newNotes = notes.filter((note) => {
            return note._id !== id;
        })
        setNotes(newNotes);
    }

    const filterNotes = async (word) => {
        
        // console.log("filter notes called 1");
        let url = `${host}/api/notes/fetchallnotes`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            }
        });
        const json = await response.json();
        const tempNotes = json;

        // console.log("filter notes called 2");
        const newNotes = tempNotes.filter((note) => {
            return note.title.toLowerCase().includes(word.toLowerCase()) || note.description.toLowerCase().includes(word.toLowerCase());
        })
        console.log("filter notes complete");
        setNotes(newNotes);
    }

    //edit a note
    const editNote = async (id, title, description, tag) => {
        //api call
        let url = `${host}/api/notes/updatenote/${id}`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json);

        //for frontend
        let newNotes = JSON.parse(JSON.stringify(notes));//parse creates a deep copy since we cannot change state of note directly
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, user, fetchUser, filterNotes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;