import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="relative border-t border-border/30 py-12 mt-20">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-heading text-sm text-primary tracking-widest">J.E.S. TOMSON</p>
          <p className="text-muted-foreground text-sm mt-1">The Murkatz War Series</p>
        </div>
        <div className="flex gap-6">
          {["Books", "Universe", "About", "Contact"].map((l) => (
            <Link
              key={l}
              to={`/${l.toLowerCase()}`}
              className="text-muted-foreground text-sm hover:text-primary transition-colors"
            >
              {l}
            </Link>
          ))}
        </div>
        <p className="text-muted-foreground text-xs">© 2026 J.E.S. Tomson. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
