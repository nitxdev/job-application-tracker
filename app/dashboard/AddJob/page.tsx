"use client";

import { Button } from "@/components/ui/button";
import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddJob() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log("FORM DATA:", data);

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.text();

      console.log("API RESPONSE:", result);

      if (!response.ok) {
        console.log("API ERROR:", result);
        return;
      }

      setSubmitted(true);

      router.push("/dashboard/MyApplication");
    } catch (error) {
      console.error("SUBMIT ERROR:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Add Job
      </h1>

      <form
        className="space-y-4"
        onSubmit={handleFormSubmit}
      >
        <input
          name="companyName"
          type="text"
          placeholder="Company Name"
          className="w-full border rounded-md p-2"
        />

        <input
          name="jobTitle"
          type="text"
          placeholder="Job Title"
          className="w-full border rounded-md p-2"
        />

        <input
          name="location"
          type="text"
          placeholder="Location"
          className="w-full border rounded-md p-2"
        />

        <input
          name="employmentType"
          type="text"
          placeholder="Full-time / Part-time / Internship"
          className="w-full border rounded-md p-2"
        />

        <input
          name="salary"
          type="text"
          placeholder="Salary range"
          className="w-full border rounded-md p-2"
        />

        <input
          name="status"
          type="text"
          placeholder="Applied / Interview / Selected / Rejected"
          className="w-full border rounded-md p-2"
        />

        <Button type="submit">
          Add Job
        </Button>

        {submitted && (
          <p className="text-green-600">
            Job added successfully!
          </p>
        )}
      </form>
    </div>
  );
}