import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export  async function POST(req:NextRequest){
    const {email,name}=await req.json();
    const checkemail = await  prisma.user.findFirst({
        where:{
            email
        }
    })
    console.log(email, name)
    if (checkemail) {
        return NextResponse.json({
          msg: "User Already Exists",
          id: checkemail.id, 
        });
      }
      return NextResponse.json({
        msg:"aage badho"
    })     
}