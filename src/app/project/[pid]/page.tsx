import React from "react";
import { ProjectTransactionsList } from "@/components/ProjectTransactionsList/ProjectTransactionsList";
import getRealEstateTransaction from "@/utils/getRealEstateTransactions";
import getProject from "@/utils/getProjects";
import { RealEstateTransaction } from "@/types/RealEstateTransaction";
import { Project } from "@/types/Project";
import { ProjectComponent } from "@/components/Porject/ProjectComponent";

const Project = async ({ params }: { params: { pid: string } }) => {
	const realEstateTransaction: RealEstateTransaction[]  = await getRealEstateTransaction(+params.pid);
	const project: Project[] = await getProject(+params.pid);
	const soldApartmentsCount: number = realEstateTransaction.length;
  return (
    <div className="flex flex-col h-screen">
      <div className="header bg-color-blue-violet h-full max-h-14 md:max-h-20 align-middle flex">
        <h1 className="text-4xl m-auto">מדלנטיקס</h1>
      </div>
      <div className="container mx-auto">
				<ProjectComponent data={{project, soldApartmentsCount}} />
        <ProjectTransactionsList data={realEstateTransaction} />     
      </div>
    </div>
  );
};


export default Project;
