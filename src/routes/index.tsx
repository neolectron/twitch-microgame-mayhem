
import { FileRoute } from '@tanstack/router';
import { Hero } from '@/components/landing/Hero';

export const Route = new FileRoute('/').createRoute({
  component: () => (
    <div className="min-h-screen">
      <Hero />
    </div>
  ),
});
