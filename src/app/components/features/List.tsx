"use client";
import React from "react";
import Card from "./Card";
import { Note } from "@/app/models/Note";
import { useState } from "react";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

interface NoteProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const List = ({ notes, setNotes }: NoteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

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

  return (
    <>
      {notes.map((note) => (
        <Card
          key={note.id}
          note={note}
          onOpen={() => {
            setSelectedNote(note);
            setIsOpen(true);
          }}
        />
      ))}

      {selectedNote && (
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
              <DialogTitle className="font-bold">
                <input
                  type="text"
                  name="title"
                  value={selectedNote.title}
                  onChange={changeInputValue}
                ></input>
              </DialogTitle>
              <Description>
                {`${selectedNote.created.getDay().toString()}-${mesString(
                  selectedNote.created.getMonth() + 1
                )}`}
              </Description>
              <textarea
                name="content"
                value={selectedNote.content}
                onChange={changeInputValue}
              ></textarea>
              <div className="flex gap-4">
                <button onClick={saveNote}>Save</button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default List;
