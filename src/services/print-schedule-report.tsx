import { Dayjs } from 'dayjs';
import jsPdf, { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Departments, getDepartmentSchedulesByDate, iAssignedEmployee } from '../models/firestore/schedule';

const getHeader = (assignedEmployees: iAssignedEmployee[]) => {
  const header = Object.keys(assignedEmployees[0]);
  return header;
}

const getBody = (assignedEmployees: iAssignedEmployee[]) => {
  const body = assignedEmployees.map((schedule) => Object.values(schedule));
  return body;
}

const generateTable = async(pdfScheduleReport: jsPDF, dateString: string, departmentName: string) => {
  const schedule = await getDepartmentSchedulesByDate(dateString, departmentName);
  if (schedule.length === 0) {
    return;
  }
  // TODO: pdfScheduleReport.text(departmentName, 0.5, 0.5);
  const anesthesiaHeader = getHeader(schedule);
  const anesthesiaBody = getBody(schedule);
  autoTable(pdfScheduleReport, {
    head: [anesthesiaHeader],
    body: [...anesthesiaBody],
  });
}

const saveScheduleReport = async (date: Dayjs) => {
  const dateString = date.format('YYYY-MM-DD');
  const pdfScheduleReport = new jsPdf('l', 'in', [8.5, 11]);
  
  await generateTable(pdfScheduleReport, dateString, Departments.ANESTHESIA);
  await generateTable(pdfScheduleReport, dateString, Departments.LABOR_AND_DELIVERY);
  await generateTable(pdfScheduleReport, dateString, Departments.OPERATING_ROOM);
  await generateTable(pdfScheduleReport, dateString, Departments.PACU);
  await generateTable(pdfScheduleReport, dateString, Departments.RECOVERY_ROOM);

  pdfScheduleReport.save(`schedule-${date.format('YYYY-MM-DD')}.pdf`);
}

export default saveScheduleReport;
