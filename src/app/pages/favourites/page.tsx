import React from "react";
import ListFavs from "@/app/components/features/ListFavs";

const page = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6 ml-4 mr-4">
        <ListFavs></ListFavs>;
      </div>
    </div>
  );
};

export default page;
