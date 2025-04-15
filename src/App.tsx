
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, RouterProvider } from '@tanstack/router';
import { routeTree } from './routeTree.gen';

const queryClient = new QueryClient();

const router = new Router({
  routeTree,
  defaultPreload: 'intent',
  context: {
    queryClient,
  },
});

declare module '@tanstack/router' {
  interface Register {
    router: typeof router;
  }
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RouterProvider router={router} />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
