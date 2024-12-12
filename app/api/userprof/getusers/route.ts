import {prisma} from '@/lib/prisma'
import { NextResponse } from 'next/server';
export async function GET(){
  try {
    const users = await prisma.user.findMany(
    );
    return NextResponse.json(users,{
        status:201
    })
  } catch (error) {
    console.error("Error fetching users:", error);
  }
  return NextResponse.json({
  msg:"error occured while fetching users"
  },{
    status:403
  })
}