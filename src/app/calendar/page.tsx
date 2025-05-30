import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";
import DashboardNavbar from "@/components/dashboard-navbar";
import { Calendar, Clock, Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function CalendarPage() {
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
              <h1 className="text-3xl font-bold">Calendar</h1>
              <p className="text-muted-foreground">
                Manage your appointments and schedule
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Clock className="h-4 w-4 mr-2" />
                Day View
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Week View
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Appointment
              </Button>
            </div>
          </header>

          {/* Calendar Placeholder */}
          <section className="bg-card rounded-xl border shadow-sm p-6 min-h-[600px]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold text-xl">June 2024</h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  Today
                </Button>
                <Button variant="outline" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </Button>
                <Button variant="outline" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Day Headers */}
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center py-2 font-medium text-sm">
                  {day}
                </div>
              ))}

              {/* Calendar Days */}
              {Array.from({ length: 35 }).map((_, i) => {
                const dayNumber = i - 3; // Offset to start month on correct day
                const isCurrentMonth = dayNumber > 0 && dayNumber <= 30;
                const isToday = dayNumber === 15; // Just for demo
                const hasAppointments = [3, 8, 15, 22, 27].includes(dayNumber); // Demo data

                return (
                  <div
                    key={i}
                    className={`min-h-24 p-1 border ${isCurrentMonth ? "bg-white" : "bg-gray-50"} ${isToday ? "ring-2 ring-primary ring-offset-2" : ""}`}
                  >
                    {isCurrentMonth && (
                      <>
                        <div className="text-right text-sm">{dayNumber}</div>
                        {hasAppointments && (
                          <div className="mt-1 text-xs bg-blue-100 text-blue-800 p-1 rounded">
                            {dayNumber === 15
                              ? "3 appointments"
                              : "1 appointment"}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Upcoming Appointments */}
          <section className="bg-card rounded-xl border shadow-sm p-6">
            <h2 className="font-semibold text-xl mb-4">Today's Appointments</h2>
            <div className="space-y-3">
              {/* Sample appointments */}
              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-100 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 text-blue-800 font-medium text-xs py-1 px-2 rounded">
                    10:00 AM
                  </div>
                  <div>
                    <div className="font-medium">Haircut & Style</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Users className="h-3 w-3" /> Sarah Johnson
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-100 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 text-blue-800 font-medium text-xs py-1 px-2 rounded">
                    2:30 PM
                  </div>
                  <div>
                    <div className="font-medium">Consultation</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Users className="h-3 w-3" /> Michael Smith
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 text-gray-800 font-medium text-xs py-1 px-2 rounded">
                    4:00 PM - 5:00 PM
                  </div>
                  <div>
                    <div className="font-medium">Blocked - Personal</div>
                    <div className="text-sm text-muted-foreground">
                      Doctor's appointment
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
