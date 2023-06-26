import { prisma } from "@/app/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const id = +params.id;

    if (!id && id != 0) {
        console.log(id)
        return NextResponse.json({
            error: "id_parse_failed",
            displayText: "Could not parse the id to a number, or the id was null"
        })
    }

    const post = await prisma.posts.findUnique({
        where: {
            id: id
        }
    });
    if (!post) {
        return NextResponse.json({
            error: "not_found",
            displayText: "The post could not be found"
        }, {
            status: 404
        });
    }
    return NextResponse.json(post);
}