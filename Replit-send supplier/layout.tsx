import { Link, useLocation } from "wouter";
import { Truck, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Suppliers", href: "/suppliers" },
    { name: "Place Order", href: "/orders/new" },
    { name: "Register", href: "/register" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-sand-gradient">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b-4 border-sand-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <Truck className="text-sand-600 text-2xl mr-3" size={32} />
              <span className="text-2xl font-bold text-sand-800">SendSupplier</span>
            </Link>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "text-sand-900 bg-sand-100"
                        : "text-sand-700 hover:text-sand-900 hover:bg-sand-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-sand-700 hover:text-sand-900"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? "text-sand-900 bg-sand-100"
                        : "text-sand-700 hover:text-sand-900 hover:bg-sand-50"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-sand-800 text-sand-100 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Truck className="text-sand-300 text-2xl mr-3" size={32} />
                <span className="text-2xl font-bold">SendSupplier</span>
              </div>
              <p className="text-sand-300 mb-6">
                Your trusted partner for logistics and transportation solutions across the nation.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-sand-300">
                <li><Link href="/register" className="hover:text-white transition-colors">Supplier Registration</Link></li>
                <li><Link href="/orders/new" className="hover:text-white transition-colors">Order Management</Link></li>
                <li><Link href="/suppliers" className="hover:text-white transition-colors">Rate Comparison</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sand-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Training Resources</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-3 text-sand-300">
                <div className="flex items-center">
                  <span>+1 (800) 555-0123</span>
                </div>
                <div className="flex items-center">
                  <span>info@sendsupplier.com</span>
                </div>
                <div className="flex items-center">
                  <span>123 Logistics Ave<br />Transportation City, TC 12345</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-sand-700 mt-8 pt-8 text-center text-sand-400">
            <p>&copy; 2024 SendSupplier. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
