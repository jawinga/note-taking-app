"use client";
import { NotesContext } from "@/app/context/NotesContext";
import React, { useEffect } from "react";
import Card from "./Card";
import { Heart } from "lucide-react";

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
          <div className="flex flex-col items-center justify-center py-16 px-8 gap-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 shadow-sm">
            <div className="p-4 bg-white rounded-2xl shadow-sm mb-2">
              <Heart className="w-12 h-12 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              No favourites yet
            </h3>
            <p className="text-sm text-gray-500 text-center max-w-xs">
              Mark notes as favourites to quickly access them here
            </p>
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
