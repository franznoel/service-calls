import { Dayjs } from 'dayjs';
import jsPdf, { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Departments, getDepartmentSchedulesByDate, iAssignedEmployee } from '../models/firestore/schedule';
import { bottomNote, bottomMidNote, bottomLeftNote, bottomRightNote } from '../config/notes';

const createFields = (doc: jsPDF, startY: number) => {
  // Staffing
  doc.setLineWidth(0.01);
  doc.line(0.5, startY, 5.5, startY);

  doc.setFontSize(8);
  doc.setTextColor(0, 0, 0);
  doc.text('STAFFING', startY, 0.65);

  // Communication
  doc.setLineWidth(0.01);
  doc.line(6, startY, 10.5, startY);

  doc.setFontSize(8);
  doc.setTextColor(0, 0, 0);
  doc.text('COMMUNICATION', 6, 0.65);
}

const createTitle = (doc: jsPDF, startY: number) => {
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text('IN HOUSE AND PERIOPERATIVE SERVICE CALL SCHEDULE', 3, startY);
}

const createDate = (doc: jsPDF, startY: number, date: Dayjs) => {
  const dateString = date.format('MMMM D, YYYY');
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(`DATE: ${dateString}`, 0.5, startY);

  const dayOfWeekString = date.format('dddd');
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(`DAY: ${dayOfWeekString}`, 5.5, startY);
}

const getBody = (assignedEmployees: iAssignedEmployee[]) => {
  const body = assignedEmployees.map((schedule) => [
    schedule.timeFrom,
    schedule.timeTo,
    schedule.position,
    schedule.fullName,
    schedule.firstCall,
    schedule.secondCall,
    '',
    ''
  ]);
  return body ?? [];
}

const generateTable = async(doc: jsPDF, dateString: string, startY: number) => {
  const header = ['Time From', 'Time To', 'Position', 'Name', '1st Call', '2nd Call', 'Called By', 'Time Responded'];
  const [anesthesiaSchedule, laborSchedule, orSchedule, pacuSchedule, recoverySchedule] = await Promise.all([
    getDepartmentSchedulesByDate(dateString, Departments.ANESTHESIA),
    getDepartmentSchedulesByDate(dateString, Departments.LABOR_AND_DELIVERY),
    getDepartmentSchedulesByDate(dateString, Departments.OPERATING_ROOM),
    getDepartmentSchedulesByDate(dateString, Departments.PACU),
    getDepartmentSchedulesByDate(dateString, Departments.RECOVERY_ROOM),
  ]);

  const anesthesiaBody = getBody(anesthesiaSchedule);
  const laborBody = getBody(laborSchedule);
  const orBody = getBody(orSchedule);
  const pacuBody = getBody(pacuSchedule);
  const recoveryBody = getBody(recoverySchedule);

  autoTable(doc, {
    head: [header],
    body: [
      [{ content: Departments.ANESTHESIA, colSpan: 8, styles: { halign: 'left', fillColor: '#efefef' }}],
      ...anesthesiaBody,
      [{ content: Departments.LABOR_AND_DELIVERY, colSpan: 8, styles: { halign: 'left', fillColor: '#efefef' }}],
      ...laborBody,
      [{ content: Departments.OPERATING_ROOM, colSpan: 8, styles: { halign: 'left', fillColor: '#efefef' }}],
      ...orBody,
      [{ content: Departments.PACU, colSpan: 8, styles: { halign: 'left', fillColor: '#efefef' }}],
      ...pacuBody,
      [{ content: Departments.RECOVERY_ROOM, colSpan: 8, styles: { halign: 'left', fillColor: '#efefef' }}],
      ...recoveryBody,
    ],
    theme: 'grid',
    startY: startY + 0.05,
    // tableWidth: 8,
    headStyles: { fontSize: 8 },
    bodyStyles: {
      lineWidth: 0.001,
    }
  });
}

const createNote = (doc: jsPDF, { note, startX, startY, fontSize }: any) => {
  doc.setFontSize(fontSize).setLineHeightFactor(1);
  doc.text(note, startX, startY + 0.60);
}

const saveScheduleReport = async (date: Dayjs) => {
  const dateString = date.format('YYYY-MM-DD');
  const pdfScheduleReport = new jsPdf('l', 'in', [8.5, 11]);

  createFields(pdfScheduleReport, 0.5);
  createTitle(pdfScheduleReport, 0.9);
  createDate(pdfScheduleReport, 1.15, date);

  await generateTable(pdfScheduleReport, dateString, 1.25);

  createNote(pdfScheduleReport, { note: bottomNote, startX: 0.6, startY: 5.8, fontSize: 6, lineHeight: 0.6 });
  createNote(pdfScheduleReport, { note: bottomLeftNote, startX: 0.6, startY: 6.25, fontSize: 8, lineHeight: 0.6 });
  createNote(pdfScheduleReport, { note: bottomMidNote, startX: 5.5, startY: 6.25, fontSize: 8, lineHeight: 0.6 });
  createNote(pdfScheduleReport, { note: bottomRightNote, startX: 8.75, startY: 6.25, fontSize: 8, lineHeight: 0.6 });

  pdfScheduleReport.save(`schedule-${date.format('YYYY-MM-DD')}.pdf`);
}

export default saveScheduleReport;
