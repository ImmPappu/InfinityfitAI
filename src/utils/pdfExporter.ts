import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { UserProfile, HealthCalculations } from '../types';

export async function exportHealthReportPdf(profile: UserProfile, metrics: HealthCalculations) {
  const element = document.getElementById('printable-health-report');
  if (element) {
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`InfinityfitAI_Health_Report_${profile.name.replace(/\s+/g, '_')}.pdf`);
      return;
    } catch (err) {
      console.error('HTML canvas export failed, falling back to window.print()', err);
    }
  }

  // Fallback to window print
  window.print();
}
