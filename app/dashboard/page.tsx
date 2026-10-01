"use client";

import { useEffect, useState } from "react";

type Job = {
  _id: string;
  status: string;
};

export default function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/jobs")
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch jobs");
        }

        return data;
      })
      .then((data) => {
        setJobs(data);
      })
      .catch((error) => {
        console.error("DASHBOARD ERROR:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const total = jobs.length;

  const applied = jobs.filter(
    (job) => job.status === "Applied"
  ).length;

  const interviews = jobs.filter(
    (job) => job.status === "Interview"
  ).length;

  const selected = jobs.filter(
    (job) => job.status === "Selected"
  ).length;

  const rejected = jobs.filter(
    (job) => job.status === "Rejected"
  ).length;

  if (loading) {
    return (
      <div className="p-6">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">
        Dashboard
      </h1>

      <p className="text-gray-500 mb-8">
        Track your job applications
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="border rounded-lg p-5">
          <p className="text-sm text-gray-500">
            Total Applications
          </p>
          <h2 className="text-3xl font-bold mt-2">
            {total}
          </h2>
        </div>

        <div className="border rounded-lg p-5">
          <p className="text-sm text-gray-500">
            Applied
          </p>
          <h2 className="text-3xl font-bold mt-2">
            {applied}
          </h2>
        </div>

        <div className="border rounded-lg p-5">
          <p className="text-sm text-gray-500">
            Interviews
          </p>
          <h2 className="text-3xl font-bold mt-2">
            {interviews}
          </h2>
        </div>

        <div className="border rounded-lg p-5">
          <p className="text-sm text-gray-500">
            Selected
          </p>
          <h2 className="text-3xl font-bold mt-2">
            {selected}
          </h2>
        </div>

        <div className="border rounded-lg p-5">
          <p className="text-sm text-gray-500">
            Rejected
          </p>
          <h2 className="text-3xl font-bold mt-2">
            {rejected}
          </h2>
        </div>
      </div>
    </div>
  );
}