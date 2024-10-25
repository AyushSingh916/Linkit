import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function POST(req:NextRequest) {
    const {name}=await req.json();
 const id = await prisma.user.findFirst({
    where:{
        name
    },select:{
        id:true
    }
 })
   if(id){
    return NextResponse.json(id,{
        status:201
    })
   }
   else{
    return NextResponse.json({
        status:403
    })
   }
}