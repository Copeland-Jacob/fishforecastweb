export default function epochToDay(e: number) {
  const epoch = e + 172800;
  const date = new Date(epoch * 1000);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayOfWeek = days[date.getDay()];

  return dayOfWeek;
}
