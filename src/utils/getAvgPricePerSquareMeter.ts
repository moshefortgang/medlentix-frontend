import { TransactionStats } from "@/types/TransactionStats";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export async function getAvgPricePerSquareMeter() {
  const result = await prisma.$queryRaw<TransactionStats[]>`
    SELECT
      EXTRACT(YEAR FROM "dealDateTime") AS year,
      EXTRACT(MONTH FROM "dealDateTime") AS month,
      ROUND(AVG(CAST("dealAmount" AS numeric) / NULLIF(CAST("dealNature" AS numeric), 0))) AS "avgPricePerSquareMeter",
      count(*) AS "totalCount"
    FROM
      "RealEstateTransactionsNadlanGov"
    GROUP BY
      EXTRACT(YEAR FROM "dealDateTime"),
      EXTRACT(MONTH FROM "dealDateTime")
    ORDER BY
      year, month;
  `;

  return result;
}
