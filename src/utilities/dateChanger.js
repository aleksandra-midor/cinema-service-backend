const dateChanger = () => {

  const today = new Date("2020-11-17T23:00:00.000Z") // daje pełną datę
  const weekday = today.getDay() // daje numer dnia tygodnia
  const dayMs = 86400000
  let week = []

  for (let i = 1; i <=7; i++) {
    if (i < weekday) {
      week.push((new Date(Date.parse(today) + (i + 7 - weekday) * dayMs)).toISOString().slice(0, 10))
    } else if (i === weekday) {
      week.push(today.toISOString().slice(0, 10))
    } else {
      week.push((new Date(Date.parse(today) + (i - weekday) * dayMs))
      .toISOString().slice(0, 10))
    }
  }
  console.log(week);
  return week
} 

module.exports = dateChanger;