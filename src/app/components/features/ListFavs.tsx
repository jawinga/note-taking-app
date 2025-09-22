"use client";
import { NotesContext } from "@/app/context/NotesContext";
import React, { useEffect } from "react";
import Card from "./Card";

const ListFavs = () => {
  const notesCtx = React.useContext(NotesContext);

  useEffect(() => {
    console.log("Updated Favs");
  }, [notesCtx?.notes]);

  if (!notesCtx) return null;

  const { notes, setSelectedNoteDelete, selectedNoteDelete, deleteNote } =
    notesCtx;

  const favs = notes.filter((f) => f.favourite);

  return (
    <>
      <>
        {favs.length === 0 ? (
          <p className="text-5xl text-blue-300">
            There are no favourite notes!
          </p>
        ) : (
          favs.map((n) => (
            <Card
              key={n.id}
              note={n}
              onOpen={() => {}}
              selectedNoteDelete={selectedNoteDelete}
              setSelectedNoteDelete={setSelectedNoteDelete}
              deleteNote={deleteNote}
            />
          ))
        )}
      </>
    </>
  );
};

export default ListFavs;
