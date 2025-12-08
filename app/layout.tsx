import Navigation from './components/Navigation';
import './globals.css';

export const metadata = {
  title: 'Calendar App',
  description: 'A Next.js Calendar App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          <Navigation />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
