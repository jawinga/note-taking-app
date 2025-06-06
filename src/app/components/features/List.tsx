"use client";
import React from "react";
import Card from "./Card";
import { Note } from "@/app/models/Note";

interface CardProps {
  notes: Note[];
}

const List = ({ notes }: CardProps) => {
  return (
    <>
      {notes.map((note) => {
        return <Card key={note.id} note={note}></Card>;
      })}
    </>
  );
};

export default List;
