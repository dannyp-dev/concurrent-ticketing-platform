import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Link className="brand brand-footer" href="/">
            <span className="brand-mark" aria-hidden="true">
              <span />
              <span />
            </span>
            <span>queue</span>
          </Link>
          <p>Good seats. Clear choices. No surprises.</p>
        </div>
        <div className="footer-links">
          <div>
            <strong>Explore</strong>
            <Link href="/#events">All events</Link>
            <Link href="/#events">Music</Link>
            <Link href="/#events">Sports</Link>
          </div>
          <div>
            <strong>Support</strong>
            <Link href="/reservations/demo">Find an order</Link>
            <a href="mailto:support@example.com">Contact</a>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 Queue Labs</span>
        <span>Demo experience for Concurrent Ticketing Platform</span>
      </div>
    </footer>
  );
}
