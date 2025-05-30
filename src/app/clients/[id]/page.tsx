import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import DashboardNavbar from "@/components/dashboard-navbar";
import { Calendar, Clock, Edit, Mail, Phone, Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function ClientDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // In a real app, we would fetch the client data from Supabase
  // For now, we'll use sample data
  const clientId = params.id;
  const client = {
    id: clientId,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, USA",
    notes:
      "Prefers appointments in the afternoon. Allergic to certain hair products.",
    tags: ["Regular", "Hair Color"],
    createdAt: "January 15, 2024",
    appointments: [
      {
        id: "1",
        date: "June 15, 2024",
        time: "10:00 AM",
        service: "Haircut & Style",
        duration: "1 hour",
        status: "Upcoming",
        notes: "",
      },
      {
        id: "2",
        date: "May 1, 2024",
        time: "2:30 PM",
        service: "Hair Color",
        duration: "2 hours",
        status: "Completed",
        notes: "Used medium ash blonde color. Very happy with results.",
      },
      {
        id: "3",
        date: "March 15, 2024",
        time: "11:00 AM",
        service: "Haircut & Style",
        duration: "1 hour",
        status: "Completed",
        notes: "Trim with layers. Styled with curls.",
      },
    ],
    notes: [
      {
        id: "1",
        date: "May 1, 2024",
        content: "Discussed changing to a warmer tone next appointment.",
        author: "You",
      },
      {
        id: "2",
        date: "March 15, 2024",
        content:
          "Mentioned upcoming vacation in July - might want a different style before trip.",
        author: "You",
      },
    ],
  };

  return (
    <>
      <DashboardNavbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Client Header */}
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 text-blue-800 rounded-full h-16 w-16 flex items-center justify-center text-xl font-semibold">
                {client.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{client.name}</h1>
                <div className="flex flex-wrap gap-2 mt-1">
                  {client.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Client since {client.createdAt}
                </p>
              </div>
            </div>
            <div className="flex gap-2 self-start">
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Client
              </Button>
              <Button>
                <Calendar className="h-4 w-4 mr-2" />
                Book Appointment
              </Button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 bg-card p-4 rounded-lg border">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Email</div>
                <div>{client.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-card p-4 rounded-lg border">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Phone</div>
                <div>{client.phone}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-card p-4 rounded-lg border">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Address</div>
                <div>{client.address}</div>
              </div>
            </div>
          </div>

          {/* Tabs for different sections */}
          <Tabs defaultValue="appointments" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>

            {/* Appointments Tab */}
            <TabsContent value="appointments" className="mt-4">
              <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="font-semibold text-lg">Appointment History</h2>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Appointment
                  </Button>
                </div>
                <div className="divide-y">
                  {client.appointments.map((appointment) => (
                    <div key={appointment.id} className="p-4 hover:bg-muted/20">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">
                            {appointment.service}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {appointment.date}
                            <Clock className="h-3.5 w-3.5 ml-2" />
                            {appointment.time} ({appointment.duration})
                          </div>
                        </div>
                        <div
                          className={`text-xs px-2 py-1 rounded ${appointment.status === "Upcoming" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}
                        >
                          {appointment.status}
                        </div>
                      </div>
                      {appointment.notes && (
                        <div className="mt-2 text-sm bg-muted/30 p-2 rounded">
                          {appointment.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Notes Tab */}
            <TabsContent value="notes" className="mt-4">
              <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="font-semibold text-lg">Client Notes</h2>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Note
                  </Button>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    {client.notes.map((note) => (
                      <div key={note.id} className="bg-muted/20 p-3 rounded-lg">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{note.author}</span>
                          <span className="text-muted-foreground">
                            {note.date}
                          </span>
                        </div>
                        <p className="mt-1">{note.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Details Tab */}
            <TabsContent value="details" className="mt-4">
              <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="font-semibold text-lg">Client Details</h2>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Client Notes
                      </h3>
                      <p className="mt-1">{client.notes}</p>
                    </div>

                    {/* Additional details would go here */}
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Preferences
                      </h3>
                      <p className="mt-1">No preferences recorded</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}
