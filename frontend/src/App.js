import React, { useState } from 'react';
import OrderForm from './OrderForm';
import AdminDashboard from './AdminDashboard';
import TrackOrder from './TrackOrder';

function App() {
  const [page, setPage] = useState('form');
  return (
    <div style={{ direction: 'rtl', fontFamily: 'Tajawal, Arial, sans-serif', minHeight: '100vh', background: '#f4f6f8', padding: 0 }}>
      <header style={{ background: 'linear-gradient(90deg, #1abc4c 60%, #159c3a 100%)', color: '#fff', padding: '32px 0 16px 0', textAlign: 'center', borderBottomLeftRadius: 40, borderBottomRightRadius: 40, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', position: 'relative' }}>
        <h1 style={{ margin: 0, fontWeight: 800, fontSize: 32, letterSpacing: 1 }}>منصة طلب إزالة iCloud</h1>
        <p style={{ margin: '12px 0 0 0', fontSize: 18, fontWeight: 400 }}>سهلنا عليك رفع طلبك وفك قفل جهازك بسرعة وأمان</p>
        <div style={{ position: 'absolute', left: 24, top: 32, display: 'flex', gap: 8 }}>
          <button
            onClick={() => setPage('form')}
            style={{ background: page === 'form' ? '#fff' : '#e6f9ee', color: '#1abc4c', border: 'none', borderRadius: 8, padding: '8px 14px', fontWeight: 700, fontSize: 15, cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}
          >
            الرئيسية
          </button>
          <button
            onClick={() => setPage('track')}
            style={{ background: page === 'track' ? '#fff' : '#e6f9ee', color: '#1abc4c', border: 'none', borderRadius: 8, padding: '8px 14px', fontWeight: 700, fontSize: 15, cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}
          >
            تتبع الطلب
          </button>
          <button
            onClick={() => setPage('admin')}
            style={{ background: page === 'admin' ? '#fff' : '#e6f9ee', color: '#1abc4c', border: 'none', borderRadius: 8, padding: '8px 14px', fontWeight: 700, fontSize: 15, cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}
          >
            لوحة التحكم
          </button>
        </div>
      </header>
      <main style={{ maxWidth: page === 'form' ? 500 : page === 'track' ? 400 : 900, margin: '40px auto 0 auto', padding: 24 }}>
        {page === 'form' && <OrderForm />}
        {page === 'track' && <TrackOrder />}
        {page === 'admin' && <AdminDashboard />}
      </main>
      <footer style={{ textAlign: 'center', color: '#888', fontSize: 14, marginTop: 40, padding: 16 }}>
        &copy; {new Date().getFullYear()} جميع الحقوق محفوظة لمنصة iCloud Unlock
      </footer>
    </div>
  );
}

export default App;
