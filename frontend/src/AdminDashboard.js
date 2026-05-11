import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders')
      .then(res => {
        setOrders(res.data.orders);
        setLoading(false);
      })
      .catch(() => {
        setError('تعذر تحميل الطلبات');
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: 24, maxWidth: 900, margin: '40px auto' }}>
      <h2 style={{ textAlign: 'center', color: '#1abc4c', marginBottom: 24 }}>لوحة تحكم الطلبات</h2>
      {loading ? <p>جاري التحميل...</p> : error ? <p style={{color:'red'}}>{error}</p> : (
        <div style={{overflowX:'auto'}}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
            <thead>
              <tr style={{ background: '#f4f6f8' }}>
                <th style={thStyle}>رقم الطلب</th>
                <th style={thStyle}>نوع الخدمة</th>
                <th style={thStyle}>IMEI</th>
                <th style={thStyle}>الإيميل</th>
                <th style={thStyle}>الحالة</th>
                <th style={thStyle}>تاريخ الإنشاء</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr><td colSpan={6} style={{textAlign:'center'}}>لا يوجد طلبات بعد</td></tr>
              ) : orders.map(order => (
                <tr key={order.orderId}>
                  <td style={tdStyle}>{order.orderId}</td>
                  <td style={tdStyle}>{order.service}</td>
                  <td style={tdStyle}>{order.imei}</td>
                  <td style={tdStyle}>{order.email}</td>
                  <td style={tdStyle}>{order.status}</td>
                  <td style={tdStyle}>{new Date(order.createdAt).toLocaleString('ar-MA')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const thStyle = { padding: 8, borderBottom: '1px solid #eee', color: '#159c3a', fontWeight: 700 };
const tdStyle = { padding: 8, borderBottom: '1px solid #eee', textAlign: 'center' };

export default AdminDashboard;
