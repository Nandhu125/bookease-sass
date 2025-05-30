import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";
import DashboardNavbar from "@/components/dashboard-navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export default async function SettingsPage() {
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
          <header>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account and preferences
            </p>
          </header>

          {/* Settings Tabs */}
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="mt-6">
              <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">
                    Personal Information
                  </h2>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          defaultValue={user.email?.split("@")[0] || ""}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue={user.email || ""}
                          disabled
                        />
                        <p className="text-xs text-muted-foreground">
                          Email cannot be changed
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(555) 123-4567"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <select
                          id="timezone"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="America/New_York">
                            Eastern Time (ET)
                          </option>
                          <option value="America/Chicago">
                            Central Time (CT)
                          </option>
                          <option value="America/Denver">
                            Mountain Time (MT)
                          </option>
                          <option value="America/Los_Angeles">
                            Pacific Time (PT)
                          </option>
                          <option value="America/Anchorage">
                            Alaska Time (AKT)
                          </option>
                          <option value="Pacific/Honolulu">
                            Hawaii Time (HT)
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell your clients a bit about yourself and your services..."
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="pt-4">
                      <Button>Save Changes</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl border shadow-sm overflow-hidden mt-6">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Password</h2>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">
                          Current Password
                        </Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                          Confirm New Password
                        </Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button>Update Password</Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Business Tab */}
            <TabsContent value="business" className="mt-6">
              <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">
                    Business Information
                  </h2>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Business Name</Label>
                        <Input
                          id="businessName"
                          placeholder="Your Business Name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="businessType">Business Type</Label>
                        <select
                          id="businessType"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">Select a business type</option>
                          <option value="salon">Hair Salon</option>
                          <option value="spa">Spa & Wellness</option>
                          <option value="coaching">
                            Coaching & Consulting
                          </option>
                          <option value="therapy">Therapy & Counseling</option>
                          <option value="fitness">
                            Fitness & Personal Training
                          </option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="businessPhone">Business Phone</Label>
                        <Input
                          id="businessPhone"
                          type="tel"
                          placeholder="(555) 123-4567"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="businessEmail">Business Email</Label>
                        <Input
                          id="businessEmail"
                          type="email"
                          placeholder="business@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessAddress">Business Address</Label>
                      <Input
                        id="businessAddress"
                        placeholder="Street Address"
                      />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state">State/Province</Label>
                        <Input id="state" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP/Postal Code</Label>
                        <Input id="zip" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" defaultValue="United States" />
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button>Save Business Information</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl border shadow-sm overflow-hidden mt-6">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Services</h2>

                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Define the services you offer to your clients
                    </p>

                    {/* Sample service */}
                    <div className="bg-muted/20 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Haircut & Style</h3>
                          <p className="text-sm text-muted-foreground">
                            60 minutes • $75
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>

                    <div className="bg-muted/20 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Hair Color</h3>
                          <p className="text-sm text-muted-foreground">
                            120 minutes • $120
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Service
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Availability Tab */}
            <TabsContent value="availability" className="mt-6">
              <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Working Hours</h2>

                  <div className="space-y-6">
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ].map((day) => (
                      <div
                        key={day}
                        className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center gap-4">
                          <Switch
                            id={`${day.toLowerCase()}-active`}
                            defaultChecked={day !== "Sunday"}
                          />
                          <Label
                            htmlFor={`${day.toLowerCase()}-active`}
                            className="font-medium"
                          >
                            {day}
                          </Label>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            className="flex h-9 w-24 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            defaultValue={day !== "Sunday" ? "09:00" : ""}
                            disabled={day === "Sunday"}
                          >
                            <option value="">Closed</option>
                            <option value="08:00">8:00 AM</option>
                            <option value="09:00">9:00 AM</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="12:00">12:00 PM</option>
                          </select>
                          <span className="text-muted-foreground">to</span>
                          <select
                            className="flex h-9 w-24 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            defaultValue={day !== "Sunday" ? "17:00" : ""}
                            disabled={day === "Sunday"}
                          >
                            <option value="">Closed</option>
                            <option value="16:00">4:00 PM</option>
                            <option value="17:00">5:00 PM</option>
                            <option value="18:00">6:00 PM</option>
                            <option value="19:00">7:00 PM</option>
                            <option value="20:00">8:00 PM</option>
                          </select>
                        </div>
                      </div>
                    ))}

                    <div className="pt-4">
                      <Button>Save Working Hours</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl border shadow-sm overflow-hidden mt-6">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">
                    Time Off & Holidays
                  </h2>

                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Add dates when you'll be unavailable for appointments
                    </p>

                    {/* Sample time off */}
                    <div className="bg-muted/20 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Summer Vacation</h3>
                          <p className="text-sm text-muted-foreground">
                            July 15 - July 22, 2024
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Time Off
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="mt-6">
              <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">
                    Application Preferences
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Calendar Default View</h3>
                        <p className="text-sm text-muted-foreground">
                          Choose which view to show by default
                        </p>
                      </div>
                      <select
                        className="flex h-9 w-32 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        defaultValue="week"
                      >
                        <option value="day">Day</option>
                        <option value="week">Week</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Appointment Duration</h3>
                        <p className="text-sm text-muted-foreground">
                          Default duration for new appointments
                        </p>
                      </div>
                      <select
                        className="flex h-9 w-32 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        defaultValue="60"
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="45">45 minutes</option>
                        <option value="60">60 minutes</option>
                        <option value="90">90 minutes</option>
                        <option value="120">120 minutes</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Time Format</h3>
                        <p className="text-sm text-muted-foreground">
                          Choose 12 or 24 hour time format
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="12h" className="cursor-pointer">
                          <input
                            type="radio"
                            id="12h"
                            name="timeFormat"
                            value="12h"
                            defaultChecked
                            className="mr-2"
                          />
                          12-hour
                        </Label>
                        <Label htmlFor="24h" className="cursor-pointer">
                          <input
                            type="radio"
                            id="24h"
                            name="timeFormat"
                            value="24h"
                            className="mr-2"
                          />
                          24-hour
                        </Label>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">First Day of Week</h3>
                        <p className="text-sm text-muted-foreground">
                          Choose which day your week starts on
                        </p>
                      </div>
                      <select
                        className="flex h-9 w-32 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        defaultValue="sunday"
                      >
                        <option value="sunday">Sunday</option>
                        <option value="monday">Monday</option>
                      </select>
                    </div>

                    <div className="pt-4">
                      <Button>Save Preferences</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl border shadow-sm overflow-hidden mt-6">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Notifications</h2>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive email notifications for new bookings
                        </p>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Daily Summary</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive a daily summary of your schedule
                        </p>
                      </div>
                      <Switch id="daily-summary" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Reminder Notifications</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications for upcoming reminders
                        </p>
                      </div>
                      <Switch id="reminder-notifications" defaultChecked />
                    </div>

                    <div className="pt-4">
                      <Button>Save Notification Settings</Button>
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

function Plus({ className }: { className?: string }) {
  return (
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
      className={className}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
