import Link from "next/link";
import Image from "next/image";
import Container from "../Container";

export default function SiteFooter() {
  return (
    <footer className="w-full border-t border-muted py-12 md:py-16 text-sm text-muted-foreground">
      <Container>
        <div className="grid gap-y-12 md:grid-cols-3 gap-x-8">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-start md:items-start">
            <Image
              src="/logo.svg"
              alt="Antgec Logo"
              width={150}
              height={40}
              className="!block !mb-3"
            />
            <p className="max-w-xs leading-relaxed">
              Connecting education professionals worldwide through premier
              conferences and events.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-foreground">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-foreground">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-foreground">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-conditions"
                  className="hover:text-foreground"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-muted text-center">
          <p>© {new Date().getFullYear()} Antgec. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
