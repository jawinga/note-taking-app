"use client";
import React from "react";
import MenuBar from "../components/layout/MenuBar";
import NewForm from "./ui/NewForm";

const page = () => {
  return (
    <div className="flex h-screen">
      <MenuBar />
      <div className="flex-1 p-8">
        <NewForm />
      </div>
    </div>
  );
};

export default page;
