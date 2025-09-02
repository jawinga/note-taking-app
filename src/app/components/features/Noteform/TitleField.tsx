import React from "react";
import { Type } from "lucide-react";

const TitleField = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Type className="w-4 h-4 text-gray-500" />
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-gray-800"
        >
          Note Title
        </label>
      </div>
      <input
        onChange={(e) => onChange(e.target.value)}
        value={value}
        id="title"
        type="text"
        placeholder="Enter a descriptive title for your note..."
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
        name="title"
      />
    </div>
  );
};

export default TitleField;
