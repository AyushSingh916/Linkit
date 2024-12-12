import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { reftitle, reflink, collectionId } = await req.json();

    // Log incoming request data
    console.log('Incoming data:', { reftitle, reflink, collectionId });

    const res = await prisma.link.create({
      data: {
        reftitle,
        reflink,
        collectionId
      },
      select: {
        reflink: true,
        id: true
      }
    });

    // Log Prisma response
    console.log('Prisma response:', res);

    if (res.id) {
      return NextResponse.json({
        res
      }, {
        status: 201
      });
    }

    return NextResponse.json({
      msg: "Some Error Occurred"
    }, {
      status: 403
    });
  } catch (error) {
    console.error('Error in API route:', error); // Log server-side error
    return NextResponse.json({
      msg: "Internal Server Error"
    }, {
      status: 500
    });
  }
}
