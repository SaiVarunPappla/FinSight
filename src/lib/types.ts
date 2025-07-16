import type { Icons } from '@/components/icons';

export type IconKey = keyof typeof Icons;

export interface Category {
  id: string;
  name: string;
  icon: IconKey;
  color: string;
}

export interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  type: 'income' | 'expense';
  category: Category | null;
}
