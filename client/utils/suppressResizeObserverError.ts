/**
 * Suppresses ResizeObserver loop completed with undelivered notifications error
 * This is a common, harmless warning that occurs with Radix UI components
 */
export function suppressResizeObserverError() {
  // Store the original console.error
  const originalError = console.error;

  // Override console.error to filter out ResizeObserver errors
  console.error = (...args: any[]) => {
    const message = args[0];
    if (
      typeof message === 'string' &&
      message.includes('ResizeObserver loop completed with undelivered notifications')
    ) {
      // Suppress this specific error
      return;
    }
    // Call the original console.error for all other errors
    originalError.apply(console, args);
  };

  // Also handle the error event on window
  const originalErrorHandler = window.onerror;
  window.onerror = (message, source, lineno, colno, error) => {
    if (
      typeof message === 'string' &&
      message.includes('ResizeObserver loop completed with undelivered notifications')
    ) {
      // Suppress this specific error
      return true;
    }
    // Call the original error handler for all other errors
    if (originalErrorHandler) {
      return originalErrorHandler(message, source, lineno, colno, error);
    }
    return false;
  };
}
