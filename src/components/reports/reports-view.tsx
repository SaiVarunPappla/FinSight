'use client';

import * as React from 'react';
import { transactions as allTransactions, CATEGORIES } from '@/lib/data';
import type { Transaction } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Cell,
} from 'recharts';

export function ReportsView() {
  const [transactions, setTransactions] =
    React.useState<Transaction[]>(allTransactions);

  const expensesByCategory = React.useMemo(() => {
    const expenseMap = new Map<string, { name: string; total: number; color: string }>();

    transactions
      .filter((t) => t.type === 'expense' && t.category)
      .forEach((t) => {
        const category = t.category!;
        const existing = expenseMap.get(category.id);
        if (existing) {
          existing.total += t.amount;
        } else {
          expenseMap.set(category.id, {
            name: category.name,
            total: t.amount,
            color: category.color,
          });
        }
      });
    return Array.from(expenseMap.values());
  }, [transactions]);
  
  const chartConfig: ChartConfig = React.useMemo(() => {
    const config: ChartConfig = {};
    expensesByCategory.forEach(item => {
        config[item.name] = {
            label: item.name,
            color: item.color
        }
    });
    return config;
  }, [expensesByCategory]);

  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Description', 'Type', 'Amount', 'Category'];
    const csvContent = [
      headers.join(','),
      ...transactions.map((t) =>
        [
          t.id,
          t.date,
          `"${t.description}"`,
          t.type,
          t.amount,
          t.category?.name || '',
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'finsight_transactions.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleExportPDF = () => {
      window.print();
  }

  return (
    <div className="space-y-6">
      <div className="no-print flex justify-end gap-2">
        <Button variant="outline" onClick={handleExportCSV}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
        <Button variant="outline" onClick={handleExportPDF}>
          <FileText className="mr-2 h-4 w-4" />
          Export PDF
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Expenses by Category</CardTitle>
          <CardDescription>
            A breakdown of your spending across different categories.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <BarChart data={expensesByCategory} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="total" layout="vertical" radius={5}>
                    {expensesByCategory.map((entry) => (
                      <Cell key={`cell-${entry.name}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </div>
             <div>
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square h-[300px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={expensesByCategory}
                    dataKey="total"
                    nameKey="name"
                    innerRadius={60}
                  >
                   {expensesByCategory.map((entry) => (
                      <Cell key={`cell-${entry.name}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
