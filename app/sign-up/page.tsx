"use client";
import { Card,CardHeader,CardTitle,CardDescription,CardContent,CardFooter} from "@/components/ui/card";
import { Label } from "@/components/ui/label"
import {  Input } from "@/components/ui/input"
import {  Button } from "@/components/ui/button"
 import  Link  from "next/link"
 import React, {useState} from "react";
import { signUpEmail } from "better-auth/api";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/auth-client";
export default function SignUp(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
     
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
     const router=useRouter();

    async function handleSubmit(e:React.FormEvent){
e.preventDefault();

setError("");
setLoading(true);
try{
 const result=await authClient.signUp.email({
    name,
    email,
    password
 })
 console.log("DATA:",result.data);
 console.log("ERROR:",result.error)
 if(result.error){
     
    setError(result.error.message?? "Failed to sign up")
 
   
 }
 else{
router.push("/dashboard");
 }
}catch(err){
 setError("An unexpected error occured");
}
finally{
    setLoading(false);
}
    }
return <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">

<Card className="w-full max-w-md border-gray-200 shadow-lg">
    <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-black"> Sign Up</CardTitle>
   <CardDescription className="text-gray-600">
Craete an account to start tarcking your job application
   </CardDescription>
        
    </CardHeader>
         <form onSubmit={handleSubmit} className="space-y-4">
        <CardContent className="space-y-4">
            {error &&(
                <div className="rounded-md bg-destructure/15 bg-red-200 p-3 text-sm text-destructive text-red-500 text-bold-500">{ error } </div>
            )
            }
            <div className="space-y-2">
               <Label htmlFor="name" className="text-gray-700"> Name
               </Label>
               <Input id="name"
               type="text"
               placeholder="Nitin raghvan"
               value={name}
               onChange={(e)=>{
                setName(e.target.value);
               }}
               className="border-gray-300 focus:border-primary focus:ring-primary"
               required/>
               </div>
                <div className="space-y-2">
               <Label 
               htmlFor="email"
               className="text-gray-700">Email
               </Label>
               <Input id="email"
               type="email"
               placeholder="nitin@gmail.com"
                value={ email}
               onChange={(e)=>{
                setEmail(e.target.value);
               }}
               className="border-gray-300  focus:border-primary focus:ring-primary"
               required/>
               <Label>Password
               </Label>
               <Input id="password"
               type="password"
               placeholder=""
                value={password}
                minLength={8}
               onChange={(e)=>{
                setPassword(e.target.value);
               }}
               className="border-gray-300 focus:border-primary focus:ring-primary"
               required/>
               
            </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
            <Button type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90"
            >{ loading ?"Creating account..." : "Sign Up"}</Button>
            <p>Already have an account ? <Link href="/sign-in"> Sign In</Link></p>
        </CardFooter>
    </form>
</Card>
     </div>
}