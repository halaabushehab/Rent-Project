import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../redux/actions/postActions";
import { fetchUsers } from "../redux/actions/userActions";
import { fetchContacts } from "../redux/actions/messagesAction";
import { fetchBookings } from "../redux/actions/bookingActions";
import Sidebar from "./Sidebar";
import UserList from "./UserList";
import Postlist from "./Postlist";
import ContactList from "./ContactList";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Moon, Sun, LogOut, Settings, Users, Home, Mail } from "lucide-react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(true);
  const posts = useSelector((state) => state.posts.posts);
  const users = useSelector((state) => state.users.users);
  const contacts = useSelector((state) => state.contacts.contacts);
  const bookings = useSelector((state) => state.bookings.bookings);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
    dispatch(fetchContacts());
    dispatch(fetchBookings());
  }, [dispatch]);

  const totalUsers = users.length;
  const totalPosts = posts.length;
  const totalMessages = contacts.length;
  const totalBookings = bookings ? Object.keys(bookings).length : 0;

  const monthlyData = [
    {
      name: "Feb",
      users: totalUsers,
      posts: totalPosts,
      messages: totalMessages,
      bookings: totalBookings,
    },
    { name: "Mar", users: 0, posts: 0, messages: 0, bookings: 0 },
    { name: "Apr", users: 0, posts: 0, messages: 0, bookings: 0 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 text-white p-2 rounded-lg">
          <p className="text-sm">{`Month: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm">
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={
        darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }
    >
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64 p-6 min-h-screen transition-colors duration-300">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Welcome Back, Admin</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Here's what's happening today
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                {darkMode ? (
                  <Sun className="text-yellow-400" />
                ) : (
                  <Moon className="text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: "Total Users",
                value: totalUsers,
                icon: Users,
                color: "bg-blue-500",
              },
              {
                title: "Total Posts",
                value: totalPosts,
                icon: Home,
                color: "bg-green-500",
              },
              {
                title: " Total Messages",
                value: totalMessages,
                icon: Mail,
                color: "bg-purple-500",
              },
              {
                title: "Total Bookings",
                value: totalBookings,
                icon: Mail,
                color: "bg-yellow-500",
              },
            ].map((card) => {
              const IconComponent = card.icon;
              return (
                <div
                  key={card.title}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">
                        {card.title}
                      </p>
                      <h3 className="text-2xl font-bold mt-1">{card.value}</h3>
                    </div>
                    <div className={`${card.color} p-3 rounded-lg`}>
                      <IconComponent className="text-white" size={24} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Monthly Overview</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyData}>
                  <XAxis dataKey="name" stroke={darkMode ? "#fff" : "#333"} />
                  <YAxis stroke={darkMode ? "#fff" : "#333"} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.2}
                  />
                  <Area
                    type="monotone"
                    dataKey="posts"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.2}
                  />
                  <Area
                    type="monotone"
                    dataKey="messages"
                    stroke="#9333EA"
                    fill="#9333EA"
                    fillOpacity={0.2}
                  />
                  <Area
                    type="monotone"
                    dataKey="bookings"
                    stroke="#F59E0B"
                    fill="#F59E0B"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Statistics</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <XAxis dataKey="name" stroke={darkMode ? "#fff" : "#333"} />
                  <YAxis stroke={darkMode ? "#fff" : "#333"} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="users" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="posts" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar
                    dataKey="messages"
                    fill="#9333EA"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="bookings"
                    fill="#F59E0B"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <Postlist />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <UserList />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <ContactList />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Bookings</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 border-b-2 border-gray-200 dark:border-gray-700 text-left text-sm font-semibold">
                        User
                      </th>
                      <th className="px-6 py-3 border-b-2 border-gray-200 dark:border-gray-700 text-left text-sm font-semibold">
                        Start Date
                      </th>
                      <th className="px-6 py-3 border-b-2 border-gray-200 dark:border-gray-700 text-left text-sm font-semibold">
                        End Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings &&
                      Object.keys(bookings).map((key, index) => {
                        const booking = bookings[key];
                        return (
                          <tr key={index}>
                            <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-sm">
                              {booking.name || "N/A"}
                            </td>
                            <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-sm">
                              {booking.startDate || "N/A"}
                            </td>

                            <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-sm">
                              {booking.endDate || "N/A"}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
