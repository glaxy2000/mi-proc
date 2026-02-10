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
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function Layout({ children, currentPageName }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const location = useLocation();

  const notifications = [
    {
      id: 1,
      type: 'bid',
      title: 'New Bid Received',
      message: 'You received 3 new bids for "Office Supplies RFQ"',
      time: '5 min ago',
      unread: true
    },
    {
      id: 2,
      type: 'escrow',
      title: 'Escrow Funded',
      message: 'SAR 45,000 has been deposited in escrow for RFQ-2024-156',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      type: 'document',
      title: 'KYB Verification Complete',
      message: 'Your business documents have been verified and approved',
      time: '2 hours ago',
      unread: false
    },
    {
      id: 4,
      type: 'negotiation',
      title: 'Negotiation Update',
      message: 'Supplier updated their quote in ongoing negotiation',
      time: '3 hours ago',
      unread: false
    },
    {
      id: 5,
      type: 'delivery',
      title: 'Delivery Confirmed',
      message: 'RFQ-2024-142 delivery has been confirmed by buyer',
      time: '1 day ago',
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const navigation = [
    { name: 'Home', href: 'Home', icon: Home },
    { name: 'Dashboard', href: 'Dashboard', icon: LayoutDashboard },
    { name: 'User Journey', href: 'UserJourney', icon: Users },
    { name: 'My RFQs', href: 'RFQList', icon: FileText },
    { name: 'Suppliers', href: 'Suppliers', icon: Users },
    { name: 'Negotiations', href: 'Negotiations', icon: MessageSquare },
    { name: 'Escrow', href: 'Escrow', icon: Shield },
    { name: 'Mi-Wallet', href: 'Wallet', icon: Wallet },
    { name: 'Top Up Wallet', href: 'TopUpWallet', icon: Wallet },
    { name: 'Contact', href: 'Contact', icon: MessageSquare },
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
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698475e8a83c0e60c7a78100/def2d3f5f_MI-logo-color.png" 
              alt="MI Technologies" 
              className="h-8"
            />
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
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold hidden sm:flex">
                  <FileText className="h-4 w-4 mr-2" />
                  Create RFQ
                </Button>
              </Link>

              <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
                <PopoverTrigger asChild>
                  <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-96 p-0">
                  <div className="border-b px-4 py-3 flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">Notifications</h3>
                    {unreadCount > 0 && (
                      <Badge className="bg-red-100 text-red-700">{unreadCount} new</Badge>
                    )}
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification, index) => (
                      <div key={notification.id}>
                        <div className={`px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors ${
                          notification.unread ? 'bg-indigo-50/50' : ''
                        }`}>
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                              notification.unread ? 'bg-indigo-600' : 'bg-transparent'
                            }`} />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-slate-900 text-sm mb-1">
                                {notification.title}
                              </p>
                              <p className="text-sm text-slate-600 line-clamp-2">
                                {notification.message}
                              </p>
                              <p className="text-xs text-slate-400 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                        {index < notifications.length - 1 && (
                          <div className="border-t mx-4" />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="border-t px-4 py-3">
                    <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                      View all notifications
                    </button>
                  </div>
                </PopoverContent>
              </Popover>

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
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setUserRole('buyer')} asChild>
                    <Link to={createPageUrl('BuyerSignin')}>Switch to Buyer</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setUserRole('supplier')} asChild>
                    <Link to={createPageUrl('SupplierSignin')}>Switch to Supplier</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
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