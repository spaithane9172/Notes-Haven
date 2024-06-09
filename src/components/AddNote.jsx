import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import { toast } from "react-toastify";

const AddNote = () => {
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const [error, setError] = useState(false);
  const context = useContext(noteContext);
  const { addNote } = context;
  const onChangeHandler = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const formSubmit = (e) => {
    e.preventDefault();
    if (note.title.length < 3 || note.description.length < 5) {
      toast.error("Please fill correct data", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setError(true);
    } else {
      toast.success("New Note Created Successfully.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setError(false);
      addNote(note.title, note.description, note.tag);
      setNote({ title: "", description: "", tag: "" });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      <form
        action=""
        className="flex flex-col w-[35rem] p-[2rem] border-[1px] border-gray-500 rounded-md shadow-xl"
      >
        <h1 className="font-bold text-center text-[1.5rem] mb-[2rem] righteous-regular">
          Add New Note
        </h1>
        <div className="mb-[1rem] flex flex-col">
          <input
            type="text"
            value={note.title}
            onChange={onChangeHandler}
            name="title"
            placeholder="Title"
            className="border-[1px] border-gray-500 pl-[0.5rem] py-[0.5rem] rounded-sm"
          />
          {error && note.title.length < 3 && (
            <label htmlFor="title" className="text-red-600 text-[0.85rem]">
              Title length must be at least 3 charecters
            </label>
          )}
        </div>
        <div className="mb-[1rem] flex flex-col">
          <textarea
            value={note.description}
            placeholder="Description"
            name="description"
            onChange={onChangeHandler}
            className="border-[1px] border-gray-500 pl-[0.5rem] py-[0.5rem] rounded-sm h-[10rem]"
          ></textarea>
          {error && note.description.length < 5 && (
            <label htmlFor="title" className="text-red-600 text-[0.85rem]">
              Title length must be at least 3 charecters
            </label>
          )}
        </div>
        <input
          type="text"
          value={note.tag}
          name="tag"
          onChange={onChangeHandler}
          placeholder="Tag"
          className="border-[1px] border-gray-500 pl-[0.5rem] py-[0.5rem] rounded-sm mb-[2rem]"
        />
        <div className="flex justify-center items-center">
          <button
            type="submit"
            onClick={formSubmit}
            className="bg-blue-600 py-[0.5rem] font-bold text-white w-[10rem] rounded-full shadow-xl"
          >
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;
