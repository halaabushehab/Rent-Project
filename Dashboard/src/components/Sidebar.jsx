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
import { Link } from "react-router-dom"; // استيراد Link من react-router-dom

const Sidebar = ({ currentPath = "/Dashboard" }) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      path: "/Dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
      color: "emerald",
    },
    { path: "/AddPost", icon: PlusCircle, label: "Add Post", color: "emerald" },
    {
      path: "/blockedusers",
      icon: UserX,
      label: "Blocked Users",
      color: "red",
    },
    {
      path: "/PostList",
      icon: CheckSquare,
      label: "Owner Approval",
      color: "blue",
    },
    { path: "/UserList", icon: Users, label: "Users", color: "emerald" },
    {
      path: "/ContactList",
      icon: MessageSquare,
      label: "Contact List",
      color: "emerald",
    },
  ];

  return (
    <div
      className={`relative h-screen bg-gray-900 text-white transition-all duration-300 ease-in-out
        ${collapsed ? "w-20" : "w-64"}`}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 bg-gray-800 rounded-full p-1 text-gray-400 hover:text-white"
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
            const isActive = currentPath === item.path;
            const colorMap = {
              emerald: "bg-emerald-600 hover:bg-emerald-700",
              red: "bg-red-600 hover:bg-red-700",
              blue: "bg-blue-600 hover:bg-blue-700",
            };

            return (
              <li key={item.path}>
                <Link
                  to={item.path} // استخدام Link للتنقل
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                    ${isActive ? colorMap[item.color] : "hover:bg-gray-800"}
                    ${collapsed ? "justify-center" : ""}
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
