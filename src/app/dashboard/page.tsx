import DashboardNavbar from "@/components/dashboard-navbar";
import {
  InfoIcon,
  UserCircle,
  Calendar,
  Users,
  Bell,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { redirect } from "next/navigation";

export default async function Dashboard() {

  // Mock data for dashboard stats
  const dashboardStats = {
    upcomingAppointments: 5,
    totalClients: 12,
    pendingReminders: 3,
    completedAppointments: 28,
    canceledAppointments: 4,
    todayAppointments: [
      { time: "10:00 AM", client: "Jane Smith", service: "Consultation" },
      { time: "2:30 PM", client: "Michael Johnson", service: "Follow-up" },
      { time: "4:15 PM", client: "Sarah Williams", service: "Initial Meeting" },
    ],
    recentClients: [
      {
        name: "Robert Brown",
        lastVisit: "Yesterday",
        nextAppointment: "Next week",
      },
      {
        name: "Emily Davis",
        lastVisit: "3 days ago",
        nextAppointment: "Tomorrow",
      },
      {
        name: "David Wilson",
        lastVisit: "1 week ago",
        nextAppointment: "Not scheduled",
      },
    ],
  };

  return (
    <>
      <DashboardNavbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="bg-secondary/50 text-sm p-3 px-4 rounded-lg text-muted-foreground flex gap-2 items-center">
              <InfoIcon size="14" />
              <span>
                Welcome back! Here's an overview of your BookEase activity
              </span>
            </div>
          </header>

          {/* Stats Overview */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card rounded-xl p-6 border shadow-sm flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Calendar size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Upcoming Appointments
                </p>
                <h3 className="text-2xl font-bold">
                  {dashboardStats.upcomingAppointments}
                </h3>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border shadow-sm flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Users size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Clients</p>
                <h3 className="text-2xl font-bold">
                  {dashboardStats.totalClients}
                </h3>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border shadow-sm flex items-center gap-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <Bell size={24} className="text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Pending Reminders
                </p>
                <h3 className="text-2xl font-bold">
                  {dashboardStats.pendingReminders}
                </h3>
              </div>
            </div>
          </section>

          {/* Appointments Stats */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl p-6 border shadow-sm">
              <h2 className="font-semibold text-xl mb-4">
                Appointment Statistics
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/30 p-4 rounded-lg flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 size={18} className="text-green-500" />
                    <span className="text-sm">Completed</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {dashboardStats.completedAppointments}
                  </p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle size={18} className="text-red-500" />
                    <span className="text-sm">Canceled</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {dashboardStats.canceledAppointments}
                  </p>
                </div>
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-card rounded-xl p-6 border shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={20} className="text-primary" />
                <h2 className="font-semibold text-xl">Today's Schedule</h2>
              </div>

              {dashboardStats.todayAppointments.length > 0 ? (
                <ul className="divide-y">
                  {dashboardStats.todayAppointments.map(
                    (appointment, index) => (
                      <li key={index} className="py-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">
                            {appointment.time}
                          </span>
                          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                            {appointment.service}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {appointment.client}
                        </p>
                      </li>
                    ),
                  )}
                </ul>
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  No appointments scheduled for today
                </p>
              )}
            </div>
          </section>

          {/* Recent Clients */}
          <section className="bg-card rounded-xl p-6 border shadow-sm">
            <h2 className="font-semibold text-xl mb-4">Recent Clients</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4 font-medium text-muted-foreground">
                      Name
                    </th>
                    <th className="text-left py-2 px-4 font-medium text-muted-foreground">
                      Last Visit
                    </th>
                    <th className="text-left py-2 px-4 font-medium text-muted-foreground">
                      Next Appointment
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardStats.recentClients.map((client, index) => (
                    <tr
                      key={index}
                      className="border-b last:border-0 hover:bg-muted/20"
                    >
                      <td className="py-3 px-4">{client.name}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {client.lastVisit}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {client.nextAppointment}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* User Profile Section */}
          <section className="bg-card rounded-xl p-6 border shadow-sm">
            <div className="flex items-center gap-4">
              <UserCircle size={48} className="text-primary" />
              <div>
                <h2 className="font-semibold text-xl">User Profile</h2>
                <p className="text-sm text-muted-foreground"></p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
