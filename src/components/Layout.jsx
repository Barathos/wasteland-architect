import { Outlet, Link, useLocation } from "react-router-dom";
import { Users, Plus, Radiation } from "lucide-react";

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { to: "/", label: "Characters", icon: Users },
    { to: "/builder", label: "New Character", icon: Plus },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="scanlines" />
      
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Radiation className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div>
                <h1 className="font-heading font-bold text-base sm:text-lg text-primary glow-text tracking-wide leading-tight">
                  VAULT-TEC
                </h1>
                <p className="text-[10px] sm:text-xs font-mono text-muted-foreground tracking-widest leading-tight">
                  CHARACTER SYSTEM
                </p>
              </div>
            </Link>

            <nav className="flex items-center gap-1">
              {navItems.map(({ to, label, icon: Icon }) => {
                const isActive = location.pathname === to || 
                  (to === "/builder" && location.pathname.startsWith("/builder"));
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`
                      flex items-center gap-1.5 px-3 py-2 rounded-md text-xs sm:text-sm font-mono
                      transition-all duration-200
                      ${isActive
                        ? "bg-primary/15 text-primary border border-primary/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }
                    `}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">{label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Outlet />
      </main>
    </div>
  );
}