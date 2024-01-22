export type TransactionStats = {
  year: number;
  month: number;
  avgPricePerSquareMeter: number;
  dealAmount: number;
  totalCount: number;
};

export type TransactionStatsSummary = {
  data: TransactionStats[];
  totalCountSum: number;
};
