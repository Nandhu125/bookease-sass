import Link from "next/link";
import { ArrowUpRight, Check, Calendar, Clock, Users } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 opacity-70" />

      <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                BookEase
              </span>{" "}
              - Simple Booking & Client Management
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              A clean, focused solution for service professionals to manage
              appointments and client information without the complexity of full
              CRM systems.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-8 py-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
              >
                Get Started Free
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Link>

              <Link
                href="#features"
                className="inline-flex items-center px-8 py-4 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-lg font-medium"
              >
                See Features
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                <Calendar className="w-10 h-10 text-blue-600 mb-3" />
                <h3 className="font-medium">Calendar Management</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Day/week views with appointment scheduling
                </p>
              </div>
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                <Users className="w-10 h-10 text-blue-600 mb-3" />
                <h3 className="font-medium">Client Management</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Store client info and booking history
                </p>
              </div>
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                <Clock className="w-10 h-10 text-blue-600 mb-3" />
                <h3 className="font-medium">Reminder System</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Set follow-up reminders for important dates
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
