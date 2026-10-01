"use client"
import { authClient } from '@/lib/auth/auth-client';
import { useRouter } from "next/navigation"
import { DropdownMenuItem } from  "./ui/dropdown-menu"
export default function LogoutButton(){
    const router =useRouter();
    const handleLogout=async()=>{
        await authClient.signOut()
        router.push("/sign-in");
    }
    return (
        <DropdownMenuItem> 
        <span
        onClick ={handleLogout}
        className="block w-ful cursor-pointer">
        Log Out
        </span>
        </DropdownMenuItem>
    )
}