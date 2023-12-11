import { firestoreDb } from "../../config/firebase";
import { setDoc, collection, doc, getDocs } from "firebase/firestore";

interface iAssignedEmployee {
  timeFrom: string
  timeTo: string
  employeeId: string
}

interface iSchedule {
  date: string
  anesthesia?: iAssignedEmployee[]
  laborAndDelivery?: iAssignedEmployee[]
  operatingRoom?: iAssignedEmployee[]
  pacu?: iAssignedEmployee[]
  recoveryRoom?: iAssignedEmployee[]
}

export const saveSchedule = async (data: iSchedule) => {
  const schedulesRef = doc(firestoreDb, "schedules", data.date);
  const scheduleRef = await setDoc(schedulesRef, data);
  return scheduleRef;
}

export const getSchedules = async () => {
  const schedulesRef = collection(firestoreDb, "schedules");
  const schedulesSnapshot = await getDocs(schedulesRef);
  const schedules: any[] = [];
  schedulesSnapshot.forEach((schedule) => {
    schedules.push({
      id: schedule.id,
      ...schedule.data(),
    });
  });
  return schedules;
}
