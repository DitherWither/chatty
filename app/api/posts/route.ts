
import { prisma } from '@/app/db';
import { NextResponse } from 'next/server';


export async function GET(request: Request) {
    // TODO: paginate this
    const posts = await prisma.posts.findMany(
        {
            orderBy: {
                createdAt: "desc"
            }
        }
    );
    return NextResponse.json(posts);
}

async function parseJson(request: Request) {
    try {
        return await request.json()
    } catch (error) {
        return null;
    }
}

export async function POST(request: Request) {
    let body = await parseJson(request);

    if (!body) {
        return NextResponse.json(
            {
                error: "parse_error",
                displayText: "Failed to parse request json"
            },
            {
                status: 400
            }
        )
    }

    if (!body.title || body.title.toString().trim() == "") {
        return NextResponse.json(
            {
                error: "no_title",
                displayText: "Your post must have a title"
            },
            {
                status: 400
            }
        );
    }

    if (typeof body.title != "string") {
        return NextResponse.json(
            {
                error: "title_not_string",
                displayText: "The title must be a string"
            },
            {
                status: 400
            }
        );
    }

    if (body.content && typeof body.content != "string") {
        return NextResponse.json(
            {
                error: "content_not_string",
                displayText: "The content must be a string or null"
            },
            {
                status: 400
            }
        );
    }

    if (body.imageUrl && typeof body.imageUrl != "string") {
        return NextResponse.json(
            {
                error: "image_url_not_string",
                displayText: "The image url must be a string or null"
            },
            {
                status: 400
            }
        );
    }

    if (body.imageAlt && typeof body.imageAlt != "string") {
        return NextResponse.json(
            {
                error: "image_alt_not_string",
                displayText: "The image alt must be a string or null"
            },
            {
                status: 400
            }
        )
    }

    const post = await prisma.posts.create({
        data: {
            title: body.title.trim(),
            content: body.content?.trim(),
            imageUrl: body.imageUrl?.trim(),
            imageAlt: body.imageAlt?.trim()
        }
    });

    return NextResponse.json(post)
}