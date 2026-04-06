import { Link, NavLink } from "react-router";


const NavItems = () => {
  return (
    <div>
      <nav className={`flex items-center justify-center gap-4`}>
        <NavLink  to={"/"}>Home</NavLink>
        <NavLink  to={"/about"}>About</NavLink>
        <NavLink  to={"/contact"}>Contact</NavLink>
      </nav>
    </div>
  );
};

export default NavItems;
