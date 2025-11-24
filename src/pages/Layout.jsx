import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* NAVBAR */}
      <nav className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="text-lg font-semibold">
              Trang chủ
            </Link>

            {/* Mobile button */}
            <button
              className="md:hidden block text-gray-200 hover:text-white"
              onClick={() => setOpen(!open)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* MENU */}
            <div className="hidden md:flex space-x-6">
              <Link className="hover:text-gray-300" to="/">
                Danh sách
              </Link>
              <Link className="hover:text-gray-300" to="/add">
                Thêm mới
              </Link>
            </div>

            {/* RIGHT MENU */}
            <div className="hidden md:flex space-x-6">
              <Link className="hover:text-gray-300" to="/register">
                Đăng ký
              </Link>
              <Link className="hover:text-gray-300" to="/login">
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-4 py-3 space-y-2">
              <Link className="block hover:text-gray-300" to="/">
                Danh sách
              </Link>
              <Link className="block hover:text-gray-300" to="/add">
                Thêm mới
              </Link>
              <Link className="block hover:text-gray-300" to="/register">
                Đăng ký
              </Link>
              <Link className="block hover:text-gray-300" to="/login">
                Đăng nhập
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto mt-6 px-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
