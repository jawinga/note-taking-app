"use client";
import { useContext, useEffect } from "react";
import NewForm from "./ui/NewForm";
import { SignedIn } from "@clerk/nextjs";
import { NotesContext } from "../context/NotesContext";
import List from "../components/features/List";
import { Note } from "../models/Note";

const Menu = () => {
  const notesCtx = useContext(NotesContext);
  const { notes, setNotes, selectedNoteDelete, setSelectedNoteDelete } =
    notesCtx!;

  useEffect(() => {
    notes.forEach((element) => {
      console.log(element);
    });
  }, [notes]);

  function handleAddNote(note: Note) {
    setNotes((prev) => [...prev, note]);
  }

  return (
    <SignedIn>
      <div className="p-8">
        <NewForm onAddNote={handleAddNote} />
        <div className="w-full">
          {notes.length >= 1 ? (
            <div className="overflow-y-auto max-h-[calc(100vh-200px)] pr-2">
              <List
                notes={notes}
                setNotes={setNotes}
                selectedNoteDelete={selectedNoteDelete}
                setSelectedNoteDelete={setSelectedNoteDelete}
              />
            </div>
          ) : (
            <div className="overflow-y-auto max-h-[calc(100vh-200px)] pr-2 pt-10">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-48 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-500 text-lg">No notes yet</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Create your first note using the form above
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </SignedIn>
  );
};

export default Menu;
