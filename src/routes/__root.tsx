
import { RootRoute, Outlet } from '@tanstack/router';
import { MainLayout } from '@/components/layout/MainLayout';

export const Route = new RootRoute({
  component: () => (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ),
});
