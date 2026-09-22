export default function Loading() {
  return (
    <main className="loading-state shell" aria-label="Loading page">
      <div className="skeleton skeleton-wide" />
      <div className="skeleton-grid"><div className="skeleton" /><div className="skeleton" /><div className="skeleton" /></div>
    </main>
  );
}
