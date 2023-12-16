import jsPdf from 'jspdf';
import autoTable from 'jspdf-autotable';

const pdfScheduleReport = new jsPdf('l', 'in', [8.5, 11]);
autoTable(pdfScheduleReport, {
  head: [['Name', 'Email', 'Country']],
  body: [
    ['David', 'david@example.com', 'Sweden'],
    ['Castille', 'castille@example.com', 'Spain'],
  ],
})

export default pdfScheduleReport;
