import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Note from "./Note";
import noteContext from "../context/notes/noteContext";

const Home = () => {
  const context = useContext(noteContext);
  const { notes, getAllNotes } = context;
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    getAllNotes();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div className="w-full flex justify-end px-[5rem] mb-[2rem]">
        <Link
          to="/addNote"
          className="bg-blue-600 rounded-full shadow-xl px-[1.5rem] py-[0.5rem] font-bold text-white"
        >
          Add Note
        </Link>
      </div>

      {notes.length === 0 && (
        <div>
          <h1 className="text-center mt-[10rem] text-gray-600 font-semibold text-[1.1rem]">
            No notes available.
          </h1>
        </div>
      )}
      {notes.length !== 0 && (
        <div className="flex flex-wrap">
          {notes.map((note) => (
            <Note
              key={note._id}
              title={note.title}
              description={note.description}
              tag={note.tag}
              date={note.date}
              id={note._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
