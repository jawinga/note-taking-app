"use client";
import React, { useRef, useState } from "react";
import { Note } from "@/app/models/Note";
import { Plus, Tag } from "lucide-react";
import { ContentField } from "./Noteform/ContentField";
import TitleField from "./Noteform/TitleField";
import { TagItem } from "./Noteform/Tag";
import TagEditor from "./Noteform/TagEditor";
import ExistingNotes from "./Noteform/ExistingNotes";
import { useTags } from "@/app/context/TagsContext";
import { addExistingTag } from "@/lib/utils";
import { useCallback } from "react";

const Noteform = ({ onAddNote }: { onAddNote: (n: Note) => void }) => {
  const nextId = useRef(0);

  const { tags: allTags, addTag } = useTags();

  const [tags, setTags] = useState<TagItem[]>([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const handleSelectedTag = useCallback(
    (tagID: string) => {
      const found = allTags.find((t) => t.id === tagID);

      if (!found) return;

      setTags((prev) => addExistingTag(prev, found));
    },
    [allTags]
  );

  function handleReset() {
    setContent("");
    setTitle("");
    setTags([]);
  }

  function resetTags(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setTags([]);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimTitle = title.trim();
    const trimContent = content.trim();

    if (!trimTitle || !trimContent) {
      alert("Please, fill out the information");
      return;
    }

    const newNote: Note = {
      id: ++nextId.current, // increment once
      title: trimTitle,
      content: trimContent,
      tags, // TagItem[]
      created: new Date(),
      favourite: false, // include if your model has it
    };

    onAddNote(newNote);
    handleReset();
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Add New Note</h2>
              <p className="text-sm text-gray-600 mt-1">
                Capture your thoughts and ideas in a structured format
              </p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8 space-y-8">
          {/* Title */}
          <TitleField value={title} onChange={setTitle} />

          {/* Tags */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-gray-500" />
              <span className="block text-sm font-semibold text-gray-800">
                Tags
              </span>
            </div>

            <TagEditor
              tags={tags}
              onAdd={(tag, colour) => {
                const id = crypto.randomUUID();
                const item = { id, tag, colour };

                setTags((prev) =>
                  prev.some((t) => t.tag.toLowerCase() === tag.toLowerCase())
                    ? prev
                    : [...prev, item]
                );

                addTag(item); //
              }}
              onRemove={(id) =>
                setTags((prev) => prev.filter((t) => t.id !== id))
              }
            />

            <ExistingNotes onSelect={handleSelectedTag}></ExistingNotes>

            <button
              type="button"
              onClick={resetTags}
              className="underline text-gray-400"
            >
              Reset
            </button>
          </div>

          {/* Content */}
          <ContentField value={content} onChange={setContent} />

          {/* Submit */}
          <div className="space-y-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                Create Note
              </span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>All notes are automatically timestamped</span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              Ready to save
            </span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Noteform;
