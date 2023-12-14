// export interface Transaction {
//   date: Date;
//   description: string;
//   amount: number;
//   reference: string;
// }
export interface Transaction {
  reference: string;
  amount: number;
  description: string;
  date: string;
  createdAt: string;
  periodId: number;
}

export interface TransactionWithId extends Transaction {
  id: number;
}
