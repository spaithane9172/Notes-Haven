import React, { useState, useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import { toast } from "react-toastify";

const UpdateNote = () => {
  const [fnote, setNote] = useState({ title: "", description: "", tag: "" });
  const context = useContext(noteContext);
  const [error, setError] = useState(false);
  const {
    editNote,
    updateNoteFormVisibility,
    setUpdateNoteFormVisibility,
    note,
  } = context;

  const onChangeHandler = (e) => {
    setNote({ ...fnote, [e.target.name]: e.target.value });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (fnote.title.length < 3 || fnote.description.length < 5) {
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
      setError(false);
      editNote(fnote);
      toast.success("Note Updated Successfully.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setNote({ id: "", title: "", description: "", tag: "" });
      setUpdateNoteFormVisibility("hidden");
    }
  };

  useEffect(() => {
    setNote(note);
    // eslint-disable-next-line
  }, [updateNoteFormVisibility]);

  return (
    <div
      className={`${updateNoteFormVisibility} absolute w-full h-full bg-black  bg-opacity-70`}
    >
      <div className="flex flex-col justify-center items-center h-[100vh] ">
        <form
          action=""
          className="flex flex-col w-[35rem] px-[2rem] pb-[2rem] pt-[1rem] border-[1px] border-gray-500 rounded-md shadow-xl bg-white"
        >
          <p className="text-[1.5rem] text-end font-semibold ">
            <button
              onClick={(e) => {
                e.preventDefault();
                setNote({ id: "", title: "", description: "", tag: "" });
                setUpdateNoteFormVisibility("hidden");
              }}
              className="cursor-pointer w-[2.5rem] h-[2.5rem] rounded-full border-[2px] border-black shadow-md"
            >
              X
            </button>
          </p>
          <h1 className="font-bold text-center text-[1.5rem] mb-[2rem] righteous-regular">
            Add New Note
          </h1>
          <input
            type="text"
            disabled
            onChange={onChangeHandler}
            value={note.id}
            name="id"
            placeholder="id"
            className="border-[1px] border-gray-500 pl-[0.5rem] py-[0.5rem] rounded-sm mb-[1rem] hidden"
          />
          <div className="mb-[1rem] flex flex-col">
            <input
              value={fnote.title}
              type="text"
              onChange={onChangeHandler}
              name="title"
              placeholder="Title"
              className="border-[1px] border-gray-500 pl-[0.5rem] py-[0.5rem] rounded-sm"
            />
            {error && fnote.title.length < 5 && (
              <label htmlFor="title" className="text-red-600 text-[0.85rem]">
                Title length must be at least 3 charecters
              </label>
            )}
          </div>
          <div className="mb-[1rem] flex flex-col">
            <textarea
              value={fnote.description}
              placeholder="Description"
              name="description"
              onChange={onChangeHandler}
              className="border-[1px] border-gray-500 pl-[0.5rem] py-[0.5rem] rounded-sm h-[10rem]"
            ></textarea>
            {error && fnote.description.length < 5 && (
              <label htmlFor="title" className="text-red-600 text-[0.85rem]">
                Description length must be at least 5 charecters
              </label>
            )}
          </div>
          <input
            type="text"
            value={fnote.tag}
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
              Update Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateNote;
