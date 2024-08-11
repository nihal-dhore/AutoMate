import { NextRequest, NextResponse } from "next/server";
import { mateSchema } from "@repo/schemas/mate";
import prisma from "@repo/db/client";
import { auth } from "@/auth";
export async function POST(req: NextRequest) {

  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({
      error: "Unauthorized Request"
    }, {
      status: 401
    });
  }

  const userId = session.user.id;

  const body = await req.json();

  const mateValidation = mateSchema.safeParse(body);

  if (!mateValidation.success) {
    return NextResponse.json({
      error: mateValidation.error.issues.map(issue => issue.message)
    }, { status: 400 });
  }


  try {
    await prisma.mate.create({
      data: {
        userId,
        Actions: {
          create: mateValidation.data.actions.map((action, index) => ({
            actionId: action.availableActionId,
            sortingOrder: index
          }))
        },
        Trigger: {
          create: {
            availableTriggerId: mateValidation.data.availableTriggerId
          }
        }
      }
    });
    return NextResponse.json({
      message: "Mate Created Successfully"
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

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({
      error: "Unauthorized Request"
    }, {
      status: 401
    });
  }

  const userId = session.user.id;

  try {
    const mates = await prisma.mate.findMany({
      where: {
        userId: userId
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
        },
      }
    });
    return NextResponse.json({
      mates,
      message: "Your Mates"
    }, {
      status: 200
    });
  } catch (error) {
    return NextResponse.json({
      error: "Internal Server Error"
    }, {
      status: 500
    });
  }
}