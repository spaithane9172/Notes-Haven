import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  const [updateNoteFormVisibility, setUpdateNoteFormVisibility] =
    useState("hidden");
  const [note, setNote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
  });

  const HOST = "http://localhost:5000";

  const getAllNotes = async () => {
    const response = await fetch(`${HOST}/api/notes/fetchAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-header": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${HOST}/api/notes/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-header": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json;
    console.log(json);
  };
  const deleteNote = async (id) => {
    const response = await fetch(`${HOST}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "applicatio/json",
        "auth-header": localStorage.getItem("token"),
      },
    });
    getAllNotes();
    console.log(response);
  };
  const editNote = async (note) => {
    console.log(note);
    const response = await fetch(`${HOST}/api/notes/updateNote/${note.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-header": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: note.title,
        description: note.description,
        tag: note.tag,
      }),
    });
    console.log(note.tag);
    console.log(response.json());
    getAllNotes();
  };
  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        addNote,
        deleteNote,
        editNote,
        getAllNotes,
        updateNoteFormVisibility,
        setUpdateNoteFormVisibility,
        note,
        setNote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
