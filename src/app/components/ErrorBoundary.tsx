"use client";
import React from "react";

type ErrorBoundaryProps = {
  children: React.ReactNode;
  errorComponent?: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Error caught in boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.errorComponent ?? <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}
