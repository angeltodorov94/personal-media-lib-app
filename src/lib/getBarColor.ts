export const getBarColor = (v: number) => {
  if (v >= 70) return "green";
  if (v >= 60) return "yellow";

  return "error";
};
