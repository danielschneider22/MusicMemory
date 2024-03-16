import { NextRequest, NextResponse } from "next/server";
import taskSchema from "./schema";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest){
    const products = await prisma.task.findMany({});
    return NextResponse.json(products)
}

export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = taskSchema.safeParse(body);
    if(!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 })

    const newTask = await prisma.task.create({
        data: {
            description: body.description,
            complete: body.complete,
            taskCategoryId: body.taskCategoryId,
            userId: body.userId,
        }
    })
    return NextResponse.json(newTask, {status: 201})
}