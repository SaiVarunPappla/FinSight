// budget-recommendation.ts
'use server';
/**
 * @fileOverview Provides AI-powered personalized budgeting recommendations based on spending habits.
 *
 * - getBudgetRecommendation - A function that generates budget recommendations.
 * - BudgetRecommendationInput - The input type for the getBudgetRecommendation function.
 * - BudgetRecommendationOutput - The return type for the getBudgetRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BudgetRecommendationInputSchema = z.object({
  income: z.number().describe('The user\u2019s monthly income.'),
  expenses: z.array(
    z.object({
      category: z.string().describe('The category of the expense.'),
      amount: z.number().describe('The amount spent in that category.'),
    })
  ).describe('A list of expenses with their categories and amounts.'),
  financialGoals: z.string().describe('The user\u2019s financial goals.'),
});
export type BudgetRecommendationInput = z.infer<typeof BudgetRecommendationInputSchema>;

const BudgetRecommendationOutputSchema = z.object({
  recommendations: z.string().describe('Personalized budgeting recommendations based on spending habits.'),
});
export type BudgetRecommendationOutput = z.infer<typeof BudgetRecommendationOutputSchema>;

export async function getBudgetRecommendation(input: BudgetRecommendationInput): Promise<BudgetRecommendationOutput> {
  return budgetRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'budgetRecommendationPrompt',
  input: {schema: BudgetRecommendationInputSchema},
  output: {schema: BudgetRecommendationOutputSchema},
  prompt: `You are a financial advisor providing personalized budgeting recommendations.

  Based on the user's income, expenses, and financial goals, provide specific and actionable recommendations to help them better manage their finances.

  Income: {{income}}
  Expenses:
  {{#each expenses}}
  - Category: {{category}}, Amount: {{amount}}
  {{/each}}
  Financial Goals: {{financialGoals}}

  Provide recommendations that are tailored to the user's specific situation and goals.`,
});

const budgetRecommendationFlow = ai.defineFlow(
  {
    name: 'budgetRecommendationFlow',
    inputSchema: BudgetRecommendationInputSchema,
    outputSchema: BudgetRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
