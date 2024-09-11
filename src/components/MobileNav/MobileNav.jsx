import React from "react";
import { mobileNavigation } from "../navigation";
import { NavLink } from "react-router-dom";

const MobileNav = () => {
  return (
    <section className="lg:hidden h-14 bg-black fixed bottom-0 w-full z-40">
      <nav
        className={`flex items-center justify-between h-full text-neutral-400`}
      >
        {mobileNavigation.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              `px-3 flex h-full items-center flex-col justify-center ${
                isActive && "text-white"
              }`
            }
          >
            <div className="text-2xl">{item.icon}</div>
            <p className="text-sm">{item.label}</p>
          </NavLink>
        ))}
      </nav>
    </section>
  );
};

export default MobileNav;
