'use client';

import * as React from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { format, subMonths } from 'date-fns';
import type { Transaction } from '@/lib/types';

interface OverviewChartProps {
  data: Transaction[];
}

export function OverviewChart({ data }: OverviewChartProps) {
  const monthlyData = React.useMemo(() => {
    const months = Array.from({ length: 6 }, (_, i) => subMonths(new Date(), i));
    
    return months.map(month => {
      const monthKey = format(month, 'MMM');
      const income = data
        .filter(t => t.type === 'income' && format(new Date(t.date), 'yyyy-MM') === format(month, 'yyyy-MM'))
        .reduce((sum, t) => sum + t.amount, 0);
      const expenses = data
        .filter(t => t.type === 'expense' && format(new Date(t.date), 'yyyy-MM') === format(month, 'yyyy-MM'))
        .reduce((sum, t) => sum + t.amount, 0);
      
      return { name: monthKey, income, expenses };
    }).reverse();
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={monthlyData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey="income"
          fill="hsl(var(--chart-2))"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="expenses"
          fill="hsl(var(--chart-1))"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
