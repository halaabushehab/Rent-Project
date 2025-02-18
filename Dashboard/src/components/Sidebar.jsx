import React, { useState } from "react";
import {
  LayoutDashboard,
  PlusCircle,
  Users,
  UserX,
  MessageSquare,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom"; // استيراد useLocation لتحديد الصفحة النشطة
import { CalendarCheck, CalendarDays } from "lucide-react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation(); // الحصول على الموقع الحالي

  const menuItems = [
    {
      path: "/Dashboard",
      icon: LayoutDashboard,
      label: "Overview",
      color: "emerald",
    },

    {
      path: "/PostList",
      icon: CheckSquare,
      label: "Properties",
      color: "blue",
    },
  {
      path: "/BookingsList",
      icon: CalendarCheck, // أيقونة حجز مؤكد
      label: "Bookings",
      color: "emerald",
    },
  

    { path: "/UserList", icon: Users, label: "Users", color: "emerald" },
    {
      path: "/Blockedusers",
      icon: UserX,
      label: "Blocked Users",
      color: "red",
    },

    {
      path: "/ContactList",
      icon: MessageSquare,
      label: "E-mail",
      color: "emerald",
    },
  
  ];

  return (
    <div
      className={`relative h-screen bg-gray-50 text-gray-900 transition-all duration-300 ease-in-out
        ${collapsed ? "w-20" : "w-64"}`}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 bg-white rounded-full p-1 text-gray-500 hover:text-gray-900 shadow-md"
      >
        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      <div className="p-4">
        <div className="mb-8 flex items-center justify-center">
          {!collapsed && (
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Admin Panel
            </h1>
          )}
        </div>

        <ul className="space-y-4">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path; // تحديد الصفحة النشطة
            const colorMap = {
              emerald: "bg-emerald-600 hover:bg-emerald-700 text-white",
              red: "bg-red-600 hover:bg-red-700 text-white",
              blue: "bg-blue-600 hover:bg-blue-700 text-white",
            };

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                    ${isActive ? colorMap[item.color] : "hover:bg-gray-100"}
                    ${collapsed ? "justify-center" : ""}
                    ${
                      isActive
                        ? "text-white"
                        : "text-gray-700 hover:text-gray-900"
                    }
                  `}
                >
                  <IconComponent size={20} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
