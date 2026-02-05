import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from './utils';
import {
  Home,
  LayoutDashboard,
  FileText,
  Users,
  MessageSquare,
  Shield,
  Wallet,
  Menu,
  X,
  Bell,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Layout({ children, currentPageName }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: 'Home', icon: Home },
    { name: 'Dashboard', href: 'Dashboard', icon: LayoutDashboard },
    { name: 'My RFQs', href: 'RFQList', icon: FileText },
    { name: 'Suppliers', href: 'Suppliers', icon: Users },
    { name: 'Negotiations', href: 'Negotiations', icon: MessageSquare },
    { name: 'Escrow', href: 'Escrow', icon: Shield },
    { name: 'Mi-Wallet', href: 'Wallet', icon: Wallet },
  ];

  const isActive = (pageName) => currentPageName === pageName;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <Link to={createPageUrl('Home')} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">mi</span>
            </div>
            <div>
              <span className="font-bold text-slate-900">Mi-Proc</span>
              <Badge className="ml-2 bg-teal-100 text-teal-700 text-xs">Beta</Badge>
            </div>
          </Link>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-6 w-6 text-slate-500" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={createPageUrl(item.href)}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive(item.href)
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive(item.href) ? 'text-indigo-600' : 'text-slate-400'}`} />
              <span className="font-medium">{item.name}</span>
              {item.name === 'Negotiations' && (
                <Badge className="ml-auto bg-indigo-100 text-indigo-600 text-xs">2</Badge>
              )}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-indigo-600 font-semibold">SM</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">SME Corp</p>
              <p className="text-xs text-slate-500">Verified Buyer</p>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center gap-4">
              <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-6 w-6 text-slate-600" />
              </button>
              <h1 className="text-lg font-semibold text-slate-900 hidden sm:block">
                {currentPageName === 'Home' ? 'Welcome to Mi-Proc' : currentPageName}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <Link to={createPageUrl('CreateRFQ')}>
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 hidden sm:flex">
                  <FileText className="h-4 w-4 mr-2" />
                  Create RFQ
                </Button>
              </Link>

              <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 text-sm font-semibold">SM</span>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Help Center</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}