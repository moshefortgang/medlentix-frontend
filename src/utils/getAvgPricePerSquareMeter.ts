import { TransactionStats } from "@/types/TransactionStats";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export async function getAvgPricePerSquareMeter(id: any) {
  const data = await prisma.$queryRaw<TransactionStats[]>`
    SELECT
      EXTRACT(YEAR FROM "dealDateTime")::int AS year,
      EXTRACT(MONTH FROM "dealDateTime")::int AS month,
      ROUND(AVG(CAST("dealAmount" AS numeric) / NULLIF(CAST("dealNature" AS numeric), 0)))::int AS "avgPricePerSquareMeter",
      ROUND(AVG(CAST("dealAmount" AS numeric)))::int AS "dealAmount",
			count(*)::int AS "totalCount"
    FROM
      "RealEstateTransactionsNadlanGov"
		WHERE locality = ${id}
		-- AND EXTRACT(YEAR FROM "dealDateTime")  > 2022
    GROUP BY
      EXTRACT(YEAR FROM "dealDateTime"),
      EXTRACT(MONTH FROM "dealDateTime")
    ORDER BY
      year, month;
  `;

  let totalCountSum = calculateTotalCountSum(data);
  let result: { data: TransactionStats[]; totalCountSum: number } = {
    data: data,
    totalCountSum: totalCountSum,
  };
  return result;
}

function calculateTotalCountSum(data: TransactionStats[]): number {
  let totalCountSum: number = 0;

  for (let i = 0; i < data.length; i++) {
    totalCountSum += data[i].totalCount;
  }

  return totalCountSum;
}
