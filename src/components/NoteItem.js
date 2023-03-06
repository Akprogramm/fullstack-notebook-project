import React from 'react'
import { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';


export default function NoteItem(props) {
    const {note,updateNote}=props;

    const a= useContext(NoteContext);
    const {deleteNote}=a;


  return (
    <div className="col-md-3">
    <div className="card my-3">
    <div className="card-body">
      <div className="d-flex align-items-center">
    <h5 className="card-title">{note.title}</h5>
    <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
      </div>
    <p className="card-text">{note.discription}</p>
  </div>
</div> 

    </div>
  )
}
