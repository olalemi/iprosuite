import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { NavLink, Outlet } from "react-router-dom";
import bg from "../assets/pattern-dark.png";

const RootLayout = () => {
  const [shadow, setShadow] = useState(false);

  // Handle scroll to add box shadow
  useEffect(() => {
    const handleScroll = () => {
      setShadow(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ backgroundImage: `url(${bg})` }} className="  min-h-screen  ">
      <header
        className={`bg-blue-500 ${shadow ? "shadow-md" : ""} fixed w-full z-10`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* 
            o */}
            <div className="flex-shrink-0 text-white md:text-3xl sm:text-xl ">
              <h3>SpaceX Launches</h3>
            </div>

            {/* Desktop Menu */}
            <div className="block">
              <NavLink
                to="/"
                className=" z-40  px-3 py-2 rounded-md text-sm font-medium"
              >
                <FontAwesomeIcon
                  icon={faHome}
                  className="h-6 w-6  text-white"
                />
              </NavLink>
            </div>
          </div>
        </div>
      </header>

      <Outlet />
    </div>
  );
};

export default RootLayout;
