export default function EventLoading() {
  return (
    <main className="loading-state shell" aria-label="Loading event">
      <div className="skeleton skeleton-banner" />
      <div className="skeleton-grid skeleton-two"><div className="skeleton skeleton-tall" /><div className="skeleton skeleton-tall" /></div>
    </main>
  );
}
