"use client";
import React, { useEffect } from "react";
import Noteform from "./components/features/Noteform";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Note } from "./models/Note";
import List from "./components/features/List";

export default function Home() {
  const [notes, setNotes] = React.useState<Note[]>([]);

  function addNoteForm(note: Note) {
    setNotes((prev) => [...prev, note]);
  }

  {
    useEffect(() => {
      notes.forEach((n: Note) => console.log(n));
    }, [notes]);

    return (
      <ErrorBoundary>
        <div>
          <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto p-6">
              <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                My Notes
              </h1>

              <div className="grid lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
                {/* Left Half - Create Notes */}

                <Noteform onAddNote={addNoteForm}></Noteform>

                {/* Right Half - Display Notes */}

                {notes.length >= 1 ? (
                  <List notes={notes}></List>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-800"></h2>
                      </div>

                      <div className="overflow-y-auto h-full pr-2 space-y-4">
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-48 flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-gray-500 text-lg">
                              No notes yet
                            </p>
                            <p className="text-gray-400 text-sm mt-2">
                              Create your first note using the form on the left
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}
