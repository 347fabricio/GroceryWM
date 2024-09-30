import { getUnixTime } from "https://cdn.jsdelivr.net/npm/date-fns@4.1.0/+esm";

class ExpiredProducts {
  todaysDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    return new Date(`${year}/${month}/${day}`);
  }

  isProductExpired(today, expiresOn) {
    return (getUnixTime(expiresOn) - getUnixTime(today)) / (60 * 60 * 24);
  }
}

export const expiredProducts = new ExpiredProducts();
