/**
 * @returns Today's date formatted as DD-MM-YYYY
 */
export function generateDate() {
  const date = new Date();

  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate();

  let newDate = `${day}-${month}-${year}`;
  return newDate;
}
