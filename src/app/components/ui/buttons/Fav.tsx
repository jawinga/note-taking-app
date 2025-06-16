import React, { useContext } from "react";
import { Heart } from "lucide-react";
import { NotesContext } from "@/app/context/NotesContext";

const Fav = ({ id }: { id: number }) => {
  const notesCtx = useContext(NotesContext);
  if (!notesCtx) return null;
  const { notes, toggleFavourite } = notesCtx!;

  const note = notes.find((n) => n.id === id);

  function changeFav(e: React.MouseEvent) {
    e.stopPropagation();
    toggleFavourite(id);
  }

  return (
    <button onClick={changeFav}>
      <Heart
        className={note?.favourite ? "text-blue-700" : "text-blue-700"}
        fill={note?.favourite ? "#1D4ED8" : "none"}
      />
    </button>
  );
};

export default Fav;
