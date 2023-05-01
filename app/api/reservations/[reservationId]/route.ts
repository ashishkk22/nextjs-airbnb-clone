import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== "string") {
      throw new Error("Invalid ID");
    }

    const reservation = await prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { usedId: currentUser.id },
          { listing: { usedId: currentUser.id } },
        ],
      },
    });

    return NextResponse.json(reservation);
  } catch (error: any) {
    throw new Error(error);
  }
}
