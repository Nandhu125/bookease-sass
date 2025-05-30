import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import {
  ArrowUpRight,
  Calendar,
  Clock,
  Users,
  ListTodo,
  CalendarCheck,
} from "lucide-react";
import { createClient } from "../../supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Simple Booking & Client Management
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A clean, focused solution for service professionals to manage
              appointments and client information without the complexity of full
              CRM systems.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Calendar className="w-6 h-6" />,
                title: "Calendar Management",
                description:
                  "Day/week views with easy appointment creation and editing",
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Time Blocking",
                description:
                  "Block off time for personal tasks or unavailable periods",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Client Management",
                description: "Store basic client info and booking history",
              },
              {
                icon: <ListTodo className="w-6 h-6" />,
                title: "Reminder System",
                description: "Set follow-up reminders for important dates",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Designed for Service Professionals
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              BookEase helps you focus on what matters most - your clients and
              your services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <CalendarCheck className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">
                Streamlined Booking
              </h3>
              <p className="text-gray-600">
                Create and manage appointments with just a few clicks. No
                complicated workflows or confusing interfaces.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <Users className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Client Insights</h3>
              <p className="text-gray-600">
                Keep track of client preferences, service history, and important
                notes all in one place.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <Clock className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Mobile Optimized</h3>
              <p className="text-gray-600">
                Access your schedule and client information on any device with
                our responsive, mobile-first design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Simplify Your Booking Process?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join service professionals who've streamlined their scheduling and
            client management with BookEase.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started Now
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
