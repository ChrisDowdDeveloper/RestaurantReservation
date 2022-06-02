import React, { useState } from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NewReservation from "./Reservation/NewReservation";
import EditReservation from "./Reservation/EditReservation";
import CreateTable from "./Tables/CreateTable";
import SeatTable from "./Tables/SeatTable";
import Search from "./Search/Search";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import useQuery from '../utils/useQuery'



/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const query = useQuery()
  const [date, setDate] = useState(query.get('date') || today())

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/reservations/new">
        <NewReservation date={today()} />
      </Route>
      <Route path={"/reservations/:reservation_id/edit"}>
        <EditReservation />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={date} setDate={setDate} />
      </Route>
      <Route exact={true} path={"/reservations/:reservation_id/seat"}>
        <SeatTable />
      </Route>
      <Route path={"/tables/new"}>
        <CreateTable />
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
