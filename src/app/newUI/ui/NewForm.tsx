import React, { useCallback, useState } from "react";
import { Type, FileText } from "lucide-react";
import NewCta from "./NewCta";
import TagEditor from "@/app/components/features/Noteform/TagEditor";
import { useTags } from "@/app/context/TagsContext";
import { TagItem } from "@/app/components/features/Noteform/Tag";
import { addExistingTag } from "@/lib/utils";
import ExistingNotes from "@/app/components/features/Noteform/ExistingNotes";

const NewForm = () => {
  const { tags: allTags, addTag } = useTags();

  //local
  const [tags, setTags] = useState<TagItem[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSelectedTag = useCallback(
    (tagID: string) => {
      const found = allTags.find((t) => t.id === tagID);

      if (!found) return;

      setTags((prev) => addExistingTag(prev, found));
    },
    [allTags]
  );

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  function reset(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setTitle("");
    setContent("");
    setTags([]);
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-xl border border-gray-200 bg-white pt-8"
    >
      <div className="flex items-center gap-3 mb-4 px-8">
        <Type className="w-4 h-4 text-gray-500" />
        <input
          type="text"
          id="newTitle"
          name="newTitle"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 px-4 py-3 border-0 font-bold text-2xl  text-gray-700 placeholder-gray-500 focus:outline-none  transition-all duration-200 hover:border-gray-400 resize-none"
        />
      </div>

      <div className="flex items-start gap-3 px-8">
        <FileText className="w-4 h-4 text-gray-500 mt-3" />
        <textarea
          id="newContent"
          name="newContent"
          placeholder="Write your note..."
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 px-4 py-3 border-0  text-gray-700 placeholder-gray-500 focus:outline-none  transition-all duration-200 hover:border-gray-400 resize-none"
        />
      </div>

      <div className="w-full p-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded-b-xl mt-3 flex justify-between">
        <div className="flex gap-10 items-start">
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

              addTag(item);
            }}
            onRemove={(id) =>
              setTags((prev) => prev.filter((t) => t.id !== id))
            }
          ></TagEditor>
          <ExistingNotes onSelect={handleSelectedTag}></ExistingNotes>
        </div>

        <div className="flex flex-col items-center gap-5 ">
          <NewCta></NewCta>
          <button
            onClick={reset}
            className="text-gray-500 hover:underline hover:cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewForm;
