import React from "react";
import { Search, Bell, User } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">Mind Mark</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <a
                  href="#"
                  className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  All Notes
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Favorites
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Archive
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Tags
                </a>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search notes..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          {/* Right side items */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              {/* Notifications */}
              <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                <Bell className="h-5 w-5" />
              </button>

              {/* Profile dropdown */}
              <div className="relative">
                <button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                </button>

                {/* Profile Dropdown Menu */}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"></button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
