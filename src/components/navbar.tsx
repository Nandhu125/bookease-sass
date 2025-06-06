import Link from "next/link";
import { Button } from "./ui/button";
import { Calendar } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white py-3">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" prefetch className="text-xl font-bold flex items-center">
          <Calendar className="h-6 w-6 text-blue-600 mr-2" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
            BookEase
          </span>
        </Link>
        <div className="flex gap-4 items-center">
          <Link
            href="/dashboard"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <Button>Dashboard</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
