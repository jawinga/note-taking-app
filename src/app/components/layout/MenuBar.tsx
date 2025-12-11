"use client";
import React from "react";
import { Tag, Heart, FileText } from "lucide-react";
import Link from "next/link";
import SvgLogo from "../../../../public/SvgLogo";
import { SignOutButton, SignedIn, UserButton } from "@clerk/nextjs";
import { useTags } from "@/app/context/TagsContext";
import { useTagCounts } from "@/hooks/useTagCounts";

type MenuBarTagProps = {
  colour: string;
  tag: string;
  number: number;
};

const MenuBarTag = ({ colour, tag, number }: MenuBarTagProps) => {
  return (
    <div>
      <div style={{ backgroundColor: colour }}></div>
      {tag}
      <div>{number}</div>
    </div>
  );
};

const MenuBar = () => {
  const countsTag = useTagCounts();

  const { tags } = useTags();

  return (
    <div>
      {/* logo   */}
      <div>
        <SvgLogo></SvgLogo>
        <p>NoteKeep</p>
      </div>
      {/* logo   */}

      {/* Navigation */}

      <div>
        <Link href="/main">
          <div>
            <FileText></FileText>
            <span>All Notes</span>
          </div>
        </Link>
        <Link href="/favourites">
          <div>
            <Heart></Heart>
            <span>Favourites</span>
          </div>
        </Link>
        <Link href="/tags">
          <div>
            <Tag></Tag>
            <span>Tags</span>
          </div>
        </Link>
      </div>
      {/* Navigation */}
      {/* Tags */}

      <SignedIn>
        <div>
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
        <div>
          <UserButton></UserButton>
          <SignOutButton></SignOutButton>
        </div>
      </SignedIn>

      {/* User */}
    </div>
  );
};

export default MenuBar;
