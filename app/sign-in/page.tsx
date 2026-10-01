
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

export default function SignIn(){
    
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
 const result=await authClient.signIn.email({
    email,
    password,
    callbackURL:"/dashboard",
 })
  
 if(result.error){
    setError(result.error.message?? "Failed to Sign In")
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
        <CardTitle className="text-2xl font-bold text-black"> Sign In</CardTitle>
   <CardDescription className="text-gray-600">
 Enter your credintial to access your account
   </CardDescription>
        
    </CardHeader>
         <form onSubmit={handleSubmit}
         className="space-y-4">
        <CardContent className="space-y-4">
            <div className="space-y-2">
                
               </div>
                <div className="space-y-2">
               <Label 
               htmlFor="email"
               className="text-gray-700">Email
               </Label>
               <Input id="email"
               type="email"
               value={email}
               onChange={(e)=>{
                setEmail(e.target.value)
               }}
               placeholder="nitin@gmail.com"
               className="border-gray-300  focus:border-primary focus:ring-primary"
               required/>
               <Label>Password
               </Label>
               <Input id="password"
               type="password"
               value={password}
               onChange={(e)=>{
                setPassword(e.target.value);
               }}
               placeholder=""
               className="border-gray-300 focus:border-primary focus:ring-primary"
               required/>
               
            </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
            <Button type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={loading}

            >{loading?"Signing in..":"Sign In"} </Button>
            <p> Do not have an account ? <Link href="/sign-up"> Sign Up</Link></p>
        </CardFooter>
    </form>
</Card>
   </div>
}