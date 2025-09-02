"use client";
import React, { useRef, useState } from "react";
import { Note } from "@/app/models/Note";
import { Plus, FileText, Type, Tag } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const colours = [
  { name: "Red", class: "bg-red-500" },
  { name: "Orange", class: "bg-orange-500" },
  { name: "Yellow", class: "bg-yellow-400" },
  { name: "Green", class: "bg-green-500" },
  { name: "Teal", class: "bg-teal-500" },
  { name: "Blue", class: "bg-blue-500" },
  { name: "Indigo", class: "bg-indigo-500" },
  { name: "Purple", class: "bg-purple-500" },
  { name: "Pink", class: "bg-pink-500" },
  { name: "Gray", class: "bg-gray-500" },
];

const Noteform = ({ onAddNote }) => {
  const nextId = useRef(0);

  const [tags, setTags] = useState<{ colour: string; tag: string }[]>([]);
  const showTags = tags.map((t, i) => (
    <li
      key={i}
      className={`px-3 py-1 rounded-full text-sm text-white mt-2 mb-2 ${
        colours.find((c) => c.name.toLowerCase() === t.colour)?.class
      }`}
    >
      {t.tag}
    </li>
  ));

  const [tagInput, setTagInput] = useState("");
  const [tagColour, setTagColour] = useState("");

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

  function addTags(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!tagColour || !tagInput) {
      return;
    } else {
      setTags((prev) => [...prev, { colour: tagColour, tag: tagInput }]);
    }
    setTagColour("");
    setTagInput("");
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tags = formData.getAll("tags").map(String);

    if (title == "" || content == "") {
      alert("Please, fill out the information");
    } else {
      const newNote: Note = {
        id: nextId.current++,
        title: title,
        content: content,
        tags: tags,
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
              onChange={handleChange}
              value={inputValue.title}
              id="title"
              type="text"
              placeholder="Enter a descriptive title for your note..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
              name="title"
            />
          </div>

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
            <Select onValueChange={(value) => setTagColour(value)}>
              <SelectTrigger className="w-50 px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400">
                <SelectValue placeholder="Select colour" />
              </SelectTrigger>
              <SelectContent className="w-full px-4 py-3 border bg-white border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400">
                {colours.map((c) => (
                  <SelectItem key={c.name} value={c.name.toLowerCase()}>
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${c.class}`} />
                      {c.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>{" "}
            </Select>
            <div>{showTags}</div>
          </div>

          {/* Content Field */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-500" />
              <label
                htmlFor="content"
                className="block text-sm font-semibold text-gray-800"
              >
                Note Content
              </label>
            </div>
            <textarea
              id="content"
              value={inputValue.content}
              placeholder="Write your detailed note content here. You can include ideas, observations, tasks, or any information you want to remember..."
              name="content"
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 resize-none"
            />
          </div>

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
