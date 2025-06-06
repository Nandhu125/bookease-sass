"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Home, Calendar, Users, Bell, Settings } from "lucide-react";

export default function DashboardNavbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            prefetch
            className="text-xl font-bold flex items-center"
          >
            <Calendar className="h-6 w-6 text-blue-600 mr-2" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
              BookEase
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 ml-6">
            <NavLink href="/dashboard" label="Dashboard" />
            <NavLink
              href="/calendar"
              label="Calendar"
              icon={<Calendar className="h-4 w-4" />}
            />
            <NavLink
              href="/clients"
              label="Clients"
              icon={<Users className="h-4 w-4" />}
            />
            <NavLink
              href="/reminders"
              label="Reminders"
              icon={<Bell className="h-4 w-4" />}
            />
            <NavLink
              href="/settings"
              label="Settings"
              icon={<Settings className="h-4 w-4" />}
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t mt-4">
        <div className="grid grid-cols-5 gap-1">
          <MobileNavLink
            href="/dashboard"
            label="Dashboard"
            icon={<Home className="h-5 w-5" />}
          />
          <MobileNavLink
            href="/calendar"
            label="Calendar"
            icon={<Calendar className="h-5 w-5" />}
          />
          <MobileNavLink
            href="/clients"
            label="Clients"
            icon={<Users className="h-5 w-5" />}
          />
          <MobileNavLink
            href="/reminders"
            label="Reminders"
            icon={<Bell className="h-5 w-5" />}
          />
          <MobileNavLink
            href="/settings"
            label="Settings"
            icon={<Settings className="h-5 w-5" />}
          />
        </div>
      </div>
    </nav>
  );
}

function NavLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
    >
      {icon}
      {label}
    </Link>
  );
}

function MobileNavLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center py-2 text-xs font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
    >
      {icon}
      <span className="mt-1">{label}</span>
    </Link>
  );
}
