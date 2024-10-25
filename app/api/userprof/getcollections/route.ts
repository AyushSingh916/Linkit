import { NextRequest , NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function  POST(req:NextRequest){
  const {num}=await req.json();
  const userId=Number(num);
  const res= await prisma.collection.findMany({
    where:{
        userId
    },
    select:{
        ref:true,
        id:true
    }
  })
  if(res){
    return NextResponse.json(res,{
    status:201
    })
  }
  return NextResponse.json({
    msg:"Some Error Occured"
  })
}