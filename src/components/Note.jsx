import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Note = (props) => {
  const context = useContext(noteContext);
  const { deleteNote, setUpdateNoteFormVisibility, setNote } = context;
  const { title, description, tag, date, id } = props;
  return (
    <div className="flex flex-col w-[38rem] border-[1px] border-gray-500 shadow-lg mx-[0.5rem] mb-[1rem] px-[1.5rem] py-[1rem] rounded-md">
      <h1 className="font-bold text-[1.2rem]">{title}</h1>
      <p className="text-gray-500 mb-[1rem]">{date.substring(0, 10)}</p>
      <p className="mb-[0.5rem] buenard-regular">{description}</p>
      <p className="buenard-regular text-[1.1rem]">{tag}</p>
      <div className="flex justify-end">
        <button
          onClick={() => {
            deleteNote(id);
          }}
        >
          <i className="fa-solid fa-trash text-[1.2rem] cursor-pointer px-[0.5rem] text-red-600"></i>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setNote({ id, title, description, tag });
            setUpdateNoteFormVisibility("block");
          }}
        >
          <i className="fa-solid fa-pen-to-square text-[1.2rem] cursor-pointer px-[0.5rem] text-blue-600"></i>
        </button>
      </div>
    </div>
  );
};

export default Note;
