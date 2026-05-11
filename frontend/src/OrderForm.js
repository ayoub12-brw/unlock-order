import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import axios from 'axios';

function OrderForm() {
  const [service, setService] = useState('iPhone 17 Pro Max iCloud Unlock Clean/Lost');
  const [imei, setImei] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/orders', { service, imei, email });
      setSuccess(true);
      setOrderId(res.data.order.orderId);
    } catch (err) {
      setError('وقع مشكل أثناء إرسال الطلب.');
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    // Header green background
    doc.setFillColor(34, 197, 94); // #22c55e
    doc.roundedRect(10, 10, 190, 20, 6, 6, 'F');
    doc.setTextColor(255,255,255);
    doc.setFontSize(16);
    doc.text('ORDER RECEIPT', 105, 23, { align: 'center' });
    doc.setFontSize(10);
    doc.text('iUnlocks Services — Official Record', 105, 29, { align: 'center' });

    // Apple icon (simple circle for now)
    doc.setDrawColor(0,0,0);
    doc.setFillColor(0,0,0);
    doc.circle(20, 42, 4, 'F');
    doc.setTextColor(0,0,0);
    doc.setFontSize(11);
    doc.text('iUnlocks Services · Official Order Receipt', 30, 45);

    // Main box
    doc.setDrawColor(220,220,220);
    doc.roundedRect(15, 35, 180, 110, 6, 6, 'S');

    // Order ID
    doc.setFontSize(12);
    doc.setTextColor(120,120,120);
    doc.text('ORDER ID', 30, 60);
    doc.setFontSize(16);
    doc.setTextColor(0,0,0);
    doc.text(`#${orderId || 'IU-XXXXX'}`, 70, 60);

    // Service
    doc.setFontSize(11);
    doc.setTextColor(120,120,120);
    doc.text('SERVICE', 30, 72);
    doc.setTextColor(0,0,0);
    doc.text(service, 70, 72);

    // IMEI
    doc.setTextColor(120,120,120);
    doc.text('IMEI', 30, 84);
    doc.setTextColor(0,0,0);
    doc.text(imei, 70, 84);

    // Est. Time
    doc.setTextColor(120,120,120);
    doc.text('EST. TIME', 30, 96);
    doc.setTextColor(0,0,0);
    doc.text('5-25 Days', 70, 96); // تم التغيير حسب طلبك

    // Date
    doc.setTextColor(120,120,120);
    doc.text('DATE', 30, 108);
    doc.setTextColor(0,0,0);
    const now = new Date();
    doc.text(now.toLocaleString(), 70, 108);

    // Status
    doc.setTextColor(120,120,120);
    doc.text('STATUS', 30, 120);
    doc.setTextColor(34, 197, 94);
    doc.text('SUCCESS', 70, 120);

    // Total Charged
    doc.setTextColor(120,120,120);
    doc.text('Total Charged', 30, 132);
    doc.setTextColor(0,0,0);
    // استخراج الثمن من نص الخدمة
    let price = '';
    const match = service.match(/([0-9]+)\$/);
    if (match) price = match[1] + '$';
    doc.text(price, 70, 132);

    // Footer note
    doc.setFontSize(9);
    doc.setTextColor(120,120,120);
    doc.text('A confirmation has been sent to your email. You can track this order anytime from Order History.', 105, 150, { align: 'center', maxWidth: 180 });

    doc.save(`icloud-order-${orderId}.pdf`);
  };

  if (success) {
    return (
      <div style={{textAlign: 'center'}}>
        <h3>تم إرسال الطلب بنجاح!</h3>
        <p>رقم الطلب: <b>{orderId}</b></p>
        <p>يمكنك تتبع حالة الطلب من لوحة التتبع.</p>
        <button onClick={handleDownloadPDF} style={{
          marginTop: 18,
          background: '#1abc4c',
          color: '#fff',
          border: 'none',
          padding: '10px 24px',
          borderRadius: 6,
          fontSize: 16,
          fontWeight: 700,
          cursor: 'pointer',
          letterSpacing: 1
        }}>تحميل إيصال PDF</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{
      maxWidth: 400,
      margin: 'auto',
      background: '#fff',
      padding: 32,
      borderRadius: 12,
      boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
    }}>
      <h3 style={{
        margin: '0 0 24px 0',
        textAlign: 'center',
        color: '#1abc4c',
        fontWeight: 800,
        fontSize: 22
      }}>طلب إزالة iCloud</h3>

      <div style={{ marginBottom: 18 }}>
        <label style={{ display: 'block', marginBottom: 6, color: '#333', fontWeight: 600 }}>نوع الخدمة:</label>
        <select value={service} onChange={e => setService(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}>
          <option value="iPhone XR/XS/XS Max">iPhone XR / XS / XS Max - 80$ - 15-40 days</option>
          <option value="iPhone 11 to 11 Pro Max">iPhone 11 / 11 Pro / 11 Pro Max - 90$ - 10-40 days</option>
          <option value="iPhone 12 to 12 Pro Max">iPhone 12 / 12 Mini / 12 Pro / 12 Pro Max - 110$ - 10-40 days</option>
          <option value="iPhone 13 to 13 Pro Max">iPhone 13 / 13 Mini / 13 Pro / 13 Pro Max - 120$ - 10-40 days</option>
          <option value="iPhone 14 to 14 Pro Max">iPhone 14 / 14 Plus / 14 Pro / 14 Pro Max - 130$ - 10-40 days</option>
          <option value="iPhone 15 to 15 Pro Max">iPhone 15 / 15 Plus / 15 Pro / 15 Pro Max - 140$ - 10-40 days</option>
          <option value="iPhone 16 to 16 Pro Max">iPhone 16 / 16 Pro / 16 Pro Max - 150$ - 15-40 days</option>
          <option value="iPhone 17 to 17 Pro Max">iPhone 17 / 17 Pro / 17 Pro Max - 165$ - 15-40 min</option>
          <option value="iPad Before 2020">iPad / iPod All model Before 2020 - 140$ - 15-40 days</option>
          <option value="iPad 2020-2026">iPad / iPod All model 2020 to 2026 - 140$ - 15-40 days</option>
          <option value="Apple Watch SE/2/3">Apple Watch SE / 2 / 3 - 70$ - 15-40 days</option>
          <option value="Apple Watch 4/5">Apple Watch Series 4 / 5 - 80$ - 15-40 days</option>
          <option value="Apple Watch 6/7">Apple Watch Series 6 / 7 - 90$ - 15-40 days</option>
          <option value="Apple Watch 8/9">Apple Watch Series 8 / 9 - 110$ - 15-40 days</option>
          <option value="Apple Watch 10/11">Apple Watch Series 10 / 11 - 125$ - 15-40 days</option>
          <option value="Apple Watch Ultra 1/2/3">Apple Watch Ultra 1 / Ultra 2 / Ultra 3 - 140$ - 15-40 days</option>
        </select>
      </div>

      <div style={{ marginBottom: 18 }}>
        <label style={{ display: 'block', marginBottom: 6, color: '#333', fontWeight: 600 }}>IMEI:</label>
        <input type="text" value={imei} onChange={e => setImei(e.target.value)} required maxLength={16} pattern="[A-Za-z0-9]+" style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
      </div>

      <div style={{ marginBottom: 24 }}>
        <label style={{ display: 'block', marginBottom: 6, color: '#333', fontWeight: 600 }}>الإيميل:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
      </div>

      <button type="submit" style={{
        width: '100%',
        background: '#1abc4c',
        color: '#fff',
        border: 'none',
        padding: 12,
        borderRadius: 6,
        fontSize: 17,
        fontWeight: 700,
        letterSpacing: 1,
        cursor: 'pointer',
        transition: 'background 0.2s'
      }}>إرسال الطلب</button>
      {error && <p style={{color: 'red', marginTop: 12}}>{error}</p>}
    </form>
  );
}

export default OrderForm;
