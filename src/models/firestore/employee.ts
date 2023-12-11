import { firestoreDb } from "../../config/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

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

export const getEmployees = async () => {
  const employeesRef = collection(firestoreDb, "employees");
  const employeesSnapshot = await getDocs(employeesRef);
  const employees: any[] = [];
  employeesSnapshot.forEach((employee) => {
    employees.push({
      id: employee.id,
      ...employee.data(),
    });
  });
  return employees;
}
