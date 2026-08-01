import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { UserProfile, HealthCalculations } from '../types';

export async function exportHealthReportPdf(profile: UserProfile, metrics: HealthCalculations) {
  const wrapper = document.getElementById('printable-health-report-wrapper');
  const report = document.getElementById('printable-health-report');
  const safeName = profile.name ? profile.name.replace(/\s+/g, '_') : 'User';
  const filename = `InfinityFitAI_Health_Report_${safeName}.pdf`;

  if (wrapper && report) {
    try {
      // Position off-screen so user never sees popups or screen flashes
      wrapper.style.display = 'block';
      wrapper.style.position = 'fixed';
      wrapper.style.left = '-9999px';
      wrapper.style.top = '0px';
      wrapper.style.width = '794px';
      wrapper.style.opacity = '1';

      await new Promise((resolve) => setTimeout(resolve, 50));

      const canvas = await html2canvas(report, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      wrapper.style.display = 'none';

      if (canvas && canvas.width > 0 && canvas.height > 0) {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });

        const pdfWidth = 210;
        const pdfHeight = 297;

        let renderWidth = pdfWidth;
        let renderHeight = (canvas.height * pdfWidth) / canvas.width;

        if (renderHeight > pdfHeight) {
          renderHeight = pdfHeight;
          renderWidth = (canvas.width * pdfHeight) / canvas.height;
        }

        const xOffset = (pdfWidth - renderWidth) / 2;
        const yOffset = (pdfHeight - renderHeight) / 2;

        pdf.addImage(imgData, 'PNG', xOffset, yOffset, renderWidth, renderHeight);
        pdf.save(filename);
        return;
      }
    } catch (err) {
      console.warn('Canvas export warning, executing native PDF generator fallback:', err);
      if (wrapper) wrapper.style.display = 'none';
    }
  }

  // Guaranteed fallback PDF generator if DOM capture is unavailable
  generateNativePdf(profile, metrics, filename);
}

