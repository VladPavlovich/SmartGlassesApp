export interface Transaction {
  id: number;
  category_id: number;
  amount: number;
  date: number;
  description: string;
  type: "Expense" | "Income";
}

export interface Category {
  id: number;
  name: string;
  type: "Expense" | "Income";
}

export interface TransactionsByMonth {
  totalExpenses: number;
  totalIncome: number;
}

export interface Person {
  person_id: number;
  name: string;
  encoding_id: number;
  phone: string;
  email: string;
  profession: string;
  detail: string;
}


export interface Encoding {
  encoding_id: number;
  encoding_name: string;
}