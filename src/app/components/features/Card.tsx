"use client";
import React from "react";
import { Note } from "@/app/models/Note";
import { Calendar, FileText } from "lucide-react";
import Delete from "../ui/buttons/Delete";
import Fav from "../ui/buttons/Fav";
// import { searchColour } from "@/lib/utils";

interface NoteProps {
  note: Note;
  onOpen: () => void;
  selectedNoteDelete: Note | null;
  setSelectedNoteDelete: React.Dispatch<React.SetStateAction<Note | null>>;
}

const Card = ({ note, onOpen, selectedNoteDelete }: NoteProps) => {
  function mesString(mes1a12: number): string {
    const names = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return names[mes1a12 - 1] ?? "Invalid month";
  }

  note.created.getMonth().toString();

  const isSelected = selectedNoteDelete?.id === note.id;

  if (isSelected) {
    console.log("Note selected. Ready for deletion");
    console.log(selectedNoteDelete.id + " " + note.id);
  }

  // const visibleTags = note.tags.slice(0, VISIBLE);
  // const hiddenTags = note?.tags?.length - VISIBLE;

  return (
    <div
      onClick={onOpen}
      className="group cursor-pointer w-80 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col h-96 hover:-translate-y-1"
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2.5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300">
          <FileText className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {note.title || "Untitled Note"}
          </h3>
        </div>
        <div className="opacity-70 group-hover:opacity-100 transition-opacity">
          <Fav id={note.id} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 mb-4">
        <p className="text-sm text-gray-600 line-clamp-6 leading-relaxed">
          {note.content || "No content available..."}
        </p>
      </div>

      {/* Tags */}
      {note.tags.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-row flex-wrap gap-2">
            {note.tags.slice(0, 3).map((t) => (
              <span
                key={t.id}
                className="px-3 py-1 rounded-full text-xs font-semibold text-white shadow-sm"
                style={{ backgroundColor: t.colour }}
              >
                {t.tag}
              </span>
            ))}
            {note.tags.length > 3 && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold text-gray-600 bg-gray-100">
                +{note.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar className="w-4 h-4" />
          <span className="font-medium">
            {`${note.created.getDate()}-${mesString(
              note.created.getMonth() + 1
            )}-${note.created.getFullYear()}`}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Delete logic
            }}
            className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
          >
            <Delete note={note} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
