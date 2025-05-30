import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";
import DashboardNavbar from "@/components/dashboard-navbar";
import { Plus, Search, Filter, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function ClientsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <>
      <DashboardNavbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Clients</h1>
              <p className="text-muted-foreground">
                Manage your client information
              </p>
            </div>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add New Client
            </Button>
          </header>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                className="pl-10"
                placeholder="Search clients by name, email, or phone"
              />
            </div>
            <Button variant="outline" className="sm:w-auto w-full">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Client List */}
          <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Name
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Email
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Phone
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Last Appointment
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {/* Sample client data */}
                  {[
                    {
                      name: "Sarah Johnson",
                      email: "sarah.j@example.com",
                      phone: "(555) 123-4567",
                      lastAppointment: "Today",
                      tags: ["Regular", "Hair Color"],
                    },
                    {
                      name: "Michael Smith",
                      email: "msmith@example.com",
                      phone: "(555) 987-6543",
                      lastAppointment: "Yesterday",
                      tags: ["New Client"],
                    },
                    {
                      name: "Emma Wilson",
                      email: "emma.w@example.com",
                      phone: "(555) 456-7890",
                      lastAppointment: "Jun 10, 2024",
                      tags: ["Regular", "Haircut"],
                    },
                    {
                      name: "James Brown",
                      email: "jbrown@example.com",
                      phone: "(555) 234-5678",
                      lastAppointment: "May 28, 2024",
                      tags: ["Consultation"],
                    },
                    {
                      name: "Olivia Davis",
                      email: "olivia.d@example.com",
                      phone: "(555) 876-5432",
                      lastAppointment: "May 15, 2024",
                      tags: ["Regular", "Full Service"],
                    },
                  ].map((client, index) => (
                    <tr key={index} className="hover:bg-muted/20">
                      <td className="py-3 px-4">
                        <div className="font-medium">{client.name}</div>
                        <div className="flex gap-1 mt-1">
                          {client.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{client.email}</td>
                      <td className="py-3 px-4 text-sm">{client.phone}</td>
                      <td className="py-3 px-4 text-sm">
                        {client.lastAppointment}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            Book
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="py-3 px-4 border-t flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Showing 1-5 of 5 clients
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
