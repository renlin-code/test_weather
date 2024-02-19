export const getDateWeekDay = (date: string | Date): string => {
  const objDate = new Date(date);
  const weekDays = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  return weekDays[objDate.getDay()];
};
