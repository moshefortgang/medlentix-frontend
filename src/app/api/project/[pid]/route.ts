import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

async function getProjectDetails(pid: number) {
  try {
    const projectFilter = {
      where: { id: pid },
      include: { Block: true },
    };

    const project = await prisma.project.findMany(projectFilter);
    return project;
  } catch (error) {
    console.error("Error fetching project details:", error);
    throw error;
  }
}

async function getRealEstateTransactions(pid: number) {
  try {
    const result = await prisma.$queryRawUnsafe(`
      SELECT m."Kibolet", r.*, b.gush, b.helka
      FROM public."RealEstateTransactions" AS r
      LEFT JOIN "Block" AS b ON r.gush = b.gush AND r.helka = b.helka
      LEFT JOIN "Project" AS p ON b."projectId" = p.id
      LEFT JOIN "Michraz" AS m ON p."michrazId" = m.id
      WHERE p.id = $1
    `, pid);

    return result;
  } catch (error) {
    console.error("Error fetching real estate transactions:", error);
    throw error;
  }
}

export async function GET(request: Request, { params }: { params: { pid: string } }) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  try {
    const pid = +params.pid;

    const projectDetails = await getProjectDetails(pid);
    const realEstateTransactions = await getRealEstateTransactions(pid);

    console.log(realEstateTransactions);

    return Response.json({ result: realEstateTransactions });
  } finally {
    await prisma.$disconnect();
  }
}
