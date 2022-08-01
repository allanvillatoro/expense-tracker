import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Category } from "../interfaces/Category";
import { useEffect, useState } from "react";
import { getExpensesByUser } from "../expenses/expensesSlice";
import { getCategoriesByUser } from "../categories/categoriesSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const MonthlyReportPage = () => {
  const isLoggedIn = useAppSelector((state) => state.users.isLoggedIn);
  const loggedUser = useAppSelector((state) => state.users.user);
  const categories = useAppSelector((state) => state.categories.categories);
  const expensesStatus = useAppSelector((state) => state.expenses.status);
  const categoriesStatus = useAppSelector((state) => state.categories.status);
  const dispatch = useAppDispatch();

  const [selectedMonth, setSelectedMonth] = useState<String>();

  useEffect(() => {
    //const userId = "62e01522afcf618b284ee5d4";
    if (expensesStatus === "idle") {
      dispatch(getExpensesByUser(loggedUser._id));
    }
    if (categoriesStatus === "idle") {
      dispatch(getCategoriesByUser(loggedUser._id));
    }
  }, [categoriesStatus, dispatch, expensesStatus, loggedUser._id]);

  let labels = categories.map((category) => category.name);

  //update this
  let months = ["january", "february", "march", "april"];
  let totalExpenses = labels.map((value, index) => index + 50);

  let budgets = categories.map((category: Category, index) => category.budget);

  const data = {
    labels,
    datasets: [
      {
        label: "Expenses",
        data: totalExpenses,
        backgroundColor: "rgba(58, 162, 178, 0.5)",
      },
      {
        label: "Budget",
        data: budgets,
        backgroundColor: "rgba(24, 38, 169, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Reports",
      },
    },
  };

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedMonth(value);
  };

  return (
    <div className="pageContainer">
      <br />
      {isLoggedIn && (
        <h3 className="text-center">Welcome, {loggedUser?.fullName} </h3>
      )}
      <div className="col-12 col-lg-8 offset-lg-2 chartContainer">
        <div style={{alignSelf: 'end'}}>
          <label htmlFor="selectMonth">Month:&nbsp;</label>
          <select
            id="selectMonth"
            aria-label="selectMonth"
            defaultValue={""}
            onChange={selectChange}
          >
            <option value="" disabled>
              Select a month
            </option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};
