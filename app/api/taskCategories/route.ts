import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import taskCategorySchema from "./schema";

export async function GET(request: NextRequest){
    const products = await prisma.taskCategory.findMany({});
    return NextResponse.json(products)
}

export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = taskCategorySchema.safeParse(body);
    if(!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 })

    const newTask = await prisma.taskCategory.create({
        data: {
            name: body.name,
            position: body.position,
            userId: body.userId
        }
    })
    return NextResponse.json(newTask, {status: 201})
}