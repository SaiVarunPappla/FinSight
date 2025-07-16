import type { Category, Transaction } from './types';

export const CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Groceries', icon: 'utensils', color: '#FFC107' },
  { id: 'cat-2', name: 'Housing', icon: 'home', color: '#4CAF50' },
  { id: 'cat-3', name: 'Transportation', icon: 'car', color: '#2196F3' },
  { id: 'cat-4', name: 'Entertainment', icon: 'film', color: '#9C27B0' },
  { id: 'cat-5', name: 'Health', icon: 'heartPulse', color: '#F44336' },
  { id: 'cat-6', name: 'Shopping', icon: 'shoppingBag', color: '#E91E63' },
  { id: 'cat-7', name: 'Utilities', icon: 'lightbulb', color: '#00BCD4' },
  { id: 'cat-8', name: 'Salary', icon: 'briefcase', color: '#8BC34A' },
  { id: 'cat-9', name: 'Freelance', icon: 'pencilRuler', color: '#FF9800' },
  { id: 'cat-10', name: 'Investment', icon: 'areaChart', color: '#673AB7' },
];

const today = new Date();
const getDate = (daysAgo: number) => {
    const date = new Date(today);
    date.setDate(today.getDate() - daysAgo);
    return date.toISOString().split('T')[0];
};


export const transactions: Transaction[] = [
    { id: 'txn-1', amount: 2500, date: getDate(32), description: 'Monthly Salary', type: 'income', category: CATEGORIES[7] },
    { id: 'txn-2', amount: 75.50, date: getDate(30), description: 'Weekly Groceries', type: 'expense', category: CATEGORIES[0] },
    { id: 'txn-3', amount: 1200, date: getDate(29), description: 'Rent Payment', type: 'expense', category: CATEGORIES[1] },
    { id: 'txn-4', amount: 50, date: getDate(28), description: 'Gasoline', type: 'expense', category: CATEGORIES[2] },
    { id: 'txn-5', amount: 45.99, date: getDate(26), description: 'Movie Tickets', type: 'expense', category: CATEGORIES[3] },
    { id: 'txn-6', amount: 500, date: getDate(25), description: 'Freelance Project', type: 'income', category: CATEGORIES[8] },
    { id: 'txn-7', amount: 30, date: getDate(22), description: 'Pharmacy', type: 'expense', category: CATEGORIES[4] },
    { id: 'txn-8', amount: 120, date: getDate(20), description: 'New Shoes', type: 'expense', category: CATEGORIES[5] },
    { id: 'txn-9', amount: 85, date: getDate(18), description: 'Electricity Bill', type: 'expense', category: CATEGORIES[6] },
    { id: 'txn-10', amount: 200, date: getDate(16), description: 'Stock Dividend', type: 'income', category: CATEGORIES[9] },
    { id: 'txn-11', amount: 65.20, date: getDate(15), description: 'Groceries', type: 'expense', category: CATEGORIES[0] },
    { id: 'txn-12', amount: 25, date: getDate(12), description: 'Public Transport Pass', type: 'expense', category: CATEGORIES[2] },
    { id: 'txn-13', amount: 70, date: getDate(10), description: 'Dinner with friends', type: 'expense', category: CATEGORIES[3] },
    { id: 'txn-14', amount: 2500, date: getDate(2), description: 'Monthly Salary', type: 'income', category: CATEGORIES[7] },
    { id: 'txn-15', amount: 80, date: getDate(1), description: 'Weekly Groceries', type: 'expense', category: CATEGORIES[0] },
];
