export const priceToString = (price = "") => {
  return price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
};
