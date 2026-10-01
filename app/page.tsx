
 import { ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";
import Link from "next/link";
// import Image from "next/image";
import { Button } from "@/components/ui/button";
 import Navbar  from "@/components/navbar";
import ImageTabs from "@/components/ui/tab-image";
// import { useState} from 'react';
 import {Briefcase} from "lucide-react";
export default function Home() {
   
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-black">
              A better way to track your job application.
            </h1>
            <p className="mb-8 text-lg text-gray-500">
              Capture, organise, and manage your job search in one place.
            </p>
            <div className="flex flex-col items-center gap-4">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="h-12 px-8 text-lg font-bold"
                >
                  Start for free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <p className="text-sm text-gray-500">
                Free forever. No credit card required.
              </p>
            </div>
          </div>
        </section>
        {/*Hero Image Section with tabs */}
        <ImageTabs/>
        {/** Feature Section */}
        <section className="border-t bg-white py-24">
          <div className="conatiner mx-auto px-4">
            <div className="grid gap-12 md:grid-rows">

              <div className="flex flex-col">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center bg-red-100 rounded">
                  <Briefcase className="h-6 w-6 text-primary"/>
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-black">Organize Applications</h3>
                <p className="text-muted-foreground">

                  Craete custom boards and columns to track your job applications at every stage of the process.
                </p>
              </div>
              <div className="flex flex-col">
                <div className="mb-4 inline-flex h-12 w-12 items-center jusify-center"/>
                <TrendingUp className="h-11 w-11  text-primary bg-red-100 rounded"/>
            
              <h3 className="mb-3 text-2xl font-semibold text-black">
                Track Progress
              </h3>
              <p className="text-muted-foreground">
                Monitor your application status from applied to interview offer with visual Kanban boards
              </p>
               
            </div>
          
            <div className="flex flex-col">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center">
                <CheckCircle2 className="h-11 w-11 text-primary bg-red-100 rounded"/>

              </div>
              <h3 className="mb-3 text-2xl font-semibold text-black">
                Staty Oragnized
              </h3>
              <p className="text-muted-foreground">
                Never lose track of an application . Keep al your job search here
              </p>
            </div>
           </div>
             </div>
        </section>
      </main>
    </div>
  );
}