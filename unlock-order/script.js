document.getElementById('unlockForm').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('unlockForm').style.display = 'none';
    document.getElementById('successMsg').style.display = 'block';
});

document.getElementById('downloadPDF').addEventListener('click', function() {
    const service = document.getElementById('service').value;
    const imei = document.getElementById('imei').value;
    const email = document.getElementById('email').value;
    const orderId = '#IU-' + Math.floor(Math.random()*90000 + 10000);
    const date = new Date().toLocaleString('ar-MA');
    const estTime = '1-2 أيام';
    const status = 'نجاح';

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFont('helvetica');
    doc.setFontSize(18);
    doc.setTextColor(26, 188, 76);
    doc.text('إيصال الطلب', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.setTextColor(0,0,0);
    doc.text('iUnlocks Services — سجل رسمي', 105, 30, { align: 'center' });
    doc.setFontSize(13);
    doc.text(`رقم الطلب: ${orderId}`, 20, 50);
    doc.text(`نوع الخدمة: ${service}`, 20, 60);
    doc.text(`IMEI: ${imei}`, 20, 70);
    doc.text(`الإيميل: ${email}`, 20, 80);
    doc.text(`المدة المتوقعة: ${estTime}`, 20, 90);
    doc.text(`التاريخ: ${date}`, 20, 100);
    doc.text(`الحالة: ${status}`, 20, 110);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text('تم إرسال تأكيد الطلب إلى بريدك الإلكتروني. يمكنك تتبع الطلب من خلال الموقع.', 105, 140, { align: 'center' });
    doc.save('icloud-order-receipt.pdf');
});
