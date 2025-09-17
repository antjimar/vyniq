export async function enableMocking() {
  if (typeof window === 'undefined') {
    return;
  }

  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./browser');

  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}