import React from 'react'
import { useContext,useRef } from 'react'
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from "./AddNote.js"
import { useEffect,useState } from 'react';
import {useNavigate} from 'react-router-dom';

export default function Notes() {
    const a= useContext(NoteContext);
    const {notes,getNotes,editNote}=a;

    let navigate = useNavigate();

    useEffect(()=>{
      if(localStorage.getItem("token")){
        console.log(`localStorage.getItem("token"): `,localStorage.getItem("token"));
      getNotes();
      }
      else{
        navigate("/login");
      }
      // eslint-disable-next-line
    },[]);

    const ref=useRef(null);
    const refClose=useRef(null);
    const [note,setnote]=useState({id: "",etitle: "",ediscription: "",etag: ""});

   const updateNote=(currentnote)=>{
    ref.current.click();
    setnote({id: currentnote._id,etitle: currentnote.title,ediscription: currentnote.discription,etag: currentnote.tag});
   };



   const handleClick=(e)=>{
     editNote(note.id,note.etitle,note.ediscription,note.etag);
    refClose.current.click();
    e.preventDefault();
    console.log("Updating the note",note);
      // addNote(note.etitle,note.ediscription,note.etag);
  }

  const onChange=(e)=>{
    setnote({...note,[e.target.name]: e.target.value});
  }

  return (
    <>
    <AddNote/>
    
<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">edit note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onChange} aria-describedby="emailHelp" minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="discription" className="form-label">Discription</label>
    <input type="text" className="form-control" id="ediscription" name="ediscription" value={note.ediscription} onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">tag</label>
    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}  />
  </div>
 
  {/* <button type="submit" className="btn btn-primary" onClick={handleClick}>AddNote</button> */}      
</form> 
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<5 || note.ediscription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>


    <div className="row my-3">
        <h1>my notes</h1>
        {notes.length===0 && "no notes to display"}
      {notes.map((note)=>{
      return <NoteItem key={note.title} updateNote={updateNote} note={note}/>
    })}
    </div>
    </>
  )
}
