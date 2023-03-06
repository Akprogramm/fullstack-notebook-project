import React from "react";
import { useState } from "react";
// import { useState } from "react";
import NoteContext from "./NoteContext";



const NoteState=(props)=>{
  
   const host="http://localhost:5000";

    const notesInitial=[];

      const [notes,setnotes]=useState(notesInitial);

      const getNotes=async()=>{

        const response=await fetch(`${host}/api/notes/fetchallnotes`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          }
        })    
          const json=await response.json();
          //  console.log(json);  
           setnotes(json);

      }



      const addNote=async(title,discription,tag)=>{
 
        const response=await fetch(`${host}/api/notes/addnotes`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("token")
          }
          ,body: JSON.stringify({title,discription,tag})
        })    
          const note=await response.json();
          setnotes(notes.concat(note));
          
          
          // console.log(json);

        // let note= {
        //   "user": "63565ed393bafdfeddf7d7c1353",
        //   "title": title,
        //   "discription": discription,
        //   "tag": tag,
        // };
        console.log("note : ",note);

      }
      

      const deleteNote=async(noteID)=>{

        // /api/notes/deletenote/63569d411a9c21a12d3cfe6c
        const response=await fetch(`${host}/api/notes/deletenote/${noteID}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("token")
          }
        })    
          const json=response.json();
          console.log(json);
        
       console.log("deleting note with id : ",noteID);

      const newNewnote=notes.filter((note)=>{return note._id!==noteID});
      setnotes(newNewnote);
      }


      const editNote=async (id,title,discription,tag)=>{

      const response=await fetch(`${host}/api/notes/updatenote/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("token")
          }
          ,body: JSON.stringify({title,discription,tag})
        })    
          const json=await response.json();
          console.log(json);
          let newNotes=JSON.parse(JSON.stringify(notes));

        for(let i=0;i<newNotes.length;i++)
        {
         const ele=newNotes[i];  

         if(ele._id===id){
          newNotes[i].title=title;
          newNotes[i].discription=discription;
          newNotes[i].tag=tag;
          break;
        }
      }
      console.log("setting new notes");
      setnotes(newNotes);
      console.log(newNotes);
        
      }

 return(
    <NoteContext.Provider value={{notes,setnotes,addNote,deleteNote,editNote,getNotes}}>
        {props.children}
    </NoteContext.Provider>
 )
 }

export default NoteState;