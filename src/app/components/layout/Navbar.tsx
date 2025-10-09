"use client";
import React from "react";
import { Tag, Heart, FileText, X, Menu } from "lucide-react";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useState } from "react";
import SvgLogo from "../../../../public/SvgLogo";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <SvgLogo className="h-10 w-10 text-gray-800"></SvgLogo>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block ml-8">
              <div className="flex items-center space-x-1">
                <SignedIn>
                  <Link
                    href="../pages/main"
                    className="flex items-center gap-2 text-gray-900 hover:text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group"
                  >
                    <FileText className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    All Notes
                  </Link>
                  <Link
                    href="../pages/favourites"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group"
                  >
                    <Heart className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    Favorites
                  </Link>
                  <Link
                    href="../pages/tags"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group"
                  >
                    <Tag className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    Tags
                  </Link>
                </SignedIn>
              </div>
            </div>
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedOut>
              <SignInButton>
                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="border border-blue-400 shadow-lg pl-4 pr-4 pt-2 pb-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg text-white font-medium">
                  Sign up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center space-x-3">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox:
                        "w-8 h-8 ring-2 ring-gray-200 hover:ring-gray-300 transition-all",
                    },
                  }}
                />
              </div>
            </SignedIn>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-gray-50/50 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <SignedIn>
                <Link
                  href="../pages/main"
                  className="flex items-center gap-3 text-gray-900 hover:text-gray-700 hover:bg-gray-100 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FileText className="h-5 w-5" />
                  All Notes
                </Link>
                <Link
                  href="../pages/favourites"
                  className="flex items-center gap-3 text-gray-600 hover:text-gray-700 hover:bg-gray-100 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Heart className="h-5 w-5" />
                  Favorites
                </Link>
                <Link
                  href="../pages/tags"
                  className="flex items-center gap-3 text-gray-600 hover:text-gray-700 hover:bg-gray-100 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Tag className="h-5 w-5" />
                  Tags
                </Link>
              </SignedIn>

              <SignedOut>
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <SignInButton>
                    <button className="w-full text-left px-3 py-3 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
                      Sign in
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="w-full px-3 py-3 bg-gray-900 text-white rounded-lg text-base font-medium hover:bg-gray-800 transition-all duration-200">
                      Sign up
                    </button>
                  </SignUpButton>
                </div>
              </SignedOut>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
