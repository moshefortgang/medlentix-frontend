import { RealEstateTransaction } from "@/types/RealEstateTransaction";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getRealEstateTransaction(pid: number): Promise<RealEstateTransaction[]> {
  try {
    const result = await prisma.$queryRaw<RealEstateTransaction[]>`SELECT m."Kibolet", r.*, b.gush, b.helka
      FROM public."RealEstateTransactions" AS r
      LEFT JOIN "Block" AS b ON r.gush = b.gush AND r.helka = b.helka
      LEFT JOIN "Project" AS p ON b."projectId" = p.id
      LEFT JOIN "Michraz" AS m ON p."michrazId" = m.id
      WHERE p.id = ${pid}
    `;
    return result;
  } catch (error) {
    console.error("Error fetching real estate transactions:", error);
    throw error;
  }
}
