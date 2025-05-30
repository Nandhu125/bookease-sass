import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";
import DashboardNavbar from "@/components/dashboard-navbar";
import { Bell, Calendar, Check, Clock, Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function RemindersPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Sample reminder data
  const reminders = [
    {
      id: "1",
      title: "Follow up with Sarah about color change",
      date: "June 20, 2024",
      time: "10:00 AM",
      client: "Sarah Johnson",
      priority: "high",
      completed: false,
    },
    {
      id: "2",
      title: "Order new styling products",
      date: "June 18, 2024",
      time: "9:00 AM",
      client: null,
      priority: "medium",
      completed: false,
    },
    {
      id: "3",
      title: "Call Michael about rescheduling",
      date: "June 16, 2024",
      time: "2:00 PM",
      client: "Michael Smith",
      priority: "high",
      completed: false,
    },
    {
      id: "4",
      title: "Review monthly schedule",
      date: "June 30, 2024",
      time: "4:00 PM",
      client: null,
      priority: "low",
      completed: false,
    },
    {
      id: "5",
      title: "Send thank you note to Emma",
      date: "June 10, 2024",
      time: "3:00 PM",
      client: "Emma Wilson",
      priority: "medium",
      completed: true,
    },
  ];

  return (
    <>
      <DashboardNavbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Reminders</h1>
              <p className="text-muted-foreground">
                Keep track of follow-ups and tasks
              </p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Reminder
            </Button>
          </header>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="bg-primary/10">
              All Reminders
            </Button>
            <Button variant="outline" size="sm">
              Upcoming
            </Button>
            <Button variant="outline" size="sm">
              Completed
            </Button>
            <Button variant="outline" size="sm">
              High Priority
            </Button>
          </div>

          {/* Reminders List */}
          <div className="space-y-4">
            {reminders.map((reminder) => (
              <div
                key={reminder.id}
                className={`bg-card rounded-xl border shadow-sm p-4 flex items-start gap-4 ${reminder.completed ? "opacity-60" : ""}`}
              >
                <Button
                  variant="outline"
                  size="icon"
                  className={`rounded-full ${reminder.completed ? "bg-green-100 text-green-800 border-green-200" : "bg-muted"}`}
                >
                  <Check className="h-4 w-4" />
                </Button>

                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3
                      className={`font-medium ${reminder.completed ? "line-through text-muted-foreground" : ""}`}
                    >
                      {reminder.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`text-xs px-2 py-1 rounded ${getPriorityClass(reminder.priority)}`}
                      >
                        {reminder.priority.charAt(0).toUpperCase() +
                          reminder.priority.slice(1)}{" "}
                        Priority
                      </span>
                      {reminder.client && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center gap-1">
                          <User className="h-3 w-3" /> {reminder.client}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {reminder.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {reminder.time}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Completed Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Completed</h2>
            <div className="space-y-4">
              {reminders
                .filter((r) => r.completed)
                .map((reminder) => (
                  <div
                    key={reminder.id}
                    className="bg-card rounded-xl border shadow-sm p-4 flex items-start gap-4 opacity-60"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-green-100 text-green-800 border-green-200"
                    >
                      <Check className="h-4 w-4" />
                    </Button>

                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h3 className="font-medium line-through text-muted-foreground">
                          {reminder.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <span
                            className={`text-xs px-2 py-1 rounded ${getPriorityClass(reminder.priority)}`}
                          >
                            {reminder.priority.charAt(0).toUpperCase() +
                              reminder.priority.slice(1)}{" "}
                            Priority
                          </span>
                          {reminder.client && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center gap-1">
                              <User className="h-3 w-3" /> {reminder.client}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {reminder.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {reminder.time}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        Restore
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function getPriorityClass(priority: string) {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-amber-100 text-amber-800";
    case "low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
