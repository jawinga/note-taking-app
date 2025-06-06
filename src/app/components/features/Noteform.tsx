"use client";
import React from "react";
import { useId } from "react";

const Noteform = ({ onAddNote }) => {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const Id = useId();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    if (title == "" || content == "") {
      alert("Please, fill out the information");
    } else {
      onAddNote({
        id: Id,
        title: title,
        content: content,
        created: new Date(),
      });
      console.log(title);
      console.log(content);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Left Half - Add Note Form */}
      <div className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 pb-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Add New Note
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Create a new note to save your thoughts
            </p>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter note title..."
                className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                name="title"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700"
              >
                Content
              </label>
              <textarea
                id="content"
                placeholder="Write your note here..."
                name="content"
                className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Add Note
            </button>
            <p className="text-sm text-gray-500 text-center">
              Press Ctrl + Enter to quickly add note
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Noteform;
