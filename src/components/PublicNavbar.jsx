import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function PublicNavbar({ activePage }) {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to={createPageUrl('Home')} className="flex items-center gap-2">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698475e8a83c0e60c7a78100/def2d3f5f_MI-logo-color.png"
            alt="MI Technologies"
            className="h-8"
          />
          <span className="font-bold text-slate-900">Mi-Proc</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <Link to={createPageUrl('Home')} className={activePage === 'Home' ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900'}>
            Home
          </Link>
          <Link to={createPageUrl('Products')} className={activePage === 'Products' ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900'}>
            Products
          </Link>

          {/* Solutions Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className={`flex items-center gap-1 outline-none font-semibold text-sm ${
              ['Solutions', 'ProcurementServices', 'Automation', 'DigitalTransformation', 'CostOptimisation'].includes(activePage)
                ? 'text-indigo-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}>
              Solutions <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem asChild>
                <Link to={createPageUrl('Solutions')} className={`cursor-pointer ${activePage === 'Solutions' ? 'text-indigo-600 font-semibold' : ''}`}>
                  Solutions Overview
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={createPageUrl('ProcurementServices')} className={`cursor-pointer ${activePage === 'ProcurementServices' ? 'text-indigo-600 font-semibold' : ''}`}>
                  Procurement Services
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={createPageUrl('Automation')} className={`cursor-pointer ${activePage === 'Automation' ? 'text-indigo-600 font-semibold' : ''}`}>
                  Automation
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={createPageUrl('DigitalTransformation')} className={`cursor-pointer ${activePage === 'DigitalTransformation' ? 'text-indigo-600 font-semibold' : ''}`}>
                  Digital Transformation
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={createPageUrl('CostOptimisation')} className={`cursor-pointer ${activePage === 'CostOptimisation' ? 'text-indigo-600 font-semibold' : ''}`}>
                  Cost Optimisation
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to={createPageUrl('BlogNews')} className={activePage === 'BlogNews' ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900'}>
            Blog / News
          </Link>

          {/* About Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className={`flex items-center gap-1 outline-none font-semibold text-sm ${
              ['About', 'Careers', 'Contact'].includes(activePage)
                ? 'text-indigo-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}>
              About <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem asChild>
                <Link to={createPageUrl('About')} className={`cursor-pointer ${activePage === 'About' ? 'text-indigo-600 font-semibold' : ''}`}>
                  About Overview
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={createPageUrl('Careers')} className={`cursor-pointer ${activePage === 'Careers' ? 'text-indigo-600 font-semibold' : ''}`}>
                  Careers
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={createPageUrl('Contact')} className={`cursor-pointer ${activePage === 'Contact' ? 'text-indigo-600 font-semibold' : ''}`}>
                  Contact Us
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>


        </div>

        <div className="flex gap-2">
          <Link to={createPageUrl('Signin')}><Button variant="outline" size="sm">Sign In</Button></Link>
          <Link to={createPageUrl('Contact')}><Button variant="outline" size="sm">Request a Demo</Button></Link>
          <Link to={createPageUrl('Register')}><Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">Get Started</Button></Link>
        </div>
      </div>
    </nav>
  );
}