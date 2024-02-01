import { GridValueFormatterParams } from "@mui/x-data-grid";

export const phoneFormat = (params: GridValueFormatterParams<number>) => {
  const phone = params.value.toString();
  if (phone.length === 10) {
    return `(${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6,10)}`;
  }
  return params.value;
}
