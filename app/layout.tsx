import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import MobileSidebar from '@/components/MobileSidebar'

export const metadata: Metadata = {
  title: 'CSNA Révision — Stormshield SNS',
  description: 'Dashboard de révision interactif pour la certification CSNA Certified Stormshield Network Administrator',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="bg-slate-900">
      <body className="min-h-screen text-slate-100" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div className="flex min-h-screen">
          {/* Desktop sidebar */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>

          {/* Mobile sidebar */}
          <MobileSidebar />

          {/* Main content */}
          <main className="flex-1 min-w-0 overflow-x-hidden">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
