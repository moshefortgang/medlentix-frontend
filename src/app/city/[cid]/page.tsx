import React from "react";
import { ProjectTransactionsList } from "@/components/ProjectTransactionsList/ProjectTransactionsList";
import getRealEstateTransaction from "@/utils/getRealEstateTransactions";
import getProject from "@/utils/getProjects";
import { Project } from "@/types/Project";
import { TransactionChart } from "@/components/Chart/ChartComponent";
import { getAvgPricePerSquareMeter } from "@/utils/getAvgPricePerSquareMeter";
import { ProjectsListComponent } from "@/components/ProjectsList/ProjectsListComponent";
import { TransactionStatsSummary } from "@/types/TransactionStats";

const Project = async ({ params }: { params: { cid: string } }) => {
  const realEstateTransaction: any[] = await getRealEstateTransaction(+params.cid, true);
  const projects: Project[] = await getProject(+params.cid, true);
  const avgPricePerSquareMeter: TransactionStatsSummary = await getAvgPricePerSquareMeter(+params.cid);
  const soldApartmentsCount: number = avgPricePerSquareMeter.totalCountSum;

  return (
    <div className="flex flex-col h-screen">
      <div className="header bg-color-blue-violet h-full max-h-14 md:max-h-20 align-middle flex">
        <h1 className="text-4xl m-auto">מדלנטיקס</h1>
      </div>
      <div className="container mx-auto">
        <div>סה&quot;כ {soldApartmentsCount} עסקאות מדווחות</div>
        <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
          <nav className="block py-4 px-6 top-0 bottom-0 w-64 bg-white shadow-xl absolute flex-row flex-nowrap md:z-10 z-9999 transition-all duration-300 ease-in-out transform md:translate-x-0 -translate-x-full">
            <button
              className="md:hidden flex items-center justify-center cursor-pointer text-blueGray-700 w-6 h-10 border-l-0 border-r border-t border-b border-blueGray-100 text-xl leading-none bg-white rounded-r border border-solid border-transparent absolute top-1/2 -right-24-px focus:outline-none z-9998"
              aria-label="Menu"
              type="button"
            >
              <i className="fas fa-ellipsis-v" aria-hidden="true"></i>
            </button>
            <div className="flex-col min-h-full px-0 flex flex-wrap items-center justify-between w-full mx-auto overflow-y-auto overflow-x-hidden">
              <div className="flex bg-white flex-col items-stretch opacity-100 relative mt-4 overflow-y-auto overflow-x-hidden h-auto z-40 flex-1 rounded w-full">
                <div className="md:flex-col md:min-w-full flex flex-col list-none">
                  <hr className="my-4 md:min-w-full" />
                  <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                    Section 3
                  </h6>
                  <a
                    href="#"
                    className="text-xs uppercase py-3 font-bold block text-blueGray-800 hover:text-blueGray-500"
                  >
                    <i className="fas fa-newspaper mr-2 text-sm text-blueGray-400"></i>Page 1 for Section 3
                  </a>
                  <hr className="my-4 md:min-w-full" />
                  <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                    Section 4
                  </h6>
                  <a
                    href="#"
                    className="text-xs uppercase py-3 font-bold block text-blueGray-800 hover:text-blueGray-500"
                  >
                    <i className="fab fa-angular mr-2 text-sm text-blueGray-400"></i>Page 1 for Section 4
                  </a>
                </div>
              </div>
            </div>
          </nav>
          <div className="relative md:mr-64 bg-blueGray-100 w-full">
            <div className="px-4 md:px-6 mx-auto w-full">
              <div className="flex flex-wrap">
                <div className="w-full px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-8 shadow-lg rounded-lg bg-white">
                    <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                      <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                          <h6 className="uppercase mb-1 text-xs font-semibold text-blueGray-500">Performance</h6>
                          <h2 className="text-xl font-semibold text-blueGray-800">Total orders</h2>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 flex-auto">
                      <div className="relative h-full">
                        <TransactionChart avgPricePerSquareMeter={avgPricePerSquareMeter.data} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full xl:w-6/12 px-4 overflow-y-auto">
                  <ProjectTransactionsList data={realEstateTransaction} />
                </div>
                <div className=" xl:w-6/12 px-4 overflow-y-auto">
                  <ProjectsListComponent data={projects} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Project;
