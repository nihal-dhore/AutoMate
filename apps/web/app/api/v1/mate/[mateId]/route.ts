import { auth } from "@/auth";
import prisma from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

export default async function GET(req: NextRequest, { params }: {
  params: {
    slug: string;
  };
}) {
  const mateId = params.slug;

  if (!mateId) {
    return NextResponse.json({
      error: "Invalid Mate Id"
    }, {
      status: 400
    });
  }

  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({
        error: "Unauthorized Request"
      }, {
        status: 401
      });
    }

    const userId = session.user.id;

    const mate = await prisma.mate.findUnique({
      where: {
        id: mateId,
        userId
      },
      include: {
        Trigger: {
          include: {
            type: true
          }
        },
        Actions: {
          include: {
            type: true
          }
        }
      }
    });

    if (!mate) {
      return NextResponse.json({
        error: "Mate not found"
      }, {
        status: 404
      });
    }

    return NextResponse.json({
      mate,
      message: "Here is your mate"
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Internal Server Error"
    }, {
      status: 500
    });
  }
}