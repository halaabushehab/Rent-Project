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
import { LogOut, Settings, Users, Home, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [selectedSidebarItem, setSelectedSidebarItem] = useState("home");
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
    <div className="bg-white text-gray-900">
      <div className="flex">
        <Sidebar
          setSelectedItem={setSelectedSidebarItem}
          selectedItem={selectedSidebarItem}
        />
        <div className="flex-1 ml-64 p-6 min-h-screen">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Welcome Back, Admin</h2>
              <p className="text-gray-500">Here's what's happening today</p>
            </div>
          </div>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: "Users",
                value: totalUsers,
                icon: Users,
                color: "bg-blue-500",
                path: "/UserList",
              },
              {
                title: "Properties",
                value: totalPosts,
                icon: Home,
                color: "bg-green-500",
                path: "/PostList",
              },
              {
                title: "E-mail",
                value: totalMessages,
                icon: Mail,
                color: "bg-purple-500",
                path: "/ContactList",
              },
              {
                title: "Bookings",
                value: totalBookings,
                icon: Mail,
                color: "bg-yellow-500",
                path: "/BookingsList",
              },
            ].map((card) => {
              const IconComponent = card.icon;
              return (
                <Link to={card.path} key={card.title} className="block">
                  <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-md hover:shadow-lg transition-all cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500">{card.title}</p>
                        <h3 className="text-2xl font-bold mt-1 text-gray-900">
                          {card.value}
                        </h3>
                      </div>
                      <div className={`${card.color} p-3 rounded-lg`}>
                        <IconComponent className="text-white" size={24} />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Monthly Overview</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyData}>
                  <XAxis dataKey="name" />
                  <YAxis />
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

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Statistics</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <XAxis dataKey="name" />
                  <YAxis />
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
            <div className="bg-white rounded-xl shadow-lg p-6">
              <Postlist />
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <UserList />
            </div>
            

    <div className="p-6 max-w-5xl mx-auto bg-gray-50 ">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">Messages</h2>

      <div className="space-y-4">
        {contacts.map((contact) => (
          <Link
            key={contact.id}
            to={`/contact/${contact.id}`} // Navigates to details page
            className="block bg-white border border-gray-200 shadow-md rounded-lg p-4 hover:shadow-lg hover:bg-gray-100 transition-all"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600 font-semibold">
                  {contact.email}
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {contact.subject || "No Subject"}
                </p>
              </div>

              {/* Unread message indicator */}
              <div className="bg-red-500 w-3 h-3 rounded-full"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>







          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
