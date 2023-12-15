import { firestoreDb } from "../../config/firebase";
import { setDoc, doc, getDoc, getDocs, collection } from "firebase/firestore";

export interface iAssignedEmployee {
  id?: string
  department: string
  timeFrom: string
  timeTo: string
  employeeId: string
  fullName: string
  firstCall: string
  secondCall: string
  position: string
}

export interface iSchedule {
  date: string
  employeeSchedules?: iAssignedEmployee[]
}

export enum Departments {
  ANESTHESIA = "Anesthesia",
  LABOR_AND_DELIVERY = "Labor and Delivery",
  OPERATING_ROOM = "Operating Room",
  PACU = 'OR Staff and PACU',
  RECOVERY_ROOM = 'Recovery Room Staff',
}

export const saveSchedule = (date: string, data: iAssignedEmployee) => {
  const schedulesRef = doc(firestoreDb, "schedules", date, data.department, data.employeeId);
  return setDoc(schedulesRef, data);
}

export const getDepartmentSchedulesByDate = async (date: string, department: string) => {
  const departmentSchedulesRef = getDocs(collection(firestoreDb, "schedules", date, department))
    .then((departmentSchedSnap) => {
      if (departmentSchedSnap.empty) {
        return [];
      }
      return departmentSchedSnap.docs.map((doc) => doc.data() as iAssignedEmployee)
    });
  return departmentSchedulesRef;

}
