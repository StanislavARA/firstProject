import s from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import Friends from "./Friends/Friends";

function selectLink() {
  function select(sel: any) {
    if (sel.isActive) return s.activeLink;
    return s.item;
  }
  return select;
}
const Navbar = () => {
  return (
    <nav className={s.nav}>
      <div>
        <NavLink to="/profile" className={selectLink()}>
          Profile
        </NavLink>
      </div>
      <div>
        <NavLink to="/users" className={selectLink()}>
          Users
        </NavLink>
      </div>
      <div>
        <NavLink to="/dialogs/" className={selectLink()}>
          Messages
        </NavLink>
      </div>
      <div>
        <NavLink to="/news" className={selectLink()}>
          News
        </NavLink>
      </div>
      <div>
        <NavLink to="/music" className={selectLink()}>
          Music
        </NavLink>
      </div>
      <div>
        <NavLink to="/settings" className={selectLink()}>
          Settings
        </NavLink>
      </div>

      {/* <div className={s.friends}>
        <Friends friends={store.getState().navbar.friends} />
      </div> */}
    </nav>
  );
};
export default Navbar;
