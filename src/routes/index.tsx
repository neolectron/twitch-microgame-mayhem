
import { Route as RootRoute } from '@tanstack/router';
import { Hero } from '@/components/landing/Hero';

export const Route = new RootRoute('/', {
  component: () => (
    <div className="min-h-screen">
      <Hero />
    </div>
  ),
});
