"use client";
import React, { createContext, useEffect, useState } from "react";
import { Note } from "../models/Note";
import { NotesService } from "@/lib/services";

interface NotesContextType {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  addNote: (note: Note) => void;
  toggleFavourite: (id: string) => void;
  selectedNoteDelete: Note | null;
  setSelectedNoteDelete: React.Dispatch<React.SetStateAction<Note | null>>;
  deleteNote: (note: Note) => void;
}

export const NotesContext = createContext<NotesContextType | null>(null);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteDelete, setSelectedNoteDelete] = useState<Note | null>(
    null
  );

  useEffect(() => {
    // const raw = localStorage.getItem("notes");

    const fetchNotes = async () => {
      const data = await NotesService.getAllNotes();

      if (data) {
        try {
          // const parsed: Note[] = JSON.parse(raw);
          if (Array.isArray(data)) {
            data.forEach((n) => {
              n.created = new Date(n.created);
            });
            setNotes(data);
          }
        } catch {
          // console.warn("Failed to parse notes from localStorage");
          console.warn("Failed to retrieve notes from DB");
        }
      }
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function addNote(note: Note) {
    setNotes((prev) => [...prev, note]);
  }

  async function deleteNote(note: Note) {
    const findNote = notes.find((n) => n.id === note.id);

    if (!findNote) {
      console.log("We could not find the note");
      return;
    }

    try {
      const deleteNote = await NotesService.deleteNote(note.id);
      if (!deleteNote) {
        console.log("Could not delete note");
        return;
      }

      setNotes((prev) => prev.filter((n) => n.id !== note.id));
    } catch (error) {
      console.log("Error " + error);
    }
  }

  async function toggleFavourite(id: string) {
    const note = notes.find((n) => n.id === id);
    if (!note) return;

    try {
      const updatedNote = await NotesService.updateNote({
        noteId: note.id,
        favourite: !note.favourite,
      });

      if (!updatedNote) {
        console.error("Failed to update note");
        return;
      }
      setNotes((prev) =>
        prev.map((n) => (n.id === id ? { ...n, favourite: !n.favourite } : n))
      );
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  const valueObject: NotesContextType = {
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
