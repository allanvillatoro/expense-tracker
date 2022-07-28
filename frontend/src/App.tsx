import React from "react";
import "./Styles.css";
import { ExpensesPage } from "./expenses/ExpensesPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { MonthlyReportPage } from "./home/MonthlyReportPage";
import { CategoriesPage } from "./categories/CategoriesPage";
import { LoginPage } from "./users/LoginPage";
import { RegisterPage } from "./users/RegisterPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <header>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <Link className="nav-link active" to="/">
                    Home
                  </Link>
                  <Link className="nav-link" to="/expenses">
                    Expenses
                  </Link>
                  <Link className="nav-link" to="/categories">
                    Categories
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<MonthlyReportPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
