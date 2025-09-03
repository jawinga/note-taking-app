"use client";
import React, { useRef, useState } from "react";
import ColourSelect from "./Noteform/ColourSelect";
import { Note } from "@/app/models/Note";
import { Plus, Tag } from "lucide-react";
import { ContentField } from "./Noteform/ContentField";
import TitleField from "./Noteform/TitleField";
import TagList from "./Noteform/TagList";
import { TagItem } from "./Noteform/Tag";

const Noteform = ({ onAddNote }: { onAddNote: (n: Note) => void }) => {
  const nextId = useRef(0);

  const [tags, setTags] = useState<TagItem[]>([]);
  const [content, setContent] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [tagInput, setTagInput] = useState("");
  const [tagColour, setTagColour] = useState("");

  function removeTag(id: string) {
    setTags((prev) => prev.filter((t) => t.id !== id));
  }

  const [inputValue, setInputValue] = useState({
    title: "",
    content: "",
    tags: [],
  });

  function handleReset() {
    setInputValue({
      title: "",
      content: "",
      tags: [],
    });
  }

  function resetTags(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setTags([]);
  }

  function addTags(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!tagColour || !tagInput) {
      return;
    } else {
      setTags((prev) => [
        ...prev,
        { colour: tagColour, tag: tagInput, id: crypto.randomUUID() },
      ]);
    }
    setTagColour("");
    setTagInput("");
  }

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setInputValue((prev) => ({ ...prev, [name]: value }));
  // };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    const tagsFromForm: TagItem[] = formData.getAll("tags").map((value) => ({
      id: crypto.randomUUID(),
      tag: String(value),
      colour: "gray",
    }));

    const trimTitle = title.trim();
    const trimContent = content.trim();

    if (!trimContent || !trimTitle) {
      alert("Please, fill out the information");
      return;
    } else {
      const newNote: Note = {
        id: ++nextId.current,
        title: title,
        content: content,
        tags: tagsFromForm,
        created: new Date(),
      };

      onAddNote(newNote);
      console.log(title);
      console.log(content);
      tags.forEach((tag: string) => {
        console.log(tag);
      });

      nextId.current += 1;
      handleReset();
    }
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
          {/* Title Field */}
          <TitleField value={title} onChange={setTitle}></TitleField>

          {/*tags*/}

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-gray-500"></Tag>
              <label
                htmlFor="tags"
                className="block text-sm font-semibold text-gray-800"
              >
                Tags
              </label>
            </div>
            <input
              type="text"
              id="tags"
              name="tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add 1 word tags"
              className="w-50 px-4 py-3 border border-gray-300 rounded-lg sh  adow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
            ></input>
            <button
              className="rounded-full bg-gradient-to-r from-blue-600 to-blue-700 p-3 ml-3"
              onClick={addTags}
            >
              +
            </button>
            <ColourSelect
              value={tagColour}
              onChange={setTagColour}
            ></ColourSelect>
            <TagList
              tags={tags}
              className={tagColour}
              onRemove={removeTag}
            ></TagList>
            <button onClick={resetTags} className="underline text-gray-400">
              Reset
            </button>
          </div>

          {/* Content Field */}
          <ContentField value={content} onChange={setContent}></ContentField>

          {/* Submit Button */}
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
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Ready to save
            </span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Noteform;
