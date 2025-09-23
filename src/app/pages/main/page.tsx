"use client";
import { useContext, useEffect } from "react";
import Noteform from "../../components/features/Noteform";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import type { Note } from "../../models/Note";
import List from "../../components/features/List";
import { NotesContext } from "@/app/context/NotesContext";
import { SignedIn, SignedOut } from "@clerk/nextjs";

import NotSignedIn from "@/app/components/features/Noteform/NotSignedIn";

export default function Home() {
  const notesCtx = useContext(NotesContext);

  const {
    notes,
    setNotes,
    addNote,
    deleteNote,
    selectedNoteDelete,
    setSelectedNoteDelete,
  } = notesCtx!;

  function addNoteForm(note: Note) {
    setNotes((prev) => [...prev, note]);
  }

  useEffect(() => {
    notes.forEach((n: Note) => console.log(n));
  }, [notes]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto p-6">
          <SignedIn>
            <div className="inline-block relative pb-4">
              <h1 className="text-4xl md:text-5xl font-bold mt-5 mb-5 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent relative z-10">
                My Notes
              </h1>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl blur-xl opacity-40 -z-10 scale-110"></div>
            </div>

            {/* Improved responsive grid layout for better mobile and desktop experience */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
              <div className="order-2 xl:order-1">
                <Noteform onAddNote={addNoteForm} />
              </div>

              {notes.length >= 1 ? (
                <div className="order-1 xl:order-2 overflow-y-auto max-h-[calc(100vh-200px)] pr-2">
                  <List
                    notes={notes}
                    setNotes={setNotes}
                    selectedNoteDelete={selectedNoteDelete}
                    setSelectedNoteDelete={setSelectedNoteDelete}
                    deleteNote={deleteNote}
                  />
                </div>
              ) : (
                <div className="order-1 xl:order-2 overflow-y-auto max-h-[calc(100vh-200px)] pr-2">
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-48 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-gray-500 text-lg">No notes yet</p>
                      <p className="text-gray-400 text-sm mt-2">
                        Create your first note using the form on the left
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </SignedIn>
          <SignedOut>
            <NotSignedIn></NotSignedIn>
          </SignedOut>
        </div>
      </div>
    </ErrorBoundary>
  );
}
