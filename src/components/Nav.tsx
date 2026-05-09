import Link from "next/link";

const links = [
  { href: "/#about",    label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#work",     label: "Work" },
  { href: "/#skills",   label: "Skills" },
  { href: "/#contact",  label: "Contact" },
];

export default function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 md:px-10 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-text-primary hover:text-accent transition-colors"
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
      </div>
    </nav>
  );
}
