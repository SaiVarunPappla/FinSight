'use server';

import { getBudgetRecommendation } from '@/ai/flows/budget-recommendation';
import { transactions } from '@/lib/data';

export async function getBudgetRecommendationAction(
  prevState: any,
  formData: FormData
) {
  const income = Number(formData.get('income'));
  const financialGoals = formData.get('financialGoals') as string;

  if (!income || !financialGoals) {
    return { recommendations: '', error: 'Please fill in all fields.' };
  }

  const expenses = transactions
    .filter((t) => t.type === 'expense' && t.category)
    .map((t) => ({
      category: t.category!.name,
      amount: t.amount,
    }));

  try {
    const result = await getBudgetRecommendation({
      income,
      expenses,
      financialGoals,
    });
    return { recommendations: result.recommendations, error: '' };
  } catch (error) {
    console.error(error);
    return {
      recommendations: '',
      error: 'Failed to get recommendations. Please try again later.',
    };
  }
}
