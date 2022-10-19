import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";
import BoardStaff from "./components/board-staff.component";
import BoardVolunteer from "./components/board-volunteer.component";
import BoardCompany from "./components/board-company.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showCompanyBoard: false,
      showVolunteerBoard: false,
      showStaffBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showCompanyBoard: user.roles.includes("ROLE_COMPANY"),
        showVolunteerBoard: user.roles.includes("ROLE_VOLUNTEER"),
        showStaffBoard: user.roles.includes("ROLE_STAFF"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showCompanyBoard: false,
      showVolunteerBoard: false,
      showStaffBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showAdminBoard, showStaffBoard, showVolunteerBoard, showCompanyBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            ak-maj
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {showStaffBoard && (
              <li className="nav-item">
                <Link to={"/staff"} className="nav-link">
                  Staff Board
                </Link>
              </li>
            )}

            {showVolunteerBoard && (
              <li className="nav-item">
                <Link to={"/volunteer"} className="nav-link">
                  Volunteer Board
                </Link>
              </li>
            )}

            {showCompanyBoard && (
              <li className="nav-item">
                <Link to={"/company"} className="nav-link">
                  Company Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path="/staff" element={<BoardStaff />} />
            <Route path="/volunteer" element={<BoardVolunteer />} />
            <Route path="/company" element={<BoardCompany />} />
          </Routes>
        </div>
      </div>
    );
  }
}
export default App;