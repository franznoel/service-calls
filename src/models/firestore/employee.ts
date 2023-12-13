import { firestoreDb } from "../../config/firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, getDoc } from "firebase/firestore";

export interface iEmployee {
  fullName: string
  phone1: string
  phone2: string
  employmentStatus: string
}

export interface iSearch {
  id: string
  label: string
}

export const saveEmployee = async (data: iEmployee) => {
  const employeeRef = await addDoc(collection(firestoreDb, "employees"), data);
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

export const getEmployeeById = async (id: string) => {
  const employeeRef = doc(firestoreDb, "employees", id);
  const employeeSnap = await getDoc(employeeRef);
  return employeeSnap.data();
}

export const deleteEmployee = async (id: string) => {
  await deleteDoc(doc(firestoreDb, "employees", id));
}

export const searchEmployee = async (searchValue: null|iSearch) => {
  if (!searchValue) return [];
  const employeesRef = collection(firestoreDb, "employees");
  const employeesSnapshot = await getDocs(employeesRef);
  const employees: any[] = [];
  employeesSnapshot.forEach((employee) => {
    if (employee.data().fullName.toLowerCase().includes(searchValue?.label.toLowerCase())) {
      if (employees.length < 10) {
        employees.push({
          id: employee.id,
          label: employee.data().fullName,
        });
      }
    }
  });
  return employees;
}
