import { PrismaClient } from "@prisma/client";
import { Project } from "@/types/Project";

const prisma = new PrismaClient();

export default async function getProject(id: number, isCityPage: boolean = false): Promise<Project[]> {
  try {
    if (isCityPage) {
      return await prisma.$queryRaw<Project[]>`
					SELECT
							p.id,
					    m."Kibolet",
					    m."VaadaDate",
					    p."projectName",
							count(r)::int AS "totalCount",
					    p.shchuna
					FROM
					    "Project" AS p
					LEFT JOIN
					    "Michraz" AS m ON m.id = p."michrazId"
					LEFT JOIN
					    "Block" AS b ON b."projectId" = p.id
					LEFT JOIN
					    "RealEstateTransactionsNadlanGov" AS r ON r.gush = b.gush AND r.helka = b.helka
					WHERE
					    city = ${id}
					GROUP BY
							p.id,
					    m."Kibolet",
					    m."VaadaDate",
					    p."projectName",
					    p.shchuna
					ORDER BY
							"VaadaDate" DESC;

					`;
    } else {
      return await prisma.$queryRaw<Project[]>`
						SELECT
						    m."Kibolet",
						    m."VaadaDate",
						    p."projectName",
						    COUNT(r) AS sum,
						    p.shchuna 
						FROM
						    "Project" AS p
						LEFT JOIN
						    "Michraz" AS m ON m.id = p."michrazId"
						LEFT JOIN
						    "Block" AS b ON b."projectId" = p.id
						LEFT JOIN
						    "RealEstateTransactionsNadlanGov" AS r ON r.gush = b.gush AND r.helka = b.helka
						WHERE
						    p.id = ${id}
						GROUP BY
						    m."Kibolet",
						    m."VaadaDate",
						    p."projectName",
						    p.shchuna,
						    "dealDateTime"
						ORDER BY
						    "dealDateTime" DESC;
		`;
    }
  } catch (error) {
    console.error("Error fetching real estate transactions:", error);
    throw error;
  }
}
