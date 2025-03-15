import logo from "../assets/logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { isUserLoggedIn, logout } from "../service/AuthApiService";
import { toast } from "react-toastify";

const HeaderComponent = () => {
  const isAuth = isUserLoggedIn();
  const navigate = useNavigate();

  function handleLogout() {
    try {
      logout(); 
      toast.dismiss()
      toast.success("Logged Out successfully!");
      navigate("/login");
    } catch (error) {
      toast.dismiss()
      toast.error("Error logging out! Please try again.");
      console.error("Logout error:", error);
    }
  }

  return (
    <div>
      <nav className="fixed-top navbar navbar-expand-lg navbar-light bg-dark ">
        <div className="container ">
          <NavLink className="navbar-brand" to="/">
            <img src={logo} alt="logo" width={100} height={50} />
          </NavLink>
          {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}

          <ul className="navbar-nav gap-4 d-flex justify-content-between align-items-center   flex-row">
            {isAuth && (
              <li className="nav-item">
                <NavLink className="nav-link " to="/Tasks">
                  Tasks
                </NavLink>
              </li>
            )}
            {isAuth && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/completed">
                  Completed Task
                </NavLink>
              </li>
            )}
            {!isAuth && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/create-account">
                  Sing Up
                </NavLink>
              </li>
            )}
            {!isAuth && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
            )}
            {isAuth && (
              <li className="nav-item">
                <button
                  className="logout bg-danger py-2 px-4  w-100" 
                  onClick={handleLogout}
                  style={{ backgroundColor: "transparent", border: "none" }} 
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default HeaderComponent;
