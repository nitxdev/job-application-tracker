"use client";

import { useEffect, useState } from "react";

type Job = {
  _id: string;
  companyName: string;
  jobTitle: string;
  location: string;
  employmentType: string;
  salary: string;
  status: string;
};

export default function MyApplications() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

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
        console.error("FETCH JOBS ERROR:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  async function updateStatus(id: string, status: string) {
    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      setJobs((currentJobs) =>
        currentJobs.map((job) =>
          job._id === id ? { ...job, status } : job
        )
      );
    } catch (error) {
      console.error("UPDATE STATUS ERROR:", error);
    }
  }

  async function deleteJob(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete job");
      }

      setJobs((currentJobs) =>
        currentJobs.filter((job) => job._id !== id)
      );
    } catch (error) {
      console.error("DELETE JOB ERROR:", error);
    }
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.companyName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      job.jobTitle
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "All" ||
      job.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="p-6">
        Loading applications...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        My Applications
      </h1>

      {/* Search + Filter */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Search company or job..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md p-2 flex-1"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded-md p-2"
        >
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Selected">Selected</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {filteredJobs.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div className="grid gap-4">
          {filteredJobs.map((job) => (
            <div
              key={job._id}
              className="border rounded-lg p-5 space-y-3"
            >
              <h2 className="text-xl font-semibold">
                {job.jobTitle}
              </h2>

              <p>
                <strong>Company:</strong>{" "}
                {job.companyName}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {job.location}
              </p>

              <p>
                <strong>Employment:</strong>{" "}
                {job.employmentType}
              </p>

              <p>
                <strong>Salary:</strong>{" "}
                {job.salary}
              </p>

              <div className="flex items-center gap-3">
                <strong>Status:</strong>

                <select
                  value={job.status}
                  onChange={(e) =>
                    updateStatus(
                      job._id,
                      e.target.value
                    )
                  }
                  className="border rounded-md p-2"
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <button
                onClick={() => deleteJob(job._id)}
                className="border rounded-md px-4 py-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}