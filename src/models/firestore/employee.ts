import { firestoreDb } from "../../config/firebase";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";

interface iEmployee {
  fullName: string
  phone1: string
  phone2: string
  employmentStatus: string
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

export const deleteEmployee = async (id: string) => {
  await deleteDoc(doc(firestoreDb, "employees", id));
}

export const searchEmployee = async (searchText: string) => {
  const employeesRef = collection(firestoreDb, "employees");
  const employeesSnapshot = await getDocs(employeesRef);
  const employees: any[] = [];
  employeesSnapshot.forEach((employee) => {
    if (employee.data().fullName.toLowerCase().includes(searchText.toLowerCase())) {
      if (employees.length < 10) {
        employees.push(employee.data().fullName);
      }
    }
  });
  return employees;
}
