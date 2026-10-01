"use client";

import { Briefcase } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getSession, signOut } from "@/lib/auth/auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Avatar, AvatarFallback } from "./ui/avatar"
import LogoutButton from "./logout-button";
import { authClient } from "@/lib/auth/auth-client";

 
export default function Navbar() {
    const {data:session}=authClient.useSession();
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center gap-4 px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-semibold text-red-500"
        >
          <Briefcase />
          <span>Job Tracker</span>
        </Link>

        {/* Buttons */}
        <div className="ml-auto flex items-center gap-3">

          {session?.user ? (
            <>
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-black"
                >
                  Dashboard
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarFallback className="bg-primary text-black">
                      {session.user.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent>

                  <div className="px-3 py-2">
                    <p className="font-medium">
                      {session.user.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {session.user.email}
                    </p>
                  </div>

                  <DropdownMenuItem>
                    <LogoutButton />
                  </DropdownMenuItem>

                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              {/* Login */}
              <Link href="/sign-in">
                <Button className="bg-primary hover:bg-primary/90">
                  Log In
                </Button>
              </Link>

              {/* Sign Up */}
              <Link href="/sign-up">
                <Button className="bg-primary hover:bg-primary/90">
                  Start for free
                </Button>
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  )
}