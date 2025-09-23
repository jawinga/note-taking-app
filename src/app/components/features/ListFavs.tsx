"use client";
import { NotesContext } from "@/app/context/NotesContext";
import React, { useEffect } from "react";
import Card from "./Card";
import { Scroll } from "lucide-react";

const ListFavs = () => {
  const notesCtx = React.useContext(NotesContext);

  useEffect(() => {
    console.log("Updated Favs");
  }, [notesCtx?.notes]);

  if (!notesCtx) return null;

  const { notes, setSelectedNoteDelete, selectedNoteDelete } = notesCtx;

  const favs = notes.filter((f) => f.favourite);

  return (
    <>
      <>
        {favs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 gap-2 bg-blue-50 rounded-lg shadow-md">
            <Scroll className="w-10 h-10 text-blue-400 mb-2" />
            <span className="text-xl font-semibold text-blue-500">
              No favourite notes yet!
            </span>
            <span className="text-sm text-blue-400">
              Mark notes as favourites to see them here.
            </span>
          </div>
        ) : (
          favs.map((n) => (
            <Card
              key={n.id}
              note={n}
              onOpen={() => {}}
              selectedNoteDelete={selectedNoteDelete}
              setSelectedNoteDelete={setSelectedNoteDelete}
            />
          ))
        )}
      </>
    </>
  );
};

export default ListFavs;
