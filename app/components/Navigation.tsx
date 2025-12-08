'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav>
      <ul>
        <li>
          <Link href="/" className={pathname === '/' ? 'router-link-active' : ''}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/settings" className={pathname === '/settings' ? 'router-link-active' : ''}>
            Settings
          </Link>
        </li>
      </ul>
      <style jsx>{`
        nav ul {
          list-style: none;
          padding: 0;
          display: flex;
          gap: 20px;
          border-bottom: 1px solid #eee;
          padding-bottom: 20px;
          margin-bottom: 20px;
        }

        nav a {
          text-decoration: none;
          color: #333;
          font-weight: bold;
        }

        nav a.router-link-active {
          color: #00dc82;
        }
      `}</style>
    </nav>
  );
}
