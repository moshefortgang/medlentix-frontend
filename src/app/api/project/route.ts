
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

export async function GET(request: Request) {

  const prisma = new PrismaClient();

  let project:
    | ({
        Block: {
          id: number;
          createdAt: Date | null;
          updatedAt: Date | null;
          projectId: number;
          gush: number | null;
          helka: number | null;
        }[];
      } & {
        id: number;
        createdAt: Date | null;
        updatedAt: Date | null;
        projectName: string;
        shchuna: string | null;
        michrazId: number | null;
      })[]
    | BodyInit
    | null
    | undefined = [];
		
  try {
    const projectFilter = {
      where: {
        id: 281,
      },
      include: {
        Block: true,
      },
    };

    project = await prisma.project.findMany(projectFilter);
  } catch (err: any) {}

	return Response.json({ project })

}
