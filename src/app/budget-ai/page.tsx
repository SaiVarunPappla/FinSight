import { AppLayout } from '@/components/layout/app-layout';
import { PageHeader } from '@/components/layout/page-header';
import { BudgetAIView } from '@/components/budget-ai/budget-ai-view';

export default function BudgetAIPage() {
  return (
    <AppLayout>
      <PageHeader title="Budgeting AI Assistant" />
      <BudgetAIView />
    </AppLayout>
  );
}
