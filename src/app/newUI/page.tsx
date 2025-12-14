"use client";
import { useContext, useEffect } from "react";
import MenuBar from "../components/layout/MenuBar";
import NewForm from "./ui/NewForm";
import { SignedIn } from "@clerk/nextjs";
import { NotesContext } from "../context/NotesContext";
import List from "../components/features/List";

const Menu = () => {
  const notesCtx = useContext(NotesContext);
  const {
    notes,
    setNotes,
    // addNote,
    selectedNoteDelete,
    setSelectedNoteDelete,
  } = notesCtx!;

  useEffect(() => {
    notes.forEach((element) => {
      console.log(element);
    });
  }, [notes]);

  return (
    <div className="flex h-screen">
      <MenuBar />

      <SignedIn>
        <div className="flex-1 p-8">
          <NewForm />
          <div className="w-full">
            {/* <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8"> */}
            {notes.length >= 1 ? (
              <div className="order-1 xl:order-2 overflow-y-auto max-h-[calc(100vh-200px)] pr-2">
                <List
                  notes={notes}
                  setNotes={setNotes}
                  selectedNoteDelete={selectedNoteDelete}
                  setSelectedNoteDelete={setSelectedNoteDelete}
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
        </div>
      </SignedIn>
    </div>
  );
};

export default Menu;
