/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';
import AdminSignin from './pages/AdminSignin';
import Analytics from './pages/Analytics';
import Architecture from './pages/Architecture';
import AuthBuyer from './pages/AuthBuyer';
import AuthSupplier from './pages/AuthSupplier';
import Automation from './pages/Automation';
import Bids from './pages/Bids';
import BlacklistSuppliers from './pages/BlacklistSuppliers';
import BlogNews from './pages/BlogNews';
import BrowseRFQs from './pages/BrowseRFQs';
import BudgetManagement from './pages/BudgetManagement';
import BuyerDashboard from './pages/BuyerDashboard';
import BuyerOnboarding from './pages/BuyerOnboarding';
import BuyerSignin from './pages/BuyerSignin';
import BuyerSignup from './pages/BuyerSignup';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import CostOptimisation from './pages/CostOptimisation';
import CreateRFQ from './pages/CreateRFQ';
import Dashboard from './pages/Dashboard';
import DigitalTransformation from './pages/DigitalTransformation';
import Escrow from './pages/Escrow';
import FavoriteSuppliers from './pages/FavoriteSuppliers';
import GoodsReceipt from './pages/GoodsReceipt';
import HistoricPricing from './pages/HistoricPricing';
import Home from './pages/Home';
import InvoiceManagement from './pages/InvoiceManagement';
import Negotiations from './pages/Negotiations';
import NotificationSettings from './pages/NotificationSettings';
import OrderDetails from './pages/OrderDetails';
import Orders from './pages/Orders';
import PayWallet from './pages/PayWallet';
import ProcurementServices from './pages/ProcurementServices';
import Products from './pages/Products';
import Profile from './pages/Profile';
import PurchaseRequests from './pages/PurchaseRequests';
import RFQList from './pages/RFQList';
import ReceiveWallet from './pages/ReceiveWallet';
import Register from './pages/Register';
import RiskManagement from './pages/RiskManagement';
import SendWallet from './pages/SendWallet';
import Settings from './pages/Settings';
import Signin from './pages/Signin';
import Solutions from './pages/Solutions';
import SupplierDashboard from './pages/SupplierDashboard';
import SupplierOnboarding from './pages/SupplierOnboarding';
import SupplierSignin from './pages/SupplierSignin';
import SupplierSignup from './pages/SupplierSignup';
import Suppliers from './pages/Suppliers';
import TeamManagement from './pages/TeamManagement';
import TopUpWallet from './pages/TopUpWallet';
import TrackShipment from './pages/TrackShipment';
import UserJourney from './pages/UserJourney';
import Wallet from './pages/Wallet';
import WithdrawWallet from './pages/WithdrawWallet';
import SupplierComparison from './pages/SupplierComparison';
import WorkflowConfiguration from './pages/WorkflowConfiguration';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "AdminDashboard": AdminDashboard,
    "AdminSignin": AdminSignin,
    "Analytics": Analytics,
    "Architecture": Architecture,
    "AuthBuyer": AuthBuyer,
    "AuthSupplier": AuthSupplier,
    "Automation": Automation,
    "Bids": Bids,
    "BlacklistSuppliers": BlacklistSuppliers,
    "BlogNews": BlogNews,
    "BrowseRFQs": BrowseRFQs,
    "BudgetManagement": BudgetManagement,
    "BuyerDashboard": BuyerDashboard,
    "BuyerOnboarding": BuyerOnboarding,
    "BuyerSignin": BuyerSignin,
    "BuyerSignup": BuyerSignup,
    "Careers": Careers,
    "Contact": Contact,
    "CostOptimisation": CostOptimisation,
    "CreateRFQ": CreateRFQ,
    "Dashboard": Dashboard,
    "DigitalTransformation": DigitalTransformation,
    "Escrow": Escrow,
    "FavoriteSuppliers": FavoriteSuppliers,
    "GoodsReceipt": GoodsReceipt,
    "HistoricPricing": HistoricPricing,
    "Home": Home,
    "InvoiceManagement": InvoiceManagement,
    "Negotiations": Negotiations,
    "NotificationSettings": NotificationSettings,
    "OrderDetails": OrderDetails,
    "Orders": Orders,
    "PayWallet": PayWallet,
    "ProcurementServices": ProcurementServices,
    "Products": Products,
    "Profile": Profile,
    "PurchaseRequests": PurchaseRequests,
    "RFQList": RFQList,
    "ReceiveWallet": ReceiveWallet,
    "Register": Register,
    "RiskManagement": RiskManagement,
    "SendWallet": SendWallet,
    "Settings": Settings,
    "Signin": Signin,
    "Solutions": Solutions,
    "SupplierDashboard": SupplierDashboard,
    "SupplierOnboarding": SupplierOnboarding,
    "SupplierSignin": SupplierSignin,
    "SupplierSignup": SupplierSignup,
    "Suppliers": Suppliers,
    "TeamManagement": TeamManagement,
    "TopUpWallet": TopUpWallet,
    "TrackShipment": TrackShipment,
    "UserJourney": UserJourney,
    "Wallet": Wallet,
    "WithdrawWallet": WithdrawWallet,
    "SupplierComparison": SupplierComparison,
    "WorkflowConfiguration": WorkflowConfiguration,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};