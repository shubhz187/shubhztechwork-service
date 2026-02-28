import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class RemotionErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="w-full h-32 bg-secondary/50 rounded-xl flex items-center justify-center text-muted-foreground text-sm">
          Animation unavailable
        </div>
      );
    }
    return this.props.children;
  }
}
