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
import BuyerOnboarding from './pages/BuyerOnboarding';
import BuyerSignin from './pages/BuyerSignin';
import BuyerSignup from './pages/BuyerSignup';
import Contact from './pages/Contact';
import CreateRFQ from './pages/CreateRFQ';
import Dashboard from './pages/Dashboard';
import Escrow from './pages/Escrow';
import Home from './pages/Home';
import Negotiations from './pages/Negotiations';
import RFQList from './pages/RFQList';
import SupplierOnboarding from './pages/SupplierOnboarding';
import SupplierSignin from './pages/SupplierSignin';
import SupplierSignup from './pages/SupplierSignup';
import Suppliers from './pages/Suppliers';
import Wallet from './pages/Wallet';
import TopUpWallet from './pages/TopUpWallet';
import PayWallet from './pages/PayWallet';
import ReceiveWallet from './pages/ReceiveWallet';
import WithdrawWallet from './pages/WithdrawWallet';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "BuyerOnboarding": BuyerOnboarding,
    "BuyerSignin": BuyerSignin,
    "BuyerSignup": BuyerSignup,
    "Contact": Contact,
    "CreateRFQ": CreateRFQ,
    "Dashboard": Dashboard,
    "Escrow": Escrow,
    "Home": Home,
    "Negotiations": Negotiations,
    "RFQList": RFQList,
    "SupplierOnboarding": SupplierOnboarding,
    "SupplierSignin": SupplierSignin,
    "SupplierSignup": SupplierSignup,
    "Suppliers": Suppliers,
    "Wallet": Wallet,
    "TopUpWallet": TopUpWallet,
    "PayWallet": PayWallet,
    "ReceiveWallet": ReceiveWallet,
    "WithdrawWallet": WithdrawWallet,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};