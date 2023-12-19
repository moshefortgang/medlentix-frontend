import React from "react";
import { headers } from "next/headers";
import { ProjectTransactionsList } from "@/app/components/ProjectTransactionsList/ProjectTransactionsList";
import { Project } from "@/types/Project";

type Props = {
  result: Project[];
};

const Project = async ({ params }: { params: { pid: string } }) => {
  const host = headers().get("host");
  const protocal = process?.env.NODE_ENV === "development" ? "http" : "https";
  const projects: Props = await (
    await fetch(`${protocal}://${host}/api/project/${params.pid}`, { cache: "no-store" })
  ).json();

  return (
    <div className="flex flex-col h-screen">
      <div className="header bg-color-blue-violet h-full max-h-14 md:max-h-20 align-middle flex">
        <h1 className="text-4xl text-white m-auto">מדלנטיקס</h1>
      </div>
      <div className="container mx-auto">
        <ProjectTransactionsList data={projects.result} />
      </div>
    </div>
  );
};

export default Project;
