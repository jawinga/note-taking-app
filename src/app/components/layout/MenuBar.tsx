"use client";
import React from "react";
import { Tag, Heart, FileText } from "lucide-react";
import Link from "next/link";
import SvgLogo from "../../../../public/SvgLogo";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { useTags } from "@/app/context/TagsContext";
import { useTagCounts } from "@/hooks/useTagCounts";
import { useUser } from "@clerk/nextjs";

type MenuBarTagProps = {
  colour: string;
  tag: string;
  number: number;
};

const MenuBarTag = ({ colour, tag, number }: MenuBarTagProps) => {
  function tagLength(tag: string): string {
    return tag.length > 15 ? tag.slice(0, 15) + "..." : tag;
  }

  return (
    <div className="flex items-center justify-between gap-3 px-3 py-2 hover:bg-white/10 rounded-lg transition-all duration-200 cursor-pointer group">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div
          className="rounded-full w-3 h-3 flex-shrink-0 ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-200"
          style={{ backgroundColor: colour }}
        />
        <p className="text-sm truncate text-white/90 group-hover:text-white transition-colors duration-200">
          {tagLength(tag)}
        </p>
      </div>
      <div className="rounded-full min-w-6 h-6 bg-white/20 group-hover:bg-white/30 flex items-center justify-center text-xs font-semibold text-white px-2 transition-all duration-200">
        {number}
      </div>
    </div>
  );
};

const MenuBar = () => {
  const { user } = useUser();
  const countsTag = useTagCounts();
  const { tags } = useTags();

  return (
    <nav className="bg-gradient-to-b from-blue-600 via-blue-700 to-indigo-700 text-white flex flex-col w-64 flex-shrink-0 h-full overflow-y-auto shadow-2xl">
      <div className="flex flex-col flex-1 px-6 py-8">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-12 pb-6 border-b border-white/10">
          <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
            <SvgLogo className="h-8 w-8 text-white" />
          </div>
          <p className="text-xl font-bold tracking-tight">NoteKeep</p>
        </div>

        {/* Navigation */}
        <div className="space-y-2 mb-12">
          <Link
            href="/newUI"
            className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl text-sm font-medium transition-all duration-200 group"
          >
            <FileText className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-white/90 group-hover:text-white transition-colors duration-200">
              All Notes
            </span>
          </Link>
          <Link
            href="/favourites"
            className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl text-sm font-medium transition-all duration-200 group"
          >
            <Heart className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-white/90 group-hover:text-white transition-colors duration-200">
              Favorites
            </span>
          </Link>
          <Link
            href="/tags"
            className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl text-sm font-medium transition-all duration-200 group"
          >
            <Tag className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-white/90 group-hover:text-white transition-colors duration-200">
              Tags
            </span>
          </Link>
        </div>

        {/* Tags Section */}
        <SignedIn>
          <div className="flex-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-4 px-3">
              Tags
            </h3>
            <div className="space-y-1 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {tags.length > 0 ? (
                tags.map((t) => (
                  <MenuBarTag
                    key={t.id}
                    colour={t.colour}
                    tag={t.tag}
                    number={countsTag[t.id] || 0}
                  />
                ))
              ) : (
                <p className="text-sm text-white/50 px-3 py-2">No tags yet</p>
              )}
            </div>
          </div>
        </SignedIn>
      </div>

      {/* User Section */}
      <SignedIn>
        <div className="px-6 py-6 border-t border-white/10 bg-black/10 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
            {user ? (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {user?.firstName || user?.username || "User"}
                </p>
                <p className="text-xs text-white/60 truncate">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            ) : (
              <p className="text-sm text-white/50">Loading...</p>
            )}
          </div>
        </div>
      </SignedIn>
    </nav>
  );
};

export default MenuBar;
