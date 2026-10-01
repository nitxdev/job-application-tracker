import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Job from "@/lib/models/Job";
import { getSession } from "@/lib/auth/auth";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const data = await request.json();

    await connectDB();

    const job = await Job.findOneAndUpdate(
      {
        _id: id,
        userEmail: session.user.email,
      },
      {
        status: data.status,
      },
      {
        new: true,
      }
    );

    if (!job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error("UPDATE JOB ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update job" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    await connectDB();

    const job = await Job.findOneAndDelete({
      _id: id,
      userEmail: session.user.email,
    });

    if (!job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("DELETE JOB ERROR:", error);

    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 }
    );
  }
}