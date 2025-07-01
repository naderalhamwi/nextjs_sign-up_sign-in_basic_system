import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";

export async function POST() {
  const authorization = (await headers()).get("authorization");
  if (!authorization) return NextResponse.json({ status: 401 });

  const token = authorization.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as {
      userId: number;
    };
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: { posts: true },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Invalid token", e: e }, { status: 401 });
  }
}
