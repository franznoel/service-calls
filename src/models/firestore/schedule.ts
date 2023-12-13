import { firestoreDb } from "../../config/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";

export interface iAssignedEmployee {
  id?: string
  timeFrom: string
  timeTo: string
  employeeId: string
  fullName: string
  firstCall: string
  secondCall: string
  title: string
}

export interface iSchedule {
  date: string
  employeeSchedules?: iAssignedEmployee[]
}

export enum Departments {
  ANESTHESIA = "Anesthesia",
  LABOR_AND_DELIVERY = "Labor and Delivery",
  OPERATING_ROOM = "Operating Room",
  PACU = 'Operating Room Staff/PACU',
  RECOVERY_ROOM = 'Recovery Room Staff',
}

export const saveSchedule = async (data: iSchedule) => {
  const schedulesRef = doc(firestoreDb, "schedules", data.date);
  const scheduleRef = await setDoc(schedulesRef, data);
  return scheduleRef;
}

export const getSchedulesByDate = (date: string) => {
  const schedulesRef = doc(firestoreDb, "schedules", date);
  return getDoc(schedulesRef);
}
