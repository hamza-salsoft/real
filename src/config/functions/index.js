import moment from "moment";

export const ImageUrl = (image) => {
  let { PUBLIC_URL } = process.env;
  return `${PUBLIC_URL}/images/${image}`;
};

export const formatDateTime = (dateTimeString) => {
  const date = moment(dateTimeString);
  const timeString = date.utc().format("HH:mm:ss");
  const dateString = date.utc().format("YYYY-MM-DD");
  return `${timeString} ${dateString}`;
};

export function createQueryString(params) {
  try {
    return new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null && v != ''))
    ).toString();
  } catch (error) {
    console.log(error)
  }
}