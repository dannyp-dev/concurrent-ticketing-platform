import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <main className="empty-state shell">
      <span className="empty-code">404</span>
      <h1>This seat is not on the map.</h1>
      <p>The page may have moved, or the event may no longer be available.</p>
      <Link className="button button-primary" href="/"><ArrowLeftIcon /> Back to events</Link>
    </main>
  );
}
