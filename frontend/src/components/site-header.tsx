"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchIcon, TicketIcon } from "./icons";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Queue home">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
          </span>
          <span>queue</span>
        </Link>
        <nav className="main-nav" aria-label="Primary navigation">
          <Link className={pathname === "/" ? "is-active" : ""} href="/">
            Discover
          </Link>
          <Link
            className={pathname.startsWith("/events") ? "is-active" : ""}
            href="/#events"
          >
            Events
          </Link>
        </nav>
        <div className="header-actions">
          <button className="icon-button" type="button" aria-label="Search events">
            <SearchIcon />
          </button>
          <Link className="my-tickets" href="/reservations/demo">
            <TicketIcon />
            <span>My tickets</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
