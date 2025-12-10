"use client";
import React, { useMemo, useState } from "react";
import { useTags } from "@/app/context/TagsContext";
import TagList from "@/app/components/features/Noteform/TagList";
import Search from "@/app/components/ui/buttons/Search";
import { useTagCounts } from "@/hooks/useTagCounts";

const TagsPage = () => {
  const { tags, removeTag } = useTags();
  const [query, setQuery] = useState("");
  const countsByTagId = useTagCounts();
  const trimmedQuery = query.toLowerCase().trim();

  const list = useMemo(() => {
    if (!trimmedQuery) return tags;
    return tags.filter((t) => t.tag.toLowerCase().includes(trimmedQuery));
  }, [tags, trimmedQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="flex flex-row align-middle">
          <h2 className="text-3xl font-bold text-left mb-8 text-gray-800">
            Your tags
          </h2>
          <div
            className={`${
              tags.length > 0 ? "bg-blue-700" : "bg-gray-300"
            } p-2.5 rounded-full flex items-center justify-center w-10 h-10 ml-3`}
          >
            <span
              className={`${
                tags.length > 0 ? "text-gray-300" : "text-gray-400"
              }`}
            >
              {tags.length}
            </span>
          </div>
        </div>

        <Search
          value={query}
          onChange={setQuery}
          placeholder="Search tags"
        ></Search>

        {tags.length > 0 ? (
          <TagList
            tags={list}
            className="flex flex-row flex-wrap gap-2 mt-5"
            onRemove={removeTag}
            countsByTagId={countsByTagId}
            tagClassName="px-6 py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-2 border-white/30 backdrop-blur-md hover:border-white/50 hover:brightness-110 active:scale-105"
            showCounts={true}
          ></TagList>
        ) : (
          <span className="text-gray-800">No tags founds</span>
        )}
      </div>
    </div>
  );
};

export default TagsPage;
