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

  //const [selectedMonth, setSelectedMonth] = useState<string>();
  const selectedMonth = useRef("")
  const [sumExpensesByMonth, setSumExpensesByMonth] = useState<IDictionary>({})
  
  //update this
  //let months: string[] = [""];
  const [months, setMonths] = useState<string[]>([""])

  let tempLabels = categories.map((category) => category.name);
  let tempTotalExpensesForCategories = tempLabels.map((value, index) => 0);
  let tempBudgetsForCategories = categories.map(
    (category: Category, index) => category.budget
  );
  const [labels, setLabels] = useState(tempLabels)
  const [totalExpensesForCategories, setTotalExpensesForCategories] = useState(tempTotalExpensesForCategories)
  const [budgetsForCategories, setBudgetsForCategories] = useState(tempBudgetsForCategories)

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
  })

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
    console.log("generateMonthsList");
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
    console.log("setSumExpensesByMonth");
    console.log(tempSumExpensesByMonth);
    setSumExpensesByMonth(tempSumExpensesByMonth);
  }

  const generateMonthlyReports = () => {
    console.log('generateMonthlyReports');
    let categoriesByMonth: string[] = [];
    //loading data to the chart
    console.log('selectedMonth');
    console.log(selectedMonth);

    console.log('sumExpensesByMonth');
    console.log(sumExpensesByMonth);

    if (selectedMonth.current !== "") {
      console.log(sumExpensesByMonth[selectedMonth.current]);
      sumExpensesByMonth[selectedMonth.current].forEach((currentExpense, index) => {
        if (
          categoriesByMonth.findIndex(
            (category) => category === currentExpense.categoryName
          ) < 0
        )
          categoriesByMonth = [
            ...categoriesByMonth,
            currentExpense.categoryName,
          ];
      });

      console.log(categoriesByMonth);
      let sumByCategory: number[] = [];
      let budgetByCategory: number[] = [];

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
        } else {
          budgetByCategory.push(0);
        }

        console.log(sameCategoryExpensesArray);
        console.log(totalExpensesForCurrentCategory);

        sumByCategory.push(totalExpensesForCurrentCategory);
      });

      //
      console.log("total");
      console.log(categoriesByMonth);
      console.log(sumByCategory);
      console.log(budgetByCategory);

      setLabels([...categoriesByMonth]);
      setTotalExpensesForCategories([...sumByCategory]);
      setBudgetsForCategories([...budgetByCategory]);
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
    })
  }, [labels,totalExpensesForCategories,budgetsForCategories])
  
  useEffect(() => {
    console.log('useEffect');
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
    //setSelectedMonth(value);
    selectedMonth.current = value;
    generateMonthlyReports();
  };

  return (
    <div className="pageContainer">
      <br />
      {isLoggedIn && (
        <h3 className="text-center">Welcome, {loggedUser?.fullName} </h3>
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
      </div>
    </div>
  );
};
