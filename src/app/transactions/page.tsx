'use client';

import * as React from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { TransactionsDataTable } from '@/components/transactions/transactions-data-table';
import { AddTransactionSheet } from '@/components/transactions/add-transaction-sheet';
import { transactions as initialTransactions } from '@/lib/data';
import type { Transaction } from '@/lib/types';

export default function TransactionsPage() {
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const [transactions, setTransactions] =
    React.useState<Transaction[]>(initialTransactions);

  const addTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const transactionWithId = {
      ...newTransaction,
      id: `txn-${Date.now()}`,
    };
    setTransactions((prev) => [transactionWithId, ...prev]);
  };

  return (
    <AppLayout>
      <PageHeader title="Transactions">
        <Button onClick={() => setIsSheetOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </PageHeader>
      <div className="space-y-6">
        <TransactionsDataTable data={transactions} />
      </div>
      <AddTransactionSheet
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        onTransactionAdded={addTransaction}
      />
    </AppLayout>
  );
}
