import React from 'react';

const DashboardOverview = () => {
  return (
    <div>
      <h1 style={{
        fontSize: '24px',
        fontWeight: 700,
        color: '#2d3748',
        marginBottom: '8px'
      }}>
        Tổng quan Dashboard
      </h1>
      <p style={{
        fontSize: '14px',
        color: '#a0aec0',
        marginBottom: '32px'
      }}>
        Chào mừng bạn quay trở lại! Đây là trang tổng quan của bạn.
      </p>

      {/* Placeholder cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '20px'
      }}>
        {[
          { label: 'Đơn hàng', value: '0', icon: '📦', color: '#667eea' },
          { label: 'Đơn tùy chỉnh', value: '0', icon: '🎨', color: '#764ba2' },
          { label: 'Đang xử lý', value: '0', icon: '⏳', color: '#f6ad55' },
          { label: 'Hoàn thành', value: '0', icon: '✅', color: '#48bb78' }
        ].map((card, index) => (
          <div
            key={index}
            style={{
              padding: '24px',
              borderRadius: '14px',
              background: '#fff',
              border: '1px solid #eef0f6',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px'
            }}>
              <span style={{ fontSize: '28px' }}>{card.icon}</span>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: card.color
              }} />
            </div>
            <p style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#2d3748',
              margin: '0 0 4px 0'
            }}>
              {card.value}
            </p>
            <p style={{
              fontSize: '13px',
              color: '#a0aec0',
              margin: 0,
              fontWeight: 500
            }}>
              {card.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;
