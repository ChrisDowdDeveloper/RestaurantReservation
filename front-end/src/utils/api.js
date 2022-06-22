/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "https://restaurantreservation-backend.herokuapp.com";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();
    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

/**
 * Retrieves all existing reservation.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

/*
  -Supposed to take the parameters that are added, and fetch the JSON from the backend with the parameters
  -SHOULD* return the list of reservations that are made for the current date.
*/

export async function listReservations(params, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`)
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  )
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime)
}

/**
  -Creates a reservation and saves it to the database.
  -Must have a validation
  -@param form
    the form to save
  -@param signal
    optional AbortController.signal
 * @returns {Promise<deck>}
 *  a promise that resolves the saved deck, which will now have an `id` property.
 */


//Calls the API to create a reservation
export async function createReservation(form, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`)
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: form }),
    signal,
  };
  return await fetchJson(url, options);
}

//Calls the API to get the correct reservation by the reservation ID
export async function readReservation(reservation_id, signal) {
  const url = `${API_BASE_URL}/reservations/${reservation_id}`
  return await fetchJson(url, { signal });
}

//Calls the API to return all the tables
export async function listTables(signal) {
  const url = `${API_BASE_URL}/tables`
  return await fetchJson(url, { headers, signal }, []);
}

///Calls the API to create a table
export async function createTable(tableForm, signal) {
  const url = `${API_BASE_URL}/tables`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: tableForm }),
    signal,
  };
  return await fetchJson(url, options, {});
}

//Calls the API to update a table status to "occupied"
export async function seatTable(table_id, reservation_id, signal) {
  const url = `${API_BASE_URL}/tables/${table_id}/seat`;
  return await fetchJson(
    url,
    {
      body: JSON.stringify({ data: { reservation_id } }),
      headers,
      method: "PUT",
      signal,
    },
    []
  );
}

//Calls the API to update the reservation by the reservation ID
export async function updateReservation(newFormData, reservation_id, signal) {
  const url = `${API_BASE_URL}/reservations/${reservation_id}`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: newFormData }),
    signal,
  };
  return await fetchJson(url, options, {});
}

//Calls the API to search the reservation by the mobile number associated with it
export async function searchReservation(number, signal) {
  const url = `${API_BASE_URL}/reservations?mobile_number=${number}`;
  return await fetchJson(url, { signal });
}

//Calls the API to update the status of the reservation to "seated" or "finished"
export async function updateStatus(reservation_id, newStatus, signal) {
  const url = `${API_BASE_URL}/reservations/${reservation_id}/status`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: { status: newStatus } }),
    signal,
  };
  return await fetchJson(url, options, {});
}

//Calls the API to update the table status back to "Free"
export async function deleteTableStatus(table_id, signal) {
  const url = `${API_BASE_URL}/tables/${table_id}/seat`;
  return await fetch(url, { headers, method: "DELETE", signal }, []);
};