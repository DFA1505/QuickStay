import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";

const BookIcon = () => (
  <svg
    className="w-4 h-4 text-gray-700"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
    />
  </svg>
);

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "Experience", path: "/" },
    { name: "About", path: "/" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { openSignIn } = useClerk();
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isLoaded) return null;

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
          : "py-4 md:py-6 text-black bg-slate-500"
      }`}
    >
      
      <Link to="/" className="z-50">
        <img
          src={assets.logo}
          alt="Logo"
          className={`w-32 md:w-40 ${isScrolled ? "" : "brightness-0 invert"} invert opacity-80`}
        />
      </Link>

      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            className="group flex flex-col gap-0.5 font-medium"
          >
            {link.name}
            <div
              className={`${
                isScrolled ? "bg-gray-700" : "bg-white "
              } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
            />
          </Link>
        ))}

        {isSignedIn && (
          <Link
            to="/dashboard"
            className={`border px-4 py-1 text-sm font-light rounded-full transition-all ${
              isScrolled ? "text-black border-black" : "text-white border-white"
            }`}
          >
            Dashboard
          </Link>
        )}
      </div>


      <div className="hidden md:flex items-center gap-4">
        <svg
          className="h-6 w-6 cursor-pointer"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        {isSignedIn ? (
          <UserButton afterSignOutUrl="/">
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<BookIcon />}
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className={`px-8 py-2.5 rounded-full ml-4 transition-all duration-500 cursor-pointer font-medium ${
              isScrolled ? "text-white bg-black" : "bg-white text-black"
            }`}
          >
            Login
          </button>
        )}
      </div>

      <div className="flex items-center gap-4 md:hidden">
        {isSignedIn && (
          <UserButton afterSignOutUrl="/">
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<BookIcon />}
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-1">
          <svg
            className="h-7 w-7 cursor-pointer"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-gray-800 flex flex-col items-center justify-center gap-8 font-semibold transition-transform duration-500 z-60 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-6 right-6 text-gray-600"
          onClick={() => setIsMenuOpen(false)}
        >
          <svg
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            onClick={() => setIsMenuOpen(false)}
            className="text-2xl hover:text-black transition-colors"
          >
            {link.name}
          </Link>
        ))}

        {isSignedIn ? (
          <Link
            to="/dashboard"
            onClick={() => setIsMenuOpen(false)}
            className="text-2xl text-blue-600"
          >
            Dashboard
          </Link>
        ) : (
          <button
            onClick={() => {
              openSignIn();
              setIsMenuOpen(false);
            }}
            className="bg-black text-white px-10 py-3 rounded-full text-lg"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
