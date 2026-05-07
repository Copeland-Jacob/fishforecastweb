export default function numToTime(num: number) {
  let morning: Boolean;
  let time: String;

  if (num > 12) {
    num -= 12;
    morning = false;
  } else {
    morning = true;
  }

  if (num === 0) num = 12;

  let string = num.toString();

  if (morning) {
    time = string + " AM";
  } else {
    time = string + " PM";
  }

  return time;
}
