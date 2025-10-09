import {
  HelpCircle,
  Phone,
  Plus,
  Search,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="hidden lg:block">
      <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-2 border-b-1 p-2 border-gray-100">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">FS</span>
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">Fikri Studio</h1>
              <p className="text-xs text-gray-500">Agent Admin</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
              ⌘ K
            </span>
          </div>

          {/* Navigation */}
          <nav className="space-y-1 mb-8">
            <Link
              to="/"
              className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md ${location.pathname === '/dashboard' ? 'text-blue-600 bg-blue-50 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}            >
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-layout-dashboard"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
                <path d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
                <path d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
                <path d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
              </svg>{" "}
              Dashboard
            </Link>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
            >
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-message-circle"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1" />
              </svg>{" "}
              Inbox
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
            >
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-bell"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
              </svg>{" "}
              Notification
            </a>
            <Link
              to="/ticket"
              className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md ${location.pathname === '/ticket' ? 'text-blue-600 bg-blue-50 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
            >
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-ticket"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 5l0 2" />
                <path d="M15 11l0 2" />
                <path d="M15 17l0 2" />
                <path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2" />
              </svg>{" "}
              Ticket
            </Link>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
            >
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-bulb"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
                <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
                <path d="M9.7 17l4.6 0" />
              </svg>{" "}
              Knowledge Base
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
            >
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-users"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
              </svg>{" "}
              Customer
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
            >
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-mail-forward"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 18h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7.5" />
                <path d="M3 6l9 6l9 -6" />
                <path d="M15 18h6" />
                <path d="M18 15l3 3l-3 3" />
              </svg>{" "}
              Forum
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
            >
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-flag-2"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 14h14v-9h-14v16" />
              </svg>{" "}
              Report
            </a>
          </nav>

          {/* Conversation Section */}
          <div className="mb-6">
            <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
              CONVERSATION
            </h3>
            <div className="space-y-1">
              <div className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600">
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
                  className="icon icon-tabler icons-tabler-outline icon-tabler-phone"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                </svg>{" "}
                <span>Call</span>
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  1
                </span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600">
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
                  className="icon icon-tabler icons-tabler-outline icon-tabler-message-heart"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M8 9h8" />
                  <path d="M8 13h3.5" />
                  <path d="M10.48 19.512l-2.48 1.488v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v4" />
                  <path d="M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296z" />
                </svg>{" "}
                <span>Side Conversation</span>
                <span className="ml-auto text-xs text-gray-400">0</span>
              </div>
            </div>
          </div>

          {/* Pinned Tickets */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                FAVORITES
              </h3>
            </div>
            <p className="text-xs text-gray-400">
              Hover over any ticket and click the star to add it here
            </p>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                PINNED TICKETS
              </h3>
              <button className="text-xs text-blue-600">Unpin All</button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>#TC-192 produc...</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-auto icon icon-tabler icons-tabler-outline icon-tabler-pinned-off"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 3l18 18" />
                  <path d="M15 4.5l-3.249 3.249m-2.57 1.433l-2.181 .818l-1.5 1.5l7 7l1.5 -1.5l.82 -2.186m1.43 -2.563l3.25 -3.251" />
                  <path d="M9 15l-4.5 4.5" />
                  <path d="M14.5 4l5.5 5.5" />
                </svg>{" "}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>#TC-191 paymen...</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-auto icon icon-tabler icons-tabler-outline icon-tabler-pinned-off"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 3l18 18" />
                  <path d="M15 4.5l-3.249 3.249m-2.57 1.433l-2.181 .818l-1.5 1.5l7 7l1.5 -1.5l.82 -2.186m1.43 -2.563l3.25 -3.251" />
                  <path d="M9 15l-4.5 4.5" />
                  <path d="M14.5 4l5.5 5.5" />
                </svg>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Phone className="w-3 h-3" />
                <span>+1 678-998-78...</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-auto icon icon-tabler icons-tabler-outline icon-tabler-pinned-off"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 3l18 18" />
                  <path d="M15 4.5l-3.249 3.249m-2.57 1.433l-2.181 .818l-1.5 1.5l7 7l1.5 -1.5l.82 -2.186m1.43 -2.563l3.25 -3.251" />
                  <path d="M9 15l-4.5 4.5" />
                  <path d="M14.5 4l5.5 5.5" />
                </svg>
              </div>
              <button className="flex items-center gap-2 text-xs text-blue-600">
                <Plus className="w-3 h-3" />
                Add new
              </button>
            </div>
          </div>

          <div className="mt-auto">
            <button className="flex items-center gap-2 text-xs text-gray-600 w-full px-3 py-2 hover:bg-gray-50 rounded-md">
              <HelpCircle className="w-4 h-4" />
              Help & Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
