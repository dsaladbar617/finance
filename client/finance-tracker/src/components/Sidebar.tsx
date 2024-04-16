// import { HiOutlineDocumentText } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { navData } from "../util/navData";

const Sidebar = () => {
  return (
    <div className="sidenav">
      <button>{/* <HiOutlineDocumentText /> */}</button>
      {navData.map((item) => (
        <NavLink to={item.link} key={item.id}>
          {item.text}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
