'use client';

import * as React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { getBudgetRecommendationAction } from '@/app/actions/get-budget-recommendation.action';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Bot, Loader2, Sparkles } from 'lucide-react';

const initialState = {
  recommendations: '',
  error: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Get Recommendations
        </>
      )}
    </Button>
  );
}

export function BudgetAIView() {
  const [state, formAction] = useFormState(
    getBudgetRecommendationAction,
    initialState
  );

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <form action={formAction}>
          <CardHeader>
            <CardTitle>Get Personalized Insights</CardTitle>
            <CardDescription>
              Provide your financial details and let our AI assistant create a
              custom budget plan for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="income">Your Monthly Income</Label>
              <Input
                id="income"
                name="income"
                type="number"
                placeholder="e.g., 3000"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="financialGoals">Your Financial Goals</Label>
              <Textarea
                id="financialGoals"
                name="financialGoals"
                placeholder="e.g., Save for a down payment, pay off debt..."
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
      
      <Card className="flex flex-col">
        <CardHeader>
            <CardTitle className='flex items-center gap-2'>
                <Bot /> AI Recommendations
            </CardTitle>
            <CardDescription>
                Here's a personalized plan based on your information.
            </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
            {state.error && <p className="text-sm text-destructive">{state.error}</p>}
            {state.recommendations ? (
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                    {state.recommendations}
                </div>
            ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                    Your recommendations will appear here.
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
