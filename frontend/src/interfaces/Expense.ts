export interface Expense {
  _id: string;
  description: string;
  categoryName: string;
  amount: number;
  date: Date;
  userId: string;
}