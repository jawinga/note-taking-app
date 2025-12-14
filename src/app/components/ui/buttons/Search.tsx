import React, { useState, useEffect } from "react";
import { ScanSearch } from "lucide-react";
import { useDebounceSearch } from "@/hooks/debounceSearch";

type Props = {
  value?: string;
  placeholder?: string;
  onChange: (v: string) => void;
  className?: string;
  delay?: number;
};

const Search = ({
  value = "",
  placeholder = "Search notes",
  className = "",
  delay = 300,
  onChange,
}: Props) => {
  const [rawQuery, setRawQuery] = useState(value);

  useEffect(() => {
    setRawQuery(value);
  }, [value]);

  const debouncedQuery = useDebounceSearch(rawQuery, delay);

  useEffect(() => {
    console.log("Debounced query is", debouncedQuery);
    onChange(debouncedQuery.trim());
  }, [debouncedQuery, onChange]);

  return (
    <div className={`relative ${className} mb-5 w-full`}>
      <ScanSearch
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
        aria-hidden="true"
      />
      <input
        type="search"
        value={rawQuery}
        onChange={(e) => setRawQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-900
                   placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500
                   focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
        aria-label="Search notes"
      />
    </div>
  );
};

export default Search;
