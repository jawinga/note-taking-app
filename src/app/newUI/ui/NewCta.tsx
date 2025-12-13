import React from "react";
import { Plus } from "lucide-react";

const NewCta = () => {
  return (
    <div className="space-y-4 w-auto w-max-auto ">
      <button
        type="submit"
        className="hover:cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
      >
        <span className="flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          Create Note
        </span>
      </button>
    </div>
  );
};

export default NewCta;
