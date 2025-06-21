"use client";
import React, { useContext, useEffect } from "react";
import Noteform from "../../components/features/Noteform";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import { Note } from "../../models/Note";
import List from "../../components/features/List";
import { NotesContext } from "@/app/context/NotesContext";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import note from "../../../../public/note-take.png";
import Image from "next/image";

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
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
              My Notes
            </h1>

            <div className="grid lg:grid-cols-2 gap-7 h-[calc(100vh-200px)]">
              <Noteform onAddNote={addNoteForm} />

              {notes.length >= 1 ? (
                <div className="overflow-y-auto h-full pr-2">
                  <div className="grid grid-cols-2 gap-4">
                    <List
                      notes={notes}
                      setNotes={setNotes}
                      selectedNoteDelete={selectedNoteDelete}
                      setSelectedNoteDelete={setSelectedNoteDelete}
                      deleteNote={deleteNote}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4 overflow-y-auto h-full pr-2">
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
            <div className="min-h-[calc(100vh-48px)] flex items-center justify-center items-start mt-20">
              <div className="p-4 border-4 border-gray-400 rounded-xl flex flex-col w-fit items-center justify-center">
                <h3 className="text-4xl font-bold text-center mb-8 text-gray-500 mt-10 mb-15">
                  You are not signed in!
                </h3>
                <Image
                  src={note}
                  alt="note taking"
                  className="h-auto w-50"
                ></Image>
                <h3 className="text-3xl text-gray-500 mb-10 mt-15">
                  Sign in or Register to add notes!
                </h3>
              </div>
            </div>
          </SignedOut>
        </div>
      </div>
    </ErrorBoundary>
  );
}
