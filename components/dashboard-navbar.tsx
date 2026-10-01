"use client"

import { Briefcase } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Avatar, AvatarFallback } from "./ui/avatar"
import LogoutButton from "./logout-button"
import {  authClient } from "@/lib/auth/auth-client"

export default function DashboardNavbar() {
  const { data: session } = authClient.useSession()

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center gap-4 px-8">

        {/* Logo */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-xl font-semibold text-red-500"
        >
          <Briefcase />
          <span>Job Tracker</span>
        </Link>

        {/* Buttons */}
        <div className="ml-auto flex items-center gap-3">

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
                  {session?.user?.name?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent>

              <div className="px-3 py-2">
                <p className="font-medium">
                  {session?.user?.name}
                </p>

                <p className="text-sm text-gray-500">
                  {session?.user?.email}
                </p>
              </div>

              <DropdownMenuItem>
                <LogoutButton />
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
    </nav>
  )
}