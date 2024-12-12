import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import NEXT_AUTH from "@/lib/auth"; // Ensure this exports valid NextAuth options
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(NEXT_AUTH);
    if (!session || !session.user) {
      return NextResponse.json(
        { msg: "Unauthorized" },
        { status: 401 } // Return unauthorized if session is invalid
      );
    }

    const { ref } = await req.json();
    
    if (!ref) {
      return NextResponse.json(
        { msg: "Reference is required" },
        { status: 400 }
      );
    }
    const userId=Number(session?.user.id);
    const collection = await prisma.collection.create({
      data: {
        ref,
        userId
      },
      select: {
        id: true,
        ref: true,
      },
    });

    return NextResponse.json(collection, { status: 201 });
  } catch (error) {
    console.error("Error creating collection:", error);
    return NextResponse.json(
      { msg: "Internal server error" },
      { status: 500 } 
    );
  }
}
