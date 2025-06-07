"use client";
import React from "react";
import { Note } from "@/app/models/Note";

interface NoteProps {
  note: Note;
  onOpen: () => void;
}

const Card = ({ note, onOpen }: NoteProps) => {
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

  note.created.getMonth().toString();

  return (
    <>
      <div
        onClick={onOpen}
        className="cursor-pointer w-64 h-64 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col"
      >
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
          {note.title}
        </h3>

        {/* Content */}
        <div className="flex-1 mb-4">
          <p className="text-sm text-gray-600 line-clamp-6">{note.content}</p>
        </div>

        {/* Date */}
        <div className="flex items-center text-xs text-gray-500 mt-auto">
          <svg
            className="w-3 h-3 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {`${note.created.getDay().toString()}-${mesString(
            note.created.getMonth() + 1
          )}`}
        </div>
      </div>
    </>
  );
};

export default Card;
