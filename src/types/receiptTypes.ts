export interface ReceiptDetailedInfoType {
  property: string;
  owner: string;
  billedMonth: string;
  year: number;
  aliquot: number;
  owedAmount: number;
  expenses: ExpensesType[];
}

export interface ExpensesType {
  description: string;
  amount: number;
}

export interface ReceiptGeneralInfoType {
  id: number;
  date: string;
  month: string;
  year: number;
}
