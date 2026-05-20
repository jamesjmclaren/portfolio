"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import DesignSwitcher from "@/components/DesignSwitcher";

const links = [
  { href: "/#about",    label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#work",     label: "Work" },
  { href: "/#skills",   label: "Skills" },
  { href: "/#contact",  label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="mx-auto max-w-6xl px-6 md:px-10 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-text-primary hover:text-accent transition-colors"
            onClick={() => setOpen(false)}
          >
            JM
          </Link>
          <ul className="hidden md:flex items-center gap-7 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-text-secondary hover:text-text-primary transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <DesignSwitcher />
            <button
              onClick={() => setOpen((o) => !o)}
              className="md:hidden size-9 flex items-center justify-center rounded-lg border border-border text-text-secondary hover:text-text-primary transition-colors"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden pt-14 bg-background/95 backdrop-blur-md">
          <ul className="flex flex-col p-6 gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-2xl font-semibold text-text-secondary hover:text-text-primary transition-colors border-b border-border"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
