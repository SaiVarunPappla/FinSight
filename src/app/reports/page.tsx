import { AppLayout } from '@/components/layout/app-layout';
import { PageHeader } from '@/components/layout/page-header';
import { ReportsView } from '@/components/reports/reports-view';

export default function ReportsPage() {
  return (
    <AppLayout>
      <PageHeader title="Reports" />
      <ReportsView />
    </AppLayout>
  );
}
