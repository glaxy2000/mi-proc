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
  ChevronDown,
  Heart,
  Ban,
  Settings
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
import ChatWidget from '@/components/chat/ChatWidget';

export default function Layout({ children, currentPageName }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  React.useEffect(() => {
    const removeBadge = () => {
      const selectors = [
        '[class*="base44"]',
        '[id*="base44"]',
        '[class*="powered-by"]',
        '[id*="powered-by"]',
        'a[href*="base44.com"]',
      ];
      selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => el.remove());
      });
    };
    removeBadge();
    const observer = new MutationObserver(removeBadge);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [selectedRole, setSelectedRole] = React.useState(localStorage.getItem('selectedRole') || 'buyer');
  const location = useLocation();
  
  React.useEffect(() => {
    // In production, fetch user from base44.auth.me()
    // For now, simulate based on path for demo purposes
    const path = location.pathname;
    if (path.includes('Supplier')) {
      setUser({ full_name: 'Supplier Corp', email: 'supplier@example.com', role: 'supplier' });
    } else {
      setUser({ full_name: 'SME Corp', email: 'buyer@example.com', role: 'buyer' });
    }
  }, [location.pathname]);

  const handleRoleSwitch = (role) => {
    setSelectedRole(role);
    localStorage.setItem('selectedRole', role);
    // Navigate to appropriate dashboard
    window.location.href = createPageUrl('Dashboard');
  };

  const userRole = selectedRole || user?.role || 'buyer';

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

  const adminNavigation = [
    { name: 'Dashboard', href: 'Dashboard', icon: LayoutDashboard },
    { name: 'All RFQs', href: 'RFQList', icon: FileText },
    { name: 'All Bids', href: 'Bids', icon: MessageSquare },
    { name: 'All Orders', href: 'Orders', icon: Shield },
    { name: 'Users', href: 'UserJourney', icon: Users },
    { name: 'Suppliers', href: 'Suppliers', icon: Users },
    { name: 'Payments', href: 'Wallet', icon: Wallet },
    { name: 'Analytics', href: 'Analytics', icon: LayoutDashboard },
    { name: 'Escrow', href: 'Escrow', icon: Shield },
  ];

  const buyerNavigation = [
    { name: 'Dashboard', href: 'Dashboard', icon: LayoutDashboard },
    { name: 'Purchase Requests', href: 'PurchaseRequests', icon: FileText },
    { name: 'RFQs', href: 'RFQList', icon: FileText },
    { name: 'Bids', href: 'Bids', icon: MessageSquare },
    { name: 'Orders', href: 'Orders', icon: Shield },
    { name: 'Purchase Orders', href: 'PurchaseOrderManagement', icon: FileText },
    { name: 'Goods Receipt (GRN)', href: 'GoodsReceipt', icon: Shield },
    { name: 'Invoices', href: 'InvoiceManagement', icon: FileText },
    { name: 'Workflows', href: 'WorkflowConfiguration', icon: LayoutDashboard },
    { name: 'Budget Management', href: 'BudgetManagement', icon: Wallet },
    { name: 'Supplier Metrics', href: 'SupplierMetricsDashboard', icon: LayoutDashboard },
    { name: 'Supplier Comparison', href: 'SupplierComparison', icon: Users },
    { name: 'Escrow', href: 'Escrow', icon: Shield },
    { name: 'Payments', href: 'Wallet', icon: Wallet },
    { name: 'Suppliers', href: 'Suppliers', icon: Users },
    { name: 'Favorites', href: 'FavoriteSuppliers', icon: Heart },
    { name: 'Blacklist', href: 'BlacklistSuppliers', icon: Ban },
    { name: 'Analytics', href: 'Analytics', icon: LayoutDashboard },
  ];

  const supplierNavigation = [
    { name: 'Dashboard', href: 'Dashboard', icon: LayoutDashboard },
    { name: 'RFQs', href: 'RFQList', icon: FileText },
    { name: 'Bids', href: 'Bids', icon: MessageSquare },
    { name: 'Orders', href: 'Orders', icon: Shield },
    { name: 'Purchase Orders', href: 'PurchaseOrderManagement', icon: FileText },
    { name: 'Workflows', href: 'WorkflowConfiguration', icon: LayoutDashboard },
    { name: 'Performance', href: 'SupplierMetricsDashboard', icon: LayoutDashboard },
    { name: 'Escrow', href: 'Escrow', icon: Shield },
    { name: 'Payments', href: 'Wallet', icon: Wallet },
    { name: 'Team', href: 'TeamManagement', icon: Users },
    { name: 'Historic Pricing', href: 'HistoricPricing', icon: LayoutDashboard },
    { name: 'Analytics', href: 'Analytics', icon: LayoutDashboard },
  ];

  const navigation = userRole === 'admin' ? adminNavigation : 
                     userRole === 'buyer' ? buyerNavigation : 
                     supplierNavigation;

  const isActive = (pageName) => currentPageName === pageName;
  
  const authPages = ['Home', 'Products', 'Solutions', 'About', 'BuyerSignin', 'BuyerSignup', 'SupplierSignin', 'SupplierSignup', 'AuthBuyer', 'AuthSupplier', 'AdminSignin', 'SupplierOnboarding', 'BuyerOnboarding', 'Contact', 'Signin', 'Register', 'ProcurementServices', 'Automation', 'DigitalTransformation', 'CostOptimisation', 'RiskManagement', 'BlogNews', 'Careers'];
  const hidesidebar = authPages.includes(currentPageName);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && !hidesidebar && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      {!hidesidebar && (
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
              <p className="text-sm font-medium text-slate-900">{user?.full_name || 'User'}</p>
              <p className="text-xs text-slate-500">
                {userRole === 'admin' ? 'Administrator' : 
                 userRole === 'buyer' ? 'Buyer' : 
                 'Supplier'}
              </p>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
        </div>
        </aside>
      )}

      {/* Chat Widget */}
      <ChatWidget />

      {/* Main content */}
      <div className={hidesidebar ? '' : 'lg:pl-64'}>
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center gap-4">
              {!hidesidebar && (
                <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                  <Menu className="h-6 w-6 text-slate-600" />
                </button>
              )}
              <h1 className="text-lg font-semibold text-slate-900 hidden sm:block">
                {currentPageName === 'Home' ? 'Welcome to Mi-Proc' : currentPageName}
              </h1>
            </div>

            <div className="flex items-center gap-4">
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
                  <DropdownMenuItem asChild>
                    <Link to={createPageUrl('Profile')}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={createPageUrl('Settings')}>Account Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={createPageUrl('NotificationSettings')}>
                      <Bell className="mr-2 h-4 w-4" />
                      Notification Preferences
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />

                  {/* Role Switching */}
                  <div className="px-2 py-1.5 text-xs font-semibold text-slate-500">
                    Switch Role
                  </div>
                  <DropdownMenuItem 
                    onClick={() => handleRoleSwitch('buyer')}
                    className={userRole === 'buyer' ? 'bg-indigo-50 text-indigo-600' : ''}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Buyer Dashboard
                    {userRole === 'buyer' && <span className="ml-auto text-xs">✓</span>}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleRoleSwitch('supplier')}
                    className={userRole === 'supplier' ? 'bg-indigo-50 text-indigo-600' : ''}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Supplier Dashboard
                    {userRole === 'supplier' && <span className="ml-auto text-xs">✓</span>}
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  {userRole !== 'admin' && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to={createPageUrl('AdminSignin')}>Admin Login</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem>Help Center</DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-red-600" 
                    onClick={async () => {
                      localStorage.removeItem('selectedRole');
                      // In production: await base44.auth.logout(createPageUrl('Home'));
                      window.location.href = createPageUrl('Home');
                    }}
                  >
                    Sign Out
                  </DropdownMenuItem>
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