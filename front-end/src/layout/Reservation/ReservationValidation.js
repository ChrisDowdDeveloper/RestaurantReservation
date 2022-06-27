export default function ReservationValidation(reservation) {
    const reservationDate = reservation.reservation_date;
    const reservationTime = reservation.reservation_time;
    const errors = [];

    const dateToCheck = new Date(`${reservationDate} 00:00`)
    if (dateToCheck.getDay() === 2) errors.push(new Error("Restaurant is closed on Tuesday's."))

    if (reservationTime < '10:30' && reservationTime > '21:30') errors.push(new Error("Reservation cannot be made before 10:30am and after 9:30pm"))

    const isFuture = new Date(`${reservation.reservation_date} ${reservation.reservation_time} CST`);
    if (Date.now() > isFuture.getTime()) errors.push(new Error("Reservations cannot be made for a time in the past"))

    return errors;
}