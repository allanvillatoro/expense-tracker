import React from "react";
import { useAppSelector } from "../hooks/hooks";

export const MonthlyReportPage = () => {
  const isLoggedIn = useAppSelector((state) => state.users.isLoggedIn);
  const loggedUser = useAppSelector((state) => state.users.user);

  return (
    <div className="pageContainer">
      <h2 className="text-center">MonthlyReportPage</h2>
      {isLoggedIn && <h3 className="text-center">Welcome, {loggedUser?.fullName} </h3>}
    </div>
  );
};
