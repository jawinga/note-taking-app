import React from "react";
import { Plus } from "lucide-react";

const NewCta = () => {
  return (
    <button
      type="submit"
      className="bg-white text-blue-600 py-3 px-6 rounded-lg font-semibold shadow-md hover:shadow-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
    >
      <span className="flex items-center justify-center gap-2">
        <Plus className="w-5 h-5" />
        Create Note
      </span>
    </button>
  );
};

export default NewCta;
