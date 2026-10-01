import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Job from "@/lib/models/Job";
import { getSession } from "@/lib/auth/auth";

// ADD JOB
export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await request.json();

    await connectDB();

    const job = await Job.create({
      ...data,
      userEmail: session.user.email,
    });

    return NextResponse.json(job, {
      status: 201,
    });
  } catch (error) {
    console.error("CREATE JOB ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to create job",
        details: String(error),
      },
      { status: 500 }
    );
  }
}

// GET USER'S JOBS
export async function GET() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const jobs = await Job.find({
      userEmail: session.user.email,
    }).sort({ createdAt: -1 });

    return NextResponse.json(jobs, {
      status: 200,
    });
  } catch (error) {
    console.error("GET JOBS ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch jobs",
        details: String(error),
      },
      { status: 500 }
    );
  }
}