import { Bars3Icon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import { navData } from "../util/navData";
import { Dispatch, SetStateAction } from "react";
import styles from "../styles/sidebar.module.css";

type SidebarProps = {
  isClosed: boolean;
  setIsClosed: Dispatch<SetStateAction<boolean>>;
};

const Sidebar = ({ isClosed, setIsClosed }: SidebarProps) => {
  return (
    <div className={isClosed ? styles.sidenavClosed : styles.sidenav}>
      <div className={styles.titleBtn}>
        {!isClosed && <h2 className={styles.title}>Finance</h2>}
        <button
          className={styles.sidebarBtn}
          onClick={() => setIsClosed((prev) => !prev)}
        >
          <Bars3Icon />
        </button>
      </div>
      <div className={styles.navContainer}>
        {!isClosed && (
          <div className={styles.navLinks}>
            {navData.map((item) => (
              <NavLink to={item.link} key={item.id}>
                {item.text}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
