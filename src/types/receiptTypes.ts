import { ApartmentType } from "./apartmentTypes";
import { TransactionWithId } from "./transactionsTypes";
// export interface ReceiptDetailedInfoType {
//   property: string;
//   owner: string;
//   billedMonth: string;
//   year: number;
//   aliquot: number;
//   owedAmount: number;
//   expenses: ExpensesType[];
//   debt?: number;
//   penalty?: number;
// }

export interface ReceiptDetailedInfoType {
  id: number;
  createdAt: string;
  periodId: number;
  apartmentId: number;
  period: {
    id: number;
    month: number;
    year: number;
    createdAt: string;
    commonExpenses: TransactionWithId[];
  };
  apartment: ApartmentType;
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
