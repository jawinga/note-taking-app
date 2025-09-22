"use client";
import React from "react";
import { createContext } from "react";
import { Note } from "../models/Note";

interface NotesContextType {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  addNote: (note: Note) => void;
  toggleFavourite: (id: number) => void;
  selectedNoteDelete: Note | null;
  setSelectedNoteDelete: React.Dispatch<React.SetStateAction<Note | null>>;
  deleteNote: (note: Note) => void;
}

export const NotesContext = createContext<NotesContextType | null>(null);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [selectedNoteDelete, setSelectedNoteDelete] =
    React.useState<Note | null>(null);

  function addNote(note: Note) {
    setNotes((prev) => [...prev, note]);
  }

  function deleteNote(note: Note) {
    console.log("DELETING:", note.id);
    setNotes((prev) => prev.filter((n) => n.id !== note.id));
  }

  function toggleFavourite(id: number) {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, favourite: !n.favourite } : n))
    );
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

export function useNotes() {
  const ctx = React.useContext(NotesContext);
  if (!ctx) throw new Error("useNotes must be used within a NotesProvider");
  return ctx;
}
