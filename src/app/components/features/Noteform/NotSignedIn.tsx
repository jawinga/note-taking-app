import React from "react";
import { StickyNote } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";

const NotSignedIn = () => {
  return (
    <div className="flex flex-col rounded-xl border-1 items-center gap-4 p-6 w-auto bg-gray-50">
      <div className="bg-blue-600 rounded-lg p-5">
        <StickyNote />
      </div>
      <h2 className="p-3 text-black text-2xl">
        Sign In or Register to Add Notes
      </h2>
      <span>You need to have an account to create and manage your notes.</span>
      <SignInButton>
        <button className="border-b-blue-600 shadow-md pl-3 pr-3 pt-2 pb-2 bg-blue-700 rounded-lg">
          Create Note
        </button>
      </SignInButton>
    </div>
  );
};

export default NotSignedIn;
