import { headers } from "next/headers";
import React from "react";
import { PrismaClient } from "@prisma/client";

export type Project = {
  id: number;
};

type Props = {
  projects: Project[];
};

const prisma = new PrismaClient();

const Project = async () => {
	// const res = await import("../api/project");
	// await (await res.handler()).json() 
	const host = headers().get("host");
  const protocal = process?.env.NODE_ENV === "development" ? "http" : "https";
  const projects = await (await fetch(`${protocal}://${host}/api/project/`, { cache: 'no-store' })).json();
	console.log(projects.project[0].projectName)
  return (
    <div>
        {projects.project[0].projectName}
    </div>
  );
};


export default Project;
