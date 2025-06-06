"use client";
import React from "react";
import { Note } from "@/app/models/Note";

interface NoteProps {
  note: Note;
}

const Card = ({ note }: NoteProps) => {
  return (
    <div className="w-64 h-64 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col">
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
        {`${note.created.getDay().toString()} ${note.created
          .getMonth()
          .toString()}`}
      </div>
    </div>
  );
};

export default Card;
