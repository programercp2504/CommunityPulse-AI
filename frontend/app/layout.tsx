import './globals.css';
import Nav from '../components/Nav';

export const metadata = {
  title: 'CommunityPulse AI',
  description: 'AI Decision Intelligence Platform'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main className="max-w-7xl mx-auto p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
