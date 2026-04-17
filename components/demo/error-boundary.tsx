'use client';

import * as React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ChatErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Surface to console for debugging; no user data in the error
    console.error('Swifty chat error boundary caught:', error, info);
  }

  reset = () => this.setState({ hasError: false, error: null });

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-destructive/10 text-destructive">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold">Something went wrong rendering that reply.</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              We couldn't parse the last response. Please try again — your chat isn't lost.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={this.reset}>
            Try again
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
