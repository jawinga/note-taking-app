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

  return (
    <>
      <>
        {notes.length === 0
          ? "Empty"
          : notes
              .filter((n) => n.favourite)
              .map((n) => (
                <Card
                  key={n.id}
                  note={n}
                  onOpen={() => {}}
                  selectedNoteDelete={selectedNoteDelete}
                  setSelectedNoteDelete={setSelectedNoteDelete}
                  deleteNote={deleteNote}
                />
              ))}
      </>
    </>
  );
};

export default ListFavs;
