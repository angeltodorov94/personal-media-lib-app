const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Formats a TMDB "YYYY-MM-DD" string as "10 Sep 2026". Parsed by hand so the
// timezone can't shift the day.
export function formatDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number);

  if (!year || !month || !day) {
    return date;
  }

  return `${day} ${MONTHS[month - 1]} ${year}`;
}
