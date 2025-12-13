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
    if (tag.length > 15) {
      const sliced = tag.slice(0, 15) + "...";
      return sliced;
    } else {
      return tag;
    }
  }

  return (
    <div className="flex gap-5 ">
      <div className="flex items-center w-35 gap-3">
        <div
          className="rounded-full w-4 h-4 border border-0.5 border-gray-600 "
          style={{ backgroundColor: colour }}
        ></div>
        <p>{tagLength(tag)}</p>
      </div>
      <div className="rounded-full min-w-6 h-6 text-gray-900 bg-gray-200 flex items-center justify-center text-xs font-medium px-2">
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
    <nav className=" bg-gradient-to-r from-blue-600 to-blue-700 text-white flex flex-col justify-between flex-shrink-0 border-2 border-r border-slate-200 dark:border-slate-800 w-64 flex-shrink-0 h-full overflow-y-auto z-20 pl-8 pt-10">
      <div className="flex flex-col">
        {/* logo   */}
        <div className="flex items-center gap-5 mb-8">
          <SvgLogo className="h-10 w-10 ml-2"></SvgLogo>
          <p className="font-bold">NoteKeep</p>
        </div>

        {/* logo   */}

        {/* Navigation */}

        {/* Navigation */}
        <nav className="flex-1 space-y-6">
          <Link
            href="/main"
            className="flex items-center gap-2 mr-2  hover:bg-gray-100 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group"
          >
            <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>All Notes</span>
          </Link>
          <Link
            href="/favourites"
            className="flex items-center gap-2 mr-2  hover:bg-gray-100 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group"
          >
            <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Favorites</span>
          </Link>
          <Link
            href="/favourites"
            className="flex items-center gap-2 mr-2  hover:bg-gray-100 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group"
          >
            <Tag className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Tags</span>
          </Link>
        </nav>
        {/* Navigation */}
      </div>

      <div>
        {/* Tags */}

        <SignedIn>
          <p className="my-4">TAGS</p>
          <div className="flex flex-col gap-2.5">
            {tags.map((t) => {
              return (
                <MenuBarTag
                  key={t.id}
                  colour={t.colour}
                  tag={t.tag}
                  number={countsTag[t.id] || 0}
                ></MenuBarTag>
              );
            })}
          </div>
        </SignedIn>

        {/* Tags */}

        {/* User */}

        <SignedIn>
          <div className="my-8 flex justify-start items-center gap-2">
            <UserButton></UserButton>
            {user ? (
              <p className="font-bold">
                {user?.firstName || user?.username || "User"}
              </p>
            ) : (
              <p className="text-sm text-gray-400">Loading...</p>
            )}
          </div>
        </SignedIn>

        {/* User */}
      </div>
    </nav>
  );
};

export default MenuBar;
