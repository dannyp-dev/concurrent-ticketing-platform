"use client";
export default function CatalogError({ retry }: { retry: () => void }) {
  return <main className="empty-state shell"><h1>Events are temporarily unavailable.</h1>
    <p>Please try again in a moment.</p>
    <button className="button button-primary" onClick={() => retry()}>Try again</button></main>;
}