function generateNativePdf(profile: UserProfile, metrics: HealthCalculations, filename: string) {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // Top Accent Bar
  pdf.setFillColor(34, 197, 94);
  pdf.rect(0, 0, 210, 6, 'F');

  // Title
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(22);
  pdf.setTextColor(17, 24, 39);
  pdf.text('InfinityFitAI Health Blueprint', 14, 20);

  pdf.setFontSize(10);
  pdf.setTextColor(107, 114, 128);
  pdf.text(`Personalized Clinical Biometric & Nutrition Report • Date: ${new Date().toLocaleDateString()}`, 14, 26);

  // Client Details Box
  pdf.setFillColor(248, 250, 252);
  pdf.setDrawColor(229, 231, 235);
  pdf.roundedRect(14, 32, 182, 22, 3, 3, 'FD');

  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(107, 114, 128);
  pdf.text('CLIENT NAME', 18, 39);
  pdf.text('AGE / GENDER', 60, 39);
  pdf.text('HEIGHT / WEIGHT', 105, 39);
  pdf.text('GOAL TARGET', 150, 39);

  pdf.setFontSize(11);
  pdf.setTextColor(17, 24, 39);
  pdf.text(profile.name || 'User', 18, 47);
  pdf.text(`${profile.age} Yrs / ${profile.gender.toUpperCase()}`, 60, 47);
  pdf.text(`${profile.heightCm} cm / ${profile.weightKg} kg`, 105, 47);
  pdf.setTextColor(34, 197, 94);
  pdf.text(`${profile.goal.toUpperCase()} (${profile.targetWeightKg}kg)`, 150, 47);

  // 3 Primary Metric Cards
  // BMI Card
  pdf.setFillColor(236, 253, 245);
  pdf.setDrawColor(167, 243, 208);
  pdf.roundedRect(14, 60, 57, 30, 3, 3, 'FD');
  pdf.setFontSize(8);
  pdf.setTextColor(107, 114, 128);
  pdf.text('BMI SCORE', 18, 66);
  pdf.setFontSize(20);
  pdf.setTextColor(4, 120, 87);
  pdf.text(`${metrics.bmi}`, 18, 76);
  pdf.setFontSize(9);
  pdf.text(`Healthy (${metrics.healthyWeightMin}-${metrics.healthyWeightMax}kg)`, 18, 84);

  // Calories Card
  pdf.setFillColor(255, 247, 237);
  pdf.setDrawColor(254, 215, 170);
  pdf.roundedRect(76, 60, 57, 30, 3, 3, 'FD');
  pdf.setFontSize(8);
  pdf.setTextColor(107, 114, 128);
  pdf.text('DAILY CALORIES', 80, 66);
  pdf.setFontSize(20);
  pdf.setTextColor(194, 65, 12);
  pdf.text(`${metrics.dailyCalories} kcal`, 80, 76);
  pdf.setFontSize(9);
  pdf.text(`BMR: ${metrics.bmr} | TDEE: ${metrics.tdee}`, 80, 84);

  // Water Card
  pdf.setFillColor(239, 246, 255);
  pdf.setDrawColor(191, 219, 254);
  pdf.roundedRect(138, 60, 58, 30, 3, 3, 'FD');
  pdf.setFontSize(8);
  pdf.setTextColor(107, 114, 128);
  pdf.text('WATER TARGET', 142, 66);
  pdf.setFontSize(20);
  pdf.setTextColor(29, 78, 216);
  pdf.text(`${metrics.idealWaterLiters} L`, 142, 76);
  pdf.setFontSize(9);
  pdf.text('Daily Hydration Goal', 142, 84);

  // Macronutrients Section
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(17, 24, 39);
  pdf.text('Macronutrient Daily Targets', 14, 100);

  const macros = [
    { label: 'PROTEIN', val: `${metrics.proteinGrams} g`, x: 14 },
    { label: 'CARBS', val: `${metrics.carbGrams} g`, x: 61 },
    { label: 'FATS', val: `${metrics.fatGrams} g`, x: 108 },
    { label: 'FIBER', val: `${metrics.fiberGrams} g`, x: 155 },
  ];

  macros.forEach((m) => {
    pdf.setFillColor(248, 250, 252);
    pdf.setDrawColor(229, 231, 235);
    pdf.roundedRect(m.x, 104, 42, 20, 2, 2, 'FD');
    pdf.setFontSize(8);
    pdf.setTextColor(107, 114, 128);
    pdf.text(m.label, m.x + 4, 111);
    pdf.setFontSize(13);
    pdf.setTextColor(17, 24, 39);
    pdf.text(m.val, m.x + 4, 120);
  });

  // Micronutrients Table
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(17, 24, 39);
  pdf.text('Essential Micronutrient Targets', 14, 135);

  pdf.setFillColor(241, 245, 249);
  pdf.rect(14, 139, 182, 7, 'F');
  pdf.setFontSize(8);
  pdf.setTextColor(71, 85, 105);
  pdf.text('NUTRIENT', 18, 144);
  pdf.text('TARGET', 65, 144);
  pdf.text('NUTRIENT', 108, 144);
  pdf.text('TARGET', 155, 144);

  const micros = [
    { n1: 'Calcium', v1: `${metrics.calciumMg} mg`, n2: 'Vitamin C', v2: `${metrics.vitCMg} mg` },
    { n1: 'Iron', v1: `${metrics.ironMg} mg`, n2: 'Vitamin D', v2: `${metrics.vitDIu} IU` },
    { n1: 'Magnesium', v1: `${metrics.magnesiumMg} mg`, n2: 'Vitamin B12', v2: `${metrics.vitB12Mcg} mcg` },
    { n1: 'Potassium', v1: `${metrics.potassiumMg} mg`, n2: 'Omega 3', v2: `${metrics.omega3Grams} g` },
  ];

  let y = 151;
  micros.forEach((row) => {
    pdf.setFontSize(9);
    pdf.setTextColor(17, 24, 39);
    pdf.text(row.n1, 18, y);
    pdf.setTextColor(4, 120, 87);
    pdf.text(row.v1, 65, y);
    pdf.setTextColor(17, 24, 39);
    pdf.text(row.n2, 108, y);
    pdf.setTextColor(4, 120, 87);
    pdf.text(row.v2, 155, y);
    pdf.setDrawColor(241, 245, 249);
    pdf.line(14, y + 2, 196, y + 2);
    y += 8;
  });

  // Footer Stamp
  pdf.setFontSize(8);
  pdf.setTextColor(156, 163, 175);
  pdf.text('InfinityFitAI Engine • Personal Biometric Health Blueprint • Confidential', 105, 285, { align: 'center' });

  pdf.save(filename);
}
