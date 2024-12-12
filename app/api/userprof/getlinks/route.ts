import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function POST(req:NextRequest){
    const {collectionId}= await req.json();
    const res = await prisma.link.findMany({
        where:{
            collectionId
        },
        select:{
            reflink:true,
            reftitle:true,
            id:true
        }
    })
    if(res){
        return NextResponse.json({
            res
        },{
            status:201
        })
    }
    return NextResponse.json({
        msg:"Error Occured"
    },{
        status:403
    })
}