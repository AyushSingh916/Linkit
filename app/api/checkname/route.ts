import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    const { name } = await req.json();
    const users = await prisma.user.findFirst({
      where: {
        name: {
          contains: name, // partial matching
          mode: 'insensitive' // case-insensitive search
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    if(users){
      return NextResponse.json({
        status:501
      })
    }
      return NextResponse.json(users, {
        status: 201,
      })
  } 