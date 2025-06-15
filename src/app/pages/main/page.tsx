"use client";
import React, { useEffect } from "react";
import Noteform from "../../components/features/Noteform";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import { Note } from "../../models/Note";
import List from "../../components/features/List";

export default function Home() {
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [selectedNoteDelete, setSelectedNoteDelete] =
    React.useState<Note | null>(null);
  const isFirstRender = React.useRef(true);

  function addNoteForm(note: Note) {
    setNotes((prev) => [...prev, note]);
  }

  function deleteNote(note: Note) {
    setNotes((prev) => prev.filter((n) => n.id !== note.id));
  }

  useEffect(() => {
    notes.forEach((n: Note) => console.log(n));
  }, [notes]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto p-6">
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
        </div>
      </div>
    </ErrorBoundary>
  );
}
