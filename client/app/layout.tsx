import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className="bg-[url('/img/bg.jpg')] bg-cover bg-center bg-no-repeat bg-fixed bg-neutral-950 min-h-screen text-neutral-100 antialiased flex flex-col justify-between p-4 md:p-8">
        <div className="w-full max-w-[1200px] mx-auto bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden backdrop-blur-md flex flex-col flex-grow">
          <header className="p-5 bg-neutral-900 border-b border-neutral-800/80 flex items-center justify-between gap-4">
            {/* LOGO */}
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-wider text-white uppercase">
                Coruskant{" "}
                <span className="text-neutral-400 font-medium lowercase">
                  archives
                </span>
              </span>
            </div>

            {/* Search */}
            <div className="flex-grow max-w-md hidden md:block">
              <input
                type="text"
                placeholder="&#x2315; What are you looking for, Jedi?"
                className="w-full px-4 py-2 bg-neutral-950 border border-neutral-800 rounded-full text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
              />
            </div>

            {/* User */}
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700"></div>
              <span className="text-sm font-medium text-neutral-300 hidden sm:inline">
                Guest
              </span>
            </div>
          </header>

          <main className="flex-grow container mx-auto p-6">{children}</main>

          <footer className="p-8 md:p-12 bg-neutral-900 border-t border-neutral-800/80 text-sm text-neutral-400">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 pb-8 border-b border-neutral-800/50">
              <div className="lg:col-span-1 space-y-4">
                <span className="text-xl font-bold tracking-wider text-white uppercase block">
                  Coruskant <span className="text-neutral-400 font-medium lowercase"> archives</span>
                </span>
                <p className="text-neutral-500 max-w-xs leading-relaxed">
                  The galaxy&apos;s most comprehensive database of people, starships, and vehicles.
                </p>
                <p className="text-xs text-neutral-600">
                  Powered by SWAPI.INFO
                </p>
              </div>

              <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-8">
                
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">Resources</h4>
                  <ul className="space-y-2 text-neutral-500">
                    <li> <a href="#" className="hover:text-neutral-300 transition-colors">About API</a></li>
                    <li> <a href="#" className="hover:text-neutral-300 transition-colors">Documentation</a></li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">Explore</h4>
                  <ul className="space-y-2 text-neutral-500">
                    <li> <a href="#" className="hover:text-neutral-300 transition-colors">All People</a></li>
                    <li> <a href="#" className="hover:text-neutral-300 transition-colors">All Starships</a></li>
                    <li> <a href="#" className="hover:text-neutral-300 transition-colors">All Vehicles</a></li>
                    <li> <a href="#" className="hover:text-neutral-300 transition-colors">All Planets</a></li>
                    <li> <a href="#" className="hover:text-neutral-300 transition-colors">All Species</a></li>
                    <li> <a href="#" className="hover:text-neutral-300 transition-colors">All Films</a></li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">Community</h4>
                  <ul className="space-y-2 text-neutral-500">
                    <li> <a href="#" className="hover:text-neutral-300 transition-colors">GitHub</a></li>
                    <li> <a href="#" className="hover:text-neutral-300 transition-colors">Discord</a></li>                    
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">Legal</h4>
                  <ul className="space-y-2 text-neutral-500">
                    <li> <a href="#" className="hover:text-neutral-300 transition-colors">Terms of Use</a></li>
                    <li> <a href="#" className="hover:text-neutral-300 transition-colors">Privacy Policy</a></li>                    
                  </ul>
                </div>
              </div>
            </div>
            <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-600">
              <span>2026 Coruskant Archives. Some rights reserved.</span>
              <div className="flex gap-4">
                <a href="#" className="hover:text-neutral-500">GitHub</a>
                <a href="#" className="hover:text-neutral-500">Discord</a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
