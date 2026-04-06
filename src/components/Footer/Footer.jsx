import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span>This is footer</span>{" "}
      <span className="flex gap-3.5">
        <Link to={"home"}>Home</Link>
        <Link to={"about"}>About</Link>
        <Link to={"contact"}>Contact</Link>
      </span>
    </div>
  );
};

export default Footer;
