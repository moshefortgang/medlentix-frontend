import { PrismaClient } from "@prisma/client";
import { Project } from "@/types/Project";

const prisma = new PrismaClient();

export default async function getProject(pid: number): Promise<Project[]> {
  try {
    const result = await prisma.$queryRaw<Project[]>`SELECT m."Kibolet", m."VaadaDate",  p."projectName",
		 	p.shchuna 
		 	FROM "Project" AS p
			LEFT JOIN "Michraz" AS m on m.id = p."michrazId"
      WHERE p.id = ${pid}
    `;
    return result;
  } catch (error) {
    console.error("Error fetching real estate transactions:", error);
    throw error;
  }
}
