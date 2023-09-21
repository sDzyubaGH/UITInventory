import React from "react";
import Navigation from "./Navigation";

import PersonalAccount from "./PersonalAccount";

function Header() {
  return (
    <header className="bg-white drop-shadow-lg flex justify-between w-full">
      <Navigation />
      <PersonalAccount />
    </header>
  );
}

export default Header;
