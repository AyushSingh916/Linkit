import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {id}=await req.json();
    const res=await prisma.collection.findFirst({
        where:{
           id
        },select:{
            ref:true
        }
    })
    return NextResponse.json(res,{
        status:201
    })
}