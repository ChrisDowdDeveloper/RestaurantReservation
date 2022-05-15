import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NewReservation from "./Reservation/NewReservation";
import EditReservation from "./Reservation/EditReservation";
import CreateTable from "../layout/Table/CreateTable";
import SeatTable from "./Table/SeatTable";
import Search from "./Search/Search";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";



/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/reservations/new">
        <NewReservation />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={today()} />
      </Route>
      <Route path="/tables/new">
        <CreateTable />
      </Route>
      <Route path={`/reservations/:reservation_id/seat`}>
        <SeatTable />
      </Route>
      <Route path={"/reservations/:reservation_id/edit"}>
        <EditReservation />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
