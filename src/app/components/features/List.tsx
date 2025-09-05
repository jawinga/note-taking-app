"use client";
import React from "react";
import Card from "./Card";
import { Note } from "@/app/models/Note";
import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X, Calendar, Save } from "lucide-react";
import Search from "../ui/buttons/Search";

interface NoteProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  selectedNoteDelete: Note | null;
  setSelectedNoteDelete: React.Dispatch<React.SetStateAction<Note | null>>;
  deleteNote: React.Dispatch<React.SetStateAction<Note | null>>;
}

const List = ({
  notes,
  setNotes,
  selectedNoteDelete,
  setSelectedNoteDelete,
  deleteNote,
}: NoteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [query, setQuery] = useState("");

  const changeInputValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setSelectedNote((prev) => {
      if (!prev) return prev; // si es null, no hacemos nada
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const saveNote = () => {
    if (!selectedNote) return;

    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === selectedNote.id ? selectedNote : note
      )
    );

    setIsOpen(false);
  };

  function mesString(mes: number): string {
    switch (mes) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
      default:
        return "Invalid month";
    }
  }

  const trimmedQuery: string = query.trim().toLowerCase();

  const filteredNotes: Note[] = query
    ? notes.filter((note) =>
        (note.title ?? "").toLowerCase().includes(trimmedQuery)
      )
    : notes;

  const list = query.trim() !== "" ? filteredNotes : notes;

  return (
    <>
      <Search
        value={query}
        onChange={setQuery}
        placeholder="Search notes..."
      ></Search>

      {list.length === 0 ? (
        <p className="text-sm text-gray-500">No notes found.</p>
      ) : (
        list.map((note) => (
          <Card
            key={note.id}
            note={note}
            selectedNoteDelete={selectedNoteDelete}
            setSelectedNoteDelete={setSelectedNoteDelete}
            deleteNote={deleteNote}
            onOpen={() => {
              setSelectedNote(note);
              setIsOpen(true);
            }}
          />
        ))
      )}
      {selectedNote && (
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            aria-hidden="true"
          />

          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="mx-auto max-w-2xl w-full bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
                <DialogTitle className="text-lg font-semibold text-gray-900">
                  Edit Note
                </DialogTitle>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Title Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    value={selectedNote.title}
                    onChange={changeInputValue}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-500"
                    placeholder="Enter note title..."
                  />
                </div>

                {/* Date Display */}
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Created:{" "}
                    {`${selectedNote.created.getDate()}-${mesString(
                      selectedNote.created.getMonth() + 1
                    )}-${selectedNote.created.getFullYear()}`}
                  </span>
                </div>

                {/* Content Textarea */}
                <div className="space-y-2">
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Content
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={selectedNote.content}
                    onChange={changeInputValue}
                    rows={8}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-500 resize-none"
                    placeholder="Write your note content here..."
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-200">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveNote}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default List;
