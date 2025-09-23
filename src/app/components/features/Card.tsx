"use client";
import React from "react";
import { Note } from "@/app/models/Note";
import { Calendar, FileText } from "lucide-react";
import Delete from "../ui/buttons/Delete";
import Fav from "../ui/buttons/Fav";
import { searchColour } from "@/lib/utils";

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
      className="group cursor-pointer w-72 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-200 p-6 flex flex-col h-80"
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
          <FileText className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-900 transition-colors">
            {note.title || "Untitled Note"}
          </h3>
        </div>
        <Fav id={note.id}></Fav>
      </div>

      {/* Content */}
      <div className="flex-1 mb-4">
        <p className="text-sm text-gray-600 line-clamp-5 leading-relaxed">
          {note.content.length > 30
            ? `${note.content.slice(0, 30)}...`
            : note.content || "No content available..."}
        </p>
      </div>

      {/* Tags */}

      <div className="mb-3">
        {note.tags.length > 0 && (
          <div className="mb-3 flex flex-row flex-wrap gap-2">
            {note.tags.slice(0, 4).map((t) => (
              <span
                key={t.id}
                className={`px-2.5 py-1 rounded-full text-xs font-medium text-white ${searchColour(
                  t.colour
                )}`}
              >
                {t.tag}
              </span>
            ))}
            {note.tags.length > 4 && (
              <span className="px-2.5 py-1 rounded-full text-xs font-medium text-gray-700 bg-gray-100 border">
                +{note.tags.length - 4}
              </span>
            )}
          </div>
        )}

        {/* {note.tags.length > VISIBLE ? (
          <>
            <TagList
              tags={visibleTags}
              className="flex flex-row flex-wrap gap-2"
            />
            <span className="px-2.5 py-1 rounded-full text-xs font-medium text-gray-700 bg-gray-100 border border-gray-200">
              +{hiddenTags}
            </span>
          </>
        ) : (
          <TagList
            tags={note.tags as TagItem[]}
            className="flex flex-row flex-wrap gap-2"
          />
        )} */}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar className="w-3.5 h-3.5" />
          <span className="font-medium">
            {`${note.created.getDate()}-${mesString(
              note.created.getMonth() + 1
            )}-${note.created.getFullYear()}`}
          </span>
        </div>
        <div className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="p-1 hover:bg-gray-500 hover:rounded-lg hover:text-white transition">
          <Delete note={note}></Delete>
        </div>
      </div>
    </div>
  );
};

export default Card;
