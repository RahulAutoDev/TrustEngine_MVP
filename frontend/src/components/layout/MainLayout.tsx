import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl tracking-tight hover:opacity-80 transition-opacity">
            <ShieldCheck className="h-7 w-7 text-primary" />
            <span>Trust Engine</span>
          </Link>
          <nav className="flex items-center gap-8">
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors text-muted-foreground hover:text-foreground">Dashboard</Link>
            <Link to="/history" className="text-sm font-medium hover:text-primary transition-colors text-muted-foreground hover:text-foreground">History</Link>
            <Button asChild variant="default" className="rounded-full px-6 shadow-sm hover:shadow-md transition-all">
              <Link to="/assessment">Start Assessment</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t py-8 mt-12 bg-muted/30">
        <div className="container mx-auto px-4 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 Trust Assessment Engine. Built for enterprise AI governance.
          </p>
          <div className="flex gap-4">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
