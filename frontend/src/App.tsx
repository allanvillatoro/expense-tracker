import "./Styles.css";
import { ExpensesPage } from "./expenses/ExpensesPage";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { MonthlyReportPage } from "./home/MonthlyReportPage";
import { CategoriesPage } from "./categories/CategoriesPage";
import { LoginPage } from "./users/LoginPage";
import { RegisterPage } from "./users/RegisterPage";
import { logout } from "./users/usersSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "./hooks/hooks";
import { clearExpenses } from "./expenses/expensesSlice";
import { clearCategories } from "./categories/categoriesSlice";

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
      <BrowserRouter>
        <header>
          {isLoggedIn && (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
              <div className="container-fluid">
                <a className="navbar-brand" href="#">
                  ExpenseTracker
                </a>
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
                <>{isLoggedIn ? <MonthlyReportPage /> : <LoginPage />}</>
              }
            />
            <Route
              path="/expenses"
              element={<>{isLoggedIn ? <ExpensesPage /> : <LoginPage />}</>}
            />
            <Route
              path="/categories"
              element={<>{isLoggedIn ? <CategoriesPage /> : <LoginPage />}</>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
