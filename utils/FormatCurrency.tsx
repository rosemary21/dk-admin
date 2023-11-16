import { format } from "number-currency-format";

export default function formatCurrency(number: number) {
  return format(number, {
    currency: "₦",
    spacing: false,
    currencyPosition: "LEFT",
  });
}
