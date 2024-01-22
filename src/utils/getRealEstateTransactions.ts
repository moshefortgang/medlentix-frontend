import { RealEstateTransaction } from "@/types/RealEstateTransaction";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getRealEstateTransaction(
  id: any,
  isCityPage: boolean = false
): Promise<RealEstateTransaction[]> {
  try {
    const query = buildQuery(id, isCityPage);
    const result = await prisma.$queryRaw<RealEstateTransaction[]>(Prisma.raw(query));
    return result;
  } catch (error) {
    console.error("Error fetching real estate transactions:", error);
    throw error;
  }
}

function buildQuery(id: any, isCityPage: boolean): string {
  if (isCityPage) {
    return `
      SELECT r.*, r.gush, r.helka
      FROM public."RealEstateTransactionsNadlanGov" AS r
      WHERE r.locality = ${id}
			LIMIT 100
    `;
  } else {
    return `
      SELECT m."Kibolet", r.*, b.gush, b.helka
      FROM public."RealEstateTransactionsNadlanGov" AS r
      LEFT JOIN "Block" AS b ON r.gush = b.gush AND r.helka = b.helka
      LEFT JOIN "Project" AS p ON b."projectId" = p.id
      LEFT JOIN "Michraz" AS m ON p."michrazId" = m.id
      WHERE p.id = ${id}
			LIMIT 100
    `;
  }
}