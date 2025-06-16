"use client";
import React from "react";
import { createContext } from "react";
import { Note } from "../models/Note";

interface NotesContext {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  addNote: (note: Note) => void;
  toggleFavourite: (id: number) => void;
  selectedNoteDelete: Note | null;
  setSelectedNoteDelete: React.Dispatch<React.SetStateAction<Note | null>>;
  deleteNote: (note: Note) => void;
}

export const NotesContext = createContext<NotesContext | null>(null);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [selectedNoteDelete, setSelectedNoteDelete] =
    React.useState<Note | null>(null);

  function addNote(note: Note) {
    setNotes((prev) => [...prev, note]);
  }

  function deleteNote(note: Note) {
    console.log("DELETING:", note.id); // Debug line
    setNotes((prev) => prev.filter((n) => n.id !== note.id));
  }

  function toggleFavourite(id: number) {
    const updatedNotes = notes.map((n) => {
      if (n.id === id) {
        return { ...n, favourite: !n.favourite };
      } else {
        return n;
      }
    });
    setNotes(updatedNotes);
  }

  const valueObject = {
    notes,
    setNotes,
    addNote,
    toggleFavourite,
    selectedNoteDelete,
    setSelectedNoteDelete,
    deleteNote,
  };

  return (
    <NotesContext.Provider value={valueObject}>
      {children}
    </NotesContext.Provider>
  );
}
