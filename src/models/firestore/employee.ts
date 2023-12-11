import { firestoreDb } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";

interface iEmployee {
  fullName: string
  phone1: string
  phone2: string
  employmentStatus: string
}

export const saveEmployee = async (data: iEmployee) => {
  const employeeRef = await addDoc(collection(firestoreDb, "employees"), data);
  console.log('employeeRef: ', employeeRef);
  return employeeRef;
}
