import React, { useState } from 'react';
import axios from 'axios';

function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    setError('');
    setOrder(null);
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
      setOrder(res.data.order);
    } catch (err) {
      setError('رقم الطلب غير صحيح أو غير موجود.');
    }
    setLoading(false);
  };

  return (
    <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: 24, maxWidth: 400, margin: '40px auto' }}>
      <h2 style={{ textAlign: 'center', color: '#1abc4c', marginBottom: 24 }}>تتبع حالة الطلب</h2>
      <form onSubmit={handleTrack} style={{ marginBottom: 18 }}>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>رقم الطلب:</label>
        <input type="text" value={orderId} onChange={e => setOrderId(e.target.value)} required placeholder="#IU-XXXXX" style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginBottom: 12 }} />
        <button type="submit" style={{ width: '100%', background: '#1abc4c', color: '#fff', border: 'none', padding: 10, borderRadius: 6, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>تتبع</button>
      </form>
      {loading && <p>جاري البحث...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {order && (
        <div style={{ background: '#f4f6f8', borderRadius: 8, padding: 16, marginTop: 12 }}>
          <p><b>رقم الطلب:</b> {order.orderId}</p>
          <p><b>نوع الخدمة:</b> {order.service}</p>
          <p><b>IMEI:</b> {order.imei}</p>
          <p><b>الحالة:</b> {order.status}</p>
          <p><b>تاريخ الإنشاء:</b> {new Date(order.createdAt).toLocaleString('ar-MA')}</p>
        </div>
      )}
    </div>
  );
}

export default TrackOrder;
