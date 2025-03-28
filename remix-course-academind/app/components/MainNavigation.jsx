import { NavLink } from "@remix-run/react";

const MainNavigation = () => {
  return (
    <nav id="main-navigation">
        <ul>
            <li className="nav-item">
                <NavLink to='/index'> Home </NavLink>
            </li>

            <li className="nav-item">
                <NavLink to='/notes'> My Notes </NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default MainNavigation