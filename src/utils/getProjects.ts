import { Prisma, PrismaClient } from "@prisma/client";
import { Project } from "@/types/Project";

const prisma = new PrismaClient();

export default async function getProject(id: number, isCityPage: boolean = false): Promise<Project[]> {
  try {

		if (isCityPage){
			const projectFilter = {
				where: { city: id },
      	include: {
					 michraz: true
					
					},
					
				orderBy: {
					michraz: {
						VaadaDate:  Prisma.SortOrder.desc 
					}
				},
			};
			const project = await prisma.project.findMany(projectFilter);
			return project;
		} else {
			return await prisma.$queryRaw<Project[]>`SELECT m."Kibolet", m."VaadaDate",  p."projectName",
																							p.shchuna 
																							FROM "Project" AS p
		 																					LEFT JOIN "Michraz" AS m on m.id = p."michrazId"
		 																					WHERE p.id = ${id}
																							ORDER BY "VaadaDate" DESC
																							`;
		}



  } catch (error) {
    console.error("Error fetching real estate transactions:", error);
    throw error;
  }
}