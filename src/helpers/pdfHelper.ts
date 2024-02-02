export const pdfPhoneFormat = (phone: string) => {
  if (phone.length === 10) {
    return `(${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6,10)}`;
  }
  return phone;
}
