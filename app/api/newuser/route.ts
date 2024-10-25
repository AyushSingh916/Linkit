import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { getSession } from "next-auth/react";

export async function POST(req: NextRequest) {
    try {
        // Parse the JSON body
        const { name, email, password }: any = await req.json(); // Use await req.json() to get the body correctly

        // Check for missing fields
        if (!name || !email || !password) {
            return NextResponse.json({
                msg: "Details Not Correct"
            }, { status: 400 }); // Return a 400 Bad Request status
        }

        const session = await getSession();
        if (session) {
            return NextResponse.json({
                msg: "User Already Signed In. Please log out first.",
            }, { status: 403 }); // Return a 403 Forbidden status
        }
     

        const checkname = await prisma.user.findFirst({
            where:{
                name,
            }
        })
       
        // Check if user already exists
        const checkUser = await prisma.user.findFirst({
            where: {
                email,
            },
        });
        if (checkUser) {
            return NextResponse.json({
                msg: "User Already Exists",
            }, { status: 409 }); // Return a 409 Conflict status
        }
        if(checkUser && checkname){
            return NextResponse.json({
                msg: "User Already Exists",
            }, { status: 409 });
        }
        if(checkname){
            return NextResponse.json({
                msg:"Username not available"
            })
        }

        // Hash the password
        const hashedpassword: string = await bcrypt.hash(password, 10);

        // Create the user in the database
        const createUser = await prisma.user.create({
            data: {
                name,
                email,
                hashedpassword, // Ensure this matches your Prisma schema
            },
            select: {
                id:true,
                name: true,
                email:true,
            },
        });
        return NextResponse.json({
            msg: "User created successfully",
        }, { status: 201 }); // Return a 201 Created status
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({
            msg: "Some Error Occurred",
        }, { status: 500 }); // Return a 500 Internal Server Error status
    }
}
