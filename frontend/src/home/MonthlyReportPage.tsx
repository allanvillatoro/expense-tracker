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
import { useEffect, useRef, useState } from "react";
import { getExpensesByUser } from "../expenses/expensesSlice";
import { getCategoriesByUser } from "../categories/categoriesSlice";
import { Expense } from "../interfaces/Expense";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface IDictionary {
  [key: string]: Expense[];
}

export const MonthlyReportPage = () => {
  const isLoggedIn = useAppSelector((state) => state.users.isLoggedIn);
  const loggedUser = useAppSelector((state) => state.users.user);
  const categories = useAppSelector((state) => state.categories.categories);
  const expenses = useAppSelector((state) => state.expenses.expenses);
  const expensesStatus = useAppSelector((state) => state.expenses.status);
  const categoriesStatus = useAppSelector((state) => state.categories.status);
  const dispatch = useAppDispatch();

  const selectedMonth = useRef("");
  const [sumExpensesByMonth, setSumExpensesByMonth] = useState<IDictionary>({});
  const [months, setMonths] = useState<string[]>([""]);

  let tempLabels = ["food"];
  let tempTotalExpensesForCategories = tempLabels.map((value, index) => 0);
  let tempBudgetsForCategories = [0];
  const [labels, setLabels] = useState(tempLabels);
  const [totalExpensesForCategories, setTotalExpensesForCategories] = useState(
    tempTotalExpensesForCategories
  );
  const [budgetsForCategories, setBudgetsForCategories] = useState(
    tempBudgetsForCategories
  );

  const [alarms, setAlarms] = useState<string[]>([]);

  const [chartData, setChartData] = useState({
    labels,
    datasets: [
      {
        label: "Expenses",
        data: totalExpensesForCategories,
        backgroundColor: "rgba(58, 162, 178, 0.5)",
      },
      {
        label: "Budget",
        data: budgetsForCategories,
        backgroundColor: "rgba(24, 38, 169, 0.5)",
      },
    ],
  });

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

  const generateMonthsList = () => {
    //sums up expenses by month
    let tempSumExpensesByMonth: IDictionary = {};

    //months label for the select (option)
    let tempMonths: string[] = [];

    //sorting array without mutating
    let sortedExpenses = [...expenses].sort((a, b) => {
      var dateA = new Date(a.date).getTime();
      var dateB = new Date(b.date).getTime();
      return dateA < dateB ? 1 : -1; // ? -1 : 1 for ascending/increasing order
    });

    sortedExpenses.forEach((expense, index) => {
      let date: Date = new Date(expense.date);
      const monthString = date.toLocaleString("default", { month: "short" });
      const year = date.getFullYear();
      const monthYear = `${year} - ${monthString}`;

      //Add a new label to the months array if doesn't exist yet
      if (tempMonths.findIndex((month) => month === monthYear) < 0)
        tempMonths = [...tempMonths, monthYear];

      //it creates the key/value pair for the expenses total if it doesn't exist yet
      if (!tempSumExpensesByMonth[monthYear]) {
        tempSumExpensesByMonth[monthYear] = [];
      }
      //adds to the accumulator
      tempSumExpensesByMonth[monthYear] = [
        ...tempSumExpensesByMonth[monthYear],
        expense,
      ];
    });
    setMonths(tempMonths);
    setSumExpensesByMonth(tempSumExpensesByMonth);

    let tempLabels = categories.map((category) => category.name);
    let tempBudgetsForCategories = categories.map(
      (category: Category, index) => category.budget
    );
    setLabels(tempLabels);
    setBudgetsForCategories(tempBudgetsForCategories);
  };

  const generateMonthlyReports = () => {
    let categoriesByMonth: string[] = [];
    //loading data to the chart
    if (selectedMonth.current !== "") {
      sumExpensesByMonth[selectedMonth.current].forEach(
        (currentExpense, index) => {
          if (
            categoriesByMonth.findIndex(
              (category) => category === currentExpense.categoryName
            ) < 0
          )
            categoriesByMonth = [
              ...categoriesByMonth,
              currentExpense.categoryName,
            ];
        }
      );

      let sumByCategory: number[] = [];
      let budgetByCategory: number[] = [];
      let alerts: string[] = [];

      //calculating current month
      const selectedDate = new Date(selectedMonth.current.replace(" - ", ", "));
      const currentDate = new Date();

      //these are the unique categories
      categoriesByMonth.forEach((currentCategory) => {
        //retrieve expenses from the same category
        let sameCategoryExpensesArray: Expense[] = sumExpensesByMonth[
          selectedMonth.current
        ].filter((current, index) => current.categoryName === currentCategory);

        //it accumulates all the expenses amount of the same category
        const totalExpensesForCurrentCategory =
          sameCategoryExpensesArray.reduce(
            (previousExpense: number, currentExpense: Expense) =>
              previousExpense + currentExpense.amount,
            0
          );

        //gets the budget for the category
        const categoryFound = categories.find(
          (current: Category) => current.name === currentCategory
        );

        if (categoryFound) {
          budgetByCategory.push(categoryFound.budget);

          //for current month
          if (
            selectedDate.getMonth() === currentDate.getMonth() &&
            selectedDate.getFullYear() &&
            currentDate.getFullYear()
          ) {
            if (
              totalExpensesForCurrentCategory >=
              categoryFound.budget * (categoryFound.alarmThreshold / 100)
            ) {
              alerts.push("You are spending so much on " + currentCategory);
            }
          }
          //for other months
          else if (totalExpensesForCurrentCategory >= categoryFound.budget) {
            alerts.push("You spent too much on " + currentCategory);
          }
        } else {
          budgetByCategory.push(0);
        }
        sumByCategory.push(totalExpensesForCurrentCategory);
      });
      setLabels([...categoriesByMonth]);
      setTotalExpensesForCategories([...sumByCategory]);
      setBudgetsForCategories([...budgetByCategory]);
      setAlarms(alerts);
    }
  };

  useEffect(() => {
    setChartData({
      labels,
      datasets: [
        {
          label: "Expenses",
          data: totalExpensesForCategories,
          backgroundColor: "rgba(58, 162, 178, 0.5)",
        },
        {
          label: "Budget",
          data: budgetsForCategories,
          backgroundColor: "rgba(24, 38, 169, 0.5)",
        },
      ],
    });
  }, [labels, totalExpensesForCategories, budgetsForCategories]);

  useEffect(() => {
    //const userId = "62e01522afcf618b284ee5d4";
    if (categoriesStatus === "idle") {
      dispatch(getCategoriesByUser(loggedUser._id));
    }
    if (expensesStatus === "idle") {
      dispatch(getExpensesByUser(loggedUser._id));
    }
    if (expensesStatus === "succeeded" && categoriesStatus === "succeeded") {
      generateMonthsList();
    }
  }, [categoriesStatus, dispatch, expensesStatus, loggedUser._id]);

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    selectedMonth.current = value;
    generateMonthlyReports();
  };

  return (
    <div className="pageContainer">
      <br />
      {isLoggedIn && (
        <h3 className="text-center" style={{paddingBottom: 20}}>Welcome, {loggedUser?.fullName} </h3>
      )}
      <div className="col-12 col-lg-8 offset-lg-2 chartContainer">
        <div style={{ alignSelf: "end" }}>
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
              <option key={month.toString()} value={month.toString()}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <Bar options={options} data={chartData} />
        <div className="text-center">
          {alarms.length > 0 &&
            alarms.map((alert) => (
              <div key={alert}>
                <span>{alert}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
