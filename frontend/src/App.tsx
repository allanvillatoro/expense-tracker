import "./Styles.css";
import { ExpensesPage } from "./expenses/ExpensesPage";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { MonthlyReportPage } from "./home/MonthlyReportPage";
import { CategoriesPage } from "./categories/CategoriesPage";
import { LoginPage } from "./users/LoginPage";
import { RegisterPage } from "./users/RegisterPage";
import { logout } from "./users/usersSlice";
import { clearExpenses } from "./expenses/expensesSlice";
import { clearCategories } from "./categories/categoriesSlice";
import { AboutPage } from "./about/AboutPage";
import { useDispatch } from "react-redux";
import { useAppSelector } from "./hooks/hooks";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useAppSelector((state) => state.users.isLoggedIn);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearExpenses());
    dispatch(clearCategories());
  };

  return (
    <div>
        <header>
          {isLoggedIn && (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
              <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                  ExpenseTracker
                </Link>
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
                <div
                  className="collapse navbar-collapse"
                  id="navbarNavAltMarkup"
                >
                  <div className="navbar-nav me-auto mb-2 mb-lg-0">
                    <Link className="nav-link active" to="/">
                      Home
                    </Link>
                    <Link className="nav-link" to="/expenses">
                      Expenses
                    </Link>
                    <Link className="nav-link" to="/categories">
                      Categories
                    </Link>
                    <Link className="nav-link" to="/about">
                      About
                    </Link>
                  </div>
                  <form className="d-flex" role="search">
                    <button
                      onClick={handleLogout}
                      className="btn btn-primary"
                      type="submit"
                    >
                      Log out
                    </button>
                  </form>
                </div>
              </div>
            </nav>
          )}
        </header>
        <div className="container">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <MonthlyReportPage />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="/expenses"
              element={
                isLoggedIn ? <ExpensesPage /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="/categories"
              element={
                isLoggedIn ? (
                  <CategoriesPage />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="/about"
              element={
                isLoggedIn ? <AboutPage /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="*"
              element={
                <h3 className="text-center">This page is not available</h3>
              }
            />
          </Routes>
        </div>
    </div>
  );
}

export default App;
