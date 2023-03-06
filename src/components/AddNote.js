// import e from 'express';
import React, { useState } from 'react'
import { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

export default function AddNote() {
    const a= useContext(NoteContext);
    const {addNote}=a;

    const [note,setnote]=useState({title: "",discription: "",tag: ""});

    const handleClick=(e)=>{ 
      e.preventDefault();
        addNote(note.title,note.discription,note.tag);
        console.log("noted : ",note);
        setnote({title: "",discription: "",tag: ""});

    }

    const onChange=(e)=>{
      setnote({...note,[e.target.name]: e.target.value});
    }

  return (
    <div>
       <div className='container'>
      <h1>Add a Note</h1>
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onChange} aria-describedby="emailHelp" minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="discription" className="form-label">Discription</label>
    <input type="text" className="form-control" id="discription" name="discription" value={note.discription} onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">tag</label>
    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
  </div>
 
  <button disabled={note.title.length<5 || note.discription.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>AddNote</button>
</form> 
      {/* <h1>Your Notes</h1>       */}
    </div>
    </div>
  )
}
