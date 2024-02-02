export const pdfPhoneFormat = (phone: string) => {
  if (phone.length === 10) {
    return `(${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6,10)}`;
  }
  return phone;
}


export const convertTime12to24 = (time12h: string): any[] => {
  let [hours, minutes, modifier] = time12h.split(/\W+/);

  if (hours === "12") hours = "00";
  if (modifier === "PM") hours = (parseInt(hours, 10) + 12).toString();

  return [hours, minutes];
};
