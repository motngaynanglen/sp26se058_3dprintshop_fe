import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Spin, message, Modal, Input, Button } from 'antd';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { getDesignRequestDetail, approveQuote, cancelDesignRequest, postDesignRequestMessage } from '../api/mainflow2Api';
import { useAuth } from '../contexts/AuthContext';

const CUSTOM_STATUS_STEPS = [
  { key: 'SUBMITTED', label: 'Gửi yêu cầu' },
  { key: 'ASSIGNED', label: 'NV đã nhận' },
  { key: 'QUOTED', label: 'Có báo giá' },
  { key: 'NEGOTIATING', label: 'Thương lượng' },
  { key: 'APPROVED', label: 'Đã duyệt' },
];

const STATUS_ORDER = CUSTOM_STATUS_STEPS.map(s => s.key);

const STATUS_LABEL = {
  SUBMITTED: 'Mới gửi',
  ASSIGNED: 'NV đã nhận',
  QUOTED: 'Có báo giá',
  NEGOTIATING: 'Đang thương lượng',
  APPROVED: 'Đã duyệt',
  CANCELLED: 'Đã hủy',
};

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price || 0);

const statusColor = (status) => {
  if (status === 'SUBMITTED') return { background: '#f3f4f6', color: '#6b7280' };
  if (status === 'ASSIGNED') return { background: '#eff6ff', color: '#2563eb' };
  if (status === 'QUOTED') return { background: '#f5f3ff', color: '#7c3aed' };
  if (status === 'NEGOTIATING') return { background: '#fffbeb', color: '#d97706' };
  if (status === 'APPROVED') return { background: '#ecfdf5', color: '#059669' };
  return { background: '#fef2f2', color: '#dc2626' };
};

const CustomOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const [chatMessage, setChatMessage] = useState('');
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [order?.messages]);

  useEffect(() => {
    fetchDetail();

    const token = localStorage.getItem('token');
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://103.90.227.51:8080/';
    const hubUrl = `${baseUrl.replace(/\/$/, '')}/hubs/mainflow-2-design`;

    const connection = new HubConnectionBuilder()
      .withUrl(hubUrl, { accessTokenFactory: () => token })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    connection.start()
      .then(() => {
        connection.invoke('JoinDesignWork', id).catch(console.error);
        connection.on('Mainflow2Event', () => fetchDetail(true));
      })
      .catch(err => console.error('SignalR Error:', err));

    return () => {
      connection.invoke('LeaveDesignWork', id).catch(console.error);
      connection.stop();
    };
  }, [id]);

  const fetchDetail = async (silent = false) => {
    try {
      if (!silent && !order) setLoading(true);
      const res = await getDesignRequestDetail(id);
      if (res?.statusCode === 200) setOrder(res.data);
      else message.error(res?.message || 'Không tìm thấy chi tiết yêu cầu');
    } catch {
      message.error('Lỗi khi lấy chi tiết yêu cầu');
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const handleSendChat = async () => {
    if (!chatMessage.trim()) return;
    try {
      const res = await postDesignRequestMessage(id, { content: chatMessage, attachmentUrls: [] });
      if (res?.statusCode === 200) { setChatMessage(''); fetchDetail(true); }
      else message.error(res?.message || 'Lỗi gửi tin');
    } catch { message.error('Lỗi khi gửi tin nhắn'); }
  };

  const handleApprove = () => {
    Modal.confirm({
      title: 'Chấp nhận báo giá',
      content: 'Bạn có chắc chắn muốn chấp nhận báo giá này không?',
      okText: 'Chấp nhận',
      onOk: async () => {
        try {
          setProcessing(true);
          const res = await approveQuote(id);
          if (res?.statusCode === 200) { message.success('Đã chấp nhận báo giá!'); fetchDetail(); }
          else message.error(res?.message || 'Lỗi khi duyệt');
        } catch { message.error('Lỗi khi duyệt báo giá'); }
        finally { setProcessing(false); }
      }
    });
  };

  const handleCancel = () => {
    Modal.confirm({
      title: 'Hủy yêu cầu',
      content: 'Bạn có chắc chắn muốn hủy yêu cầu thiết kế này không?',
      okText: 'Hủy yêu cầu',
      okType: 'danger',
      cancelText: 'Bỏ qua',
      onOk: async () => {
        try {
          setProcessing(true);
          const res = await cancelDesignRequest(id);
          if (res?.statusCode === 200) { message.success('Đã hủy yêu cầu!'); fetchDetail(); }
          else message.error(res?.message || 'Lỗi khi hủy');
        } catch { message.error('Lỗi khi hủy yêu cầu'); }
        finally { setProcessing(false); }
      }
    });
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 64px)' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!order) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 64px)' }}>
        <h2 style={{ fontWeight: 700, color: '#111827' }}>Không tìm thấy yêu cầu</h2>
        <Link to="/my-custom-orders" style={{ color: '#4f46e5' }}>Quay lại danh sách</Link>
      </div>
    );
  }

  return (
    <div style={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#f8fafc' }}>

      {/* TOPBAR */}
      <div style={{ flexShrink: 0, background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '0 20px', height: 56, display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link to="/my-custom-orders"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, border: '1px solid #e5e7eb', color: '#374151', textDecoration: 'none', fontSize: 16 }}>
          ←
        </Link>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order.title}</p>
          <p style={{ margin: 0, fontSize: 11, color: '#9ca3af', fontFamily: 'monospace' }}>#{order.id?.slice(0, 8)}</p>
        </div>
        <span style={{ padding: '3px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, ...statusColor(order.status) }}>
          {STATUS_LABEL[order.status] || order.status}
        </span>
        {order.status !== 'CANCELLED' && order.status !== 'APPROVED' && (
          <button onClick={handleCancel} disabled={processing}
            style={{ padding: '4px 14px', borderRadius: 8, border: '1px solid #fca5a5', background: '#fef2f2', color: '#dc2626', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
            Hủy yêu cầu
          </button>
        )}
      </div>

      {/* BODY */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* CHAT COLUMN */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

          {/* Messages list */}
          <div ref={messagesContainerRef}
            style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>

{/* Messages + inline quotes */}
            {order.messages?.length > 0 ? order.messages.map((msg, i) => {
              const isMe = msg.authorAccountId === user?.id;
              const isQuote = msg.logType && msg.logType.toUpperCase().includes('QUOTE');

              if (isQuote) {
                let meta = null;
                try { meta = msg.metadataJson ? JSON.parse(msg.metadataJson) : null; } catch {}
                const hasPrice = meta?.quotedPrice != null;
                return (
                  <div key={i} style={{ alignSelf: msg.authorAccountId === user?.id ? 'flex-end' : 'flex-start', width: '100%', marginBottom: 12 }}>
                    <div style={{ background: '#ecfdf5', border: '1px solid #6ee7b7', borderRadius: '16px 16px 16px 4px', padding: '14px 18px' }}>
                      <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: 1 }}>
                        💰 Báo giá từ nhân viên{meta?.revisionNumber ? ` · Rev ${meta.revisionNumber}` : ''}
                      </p>
                      {hasPrice && (
                        <p style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 800, color: '#065f46' }}>
                          {formatPrice(meta.quotedPrice)}
                        </p>
                      )}
                      {msg.content && <p style={{ margin: '0 0 8px', fontSize: 13, color: '#374151', lineHeight: 1.5 }}>{msg.content}</p>}
                      {meta?.designFileUrls?.filter(u => u && u.trim() !== "").length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12, padding: '12px', background: 'rgba(255,255,255,0.9)', borderRadius: 12, border: '1px solid rgba(0,0,0,0.06)' }}>
                          {[...new Set(meta.designFileUrls.filter(u => u && u.trim() !== ""))].slice(1).map((url, fi) => {
                            const lowUrl = url.toLowerCase();
                            const isGLB = lowUrl.endsWith('.glb');
                            const isImage = lowUrl.endsWith('.png') || lowUrl.endsWith('.jpg') || lowUrl.endsWith('.jpeg') || lowUrl.endsWith('.webp');

                            if (isGLB) {
                              return (
                                <div key={fi} style={{ position: 'relative' }}>
                                  <div style={{ width: '100%', height: 260, borderRadius: 8, overflow: 'hidden', background: 'linear-gradient(to bottom, #f8fafc, #f1f5f9)', border: '1px solid #e2e8f0' }}>
                                    <model-viewer
                                      src={url}
                                      camera-controls
                                      auto-rotate
                                      shadow-intensity="1"
                                      environment-image="neutral"
                                      exposure="1"
                                      style={{ width: '100%', height: '100%' }}
                                    />
                                  </div>
                                  <a href={url} target="_blank" rel="noreferrer" 
                                    style={{ position: 'absolute', bottom: 8, right: 8, background: 'rgba(255,255,255,0.9)', padding: '5px 10px', borderRadius: 6, fontSize: 11, color: '#475569', textDecoration: 'none', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}>
                                    <span>💾</span> Tải về GLB
                                  </a>
                                </div>
                              );
                            }

                            if (isImage) {
                              return (
                                <a key={fi} href={url} target="_blank" rel="noreferrer" style={{ display: 'block', borderRadius: 8, overflow: 'hidden', border: '1px solid #e2e8f0 shadow-sm' }}>
                                  <img src={url} alt="" style={{ width: '100%', maxHeight: 300, objectFit: 'contain', display: 'block', background: '#f8fafc' }} />
                                </a>
                              );
                            }

                            return (
                              <a key={fi} href={url} target="_blank" rel="noreferrer"
                                style={{ fontSize: 13, color: '#2563eb', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: '#fff', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                                <span style={{ fontSize: 18 }}>📎</span>
                                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500, maxWidth: 300 }}>{url.split('/').pop()}</span>
                              </a>
                            );
                          })}
                        </div>
                      )}
                      {/* Approve button inline with quote */}
                      {(order.status === 'QUOTED' || order.status === 'NEGOTIATING') && i === order.messages.length - 1 && (
                        <div style={{ marginTop: 12 }}>
                          <Button type="primary" style={{ background: '#059669', borderColor: '#059669', width: '100%' }}
                            onClick={handleApprove} loading={processing}>
                            ✓ Chấp nhận báo giá này
                          </Button>
                        </div>
                      )}
                    </div>
                    <span style={{ fontSize: 10, color: '#9ca3af', marginTop: 3, display: 'block' }}>
                      {new Date(msg.created).toLocaleString('vi-VN')} · Nhân viên
                    </span>
                  </div>
                );
              }

              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    padding: '8px 14px',
                    borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    maxWidth: '70%', fontSize: 14, lineHeight: 1.5, wordBreak: 'break-word',
                    background: isMe ? '#4f46e5' : '#fff',
                    color: isMe ? '#fff' : '#1f2937',
                    border: isMe ? 'none' : '1px solid #e5e7eb',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                  }}>
                    {msg.content}
                  </div>
                  <span style={{ fontSize: 10, color: '#9ca3af', marginTop: 3 }}>
                    {new Date(msg.created).toLocaleString('vi-VN')} · {isMe ? 'Tôi' : 'Nhân viên'}
                  </span>
                </div>
              );
            }) : (
              <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: 13, marginTop: 40 }}>
                Chưa có tin nhắn. Nhân viên sẽ liên hệ sớm!
              </div>
            )}
          </div>

          {/* Composer */}
          <div style={{ flexShrink: 0, background: '#fff', borderTop: '1px solid #e5e7eb', padding: '12px 16px', display: 'flex', alignItems: 'flex-end', gap: 8 }}>
            {order.status === 'CANCELLED' ? (
              <div style={{ flex: 1, textAlign: 'center', color: '#dc2626', fontSize: 13, fontWeight: 500 }}>Yêu cầu đã bị hủy.</div>
            ) : order.status === 'APPROVED' ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '10px 0' }}>
                <div style={{ color: '#059669', fontSize: 14, fontWeight: 600 }}>
                  🎉 Chúc mừng! Thiết kế đã được duyệt với giá {formatPrice(order.latestQuotedPrice)}
                </div>
                <Button 
                  type="primary" 
                  size="large"
                  style={{ background: '#4f46e5', borderColor: '#4f46e5', height: 48, borderRadius: 12, padding: '0 32px', fontWeight: 700, fontSize: 16 }}
                  onClick={() => navigate('/checkout', { 
                    state: { 
                      product: { 
                        id: order.id, 
                        name: `Thiết kế: ${order.title}`, 
                        latestQuotedPrice: order.latestQuotedPrice,
                        modelSrc: order.quoteFileVersions?.[0]?.fileUrl || order.quoteFileVersions?.[0]?.url 
                      }, 
                      quantity: 1, 
                      sourceType: 'CUSTOM_QUOTE_MF2' 
                    } 
                  })}
                >
                  🚀 Thanh toán & Đặt hàng ngay
                </Button>
                <p style={{ margin: 0, fontSize: 12, color: '#6b7280' }}>Bấm tiền hành thanh toán để chúng tôi bắt đầu sản xuất và gửi hàng cho bạn.</p>
              </div>
            ) : (
              <>
                <Input.TextArea
                  autoSize={{ minRows: 1, maxRows: 4 }}
                  value={chatMessage}
                  onChange={e => setChatMessage(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendChat(); } }}
                  placeholder="Nhập tin nhắn... (Enter để gửi, Shift+Enter xuống dòng)"
                  style={{ flex: 1, resize: 'none', borderRadius: 12, fontSize: 14 }}
                />
                <Button type="primary"
                  style={{ background: '#4f46e5', flexShrink: 0, height: 36, borderRadius: 12 }}
                  disabled={!chatMessage.trim()} onClick={handleSendChat}>
                  Gửi →
                </Button>
              </>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div style={{ width: 260, flexShrink: 0, overflowY: 'auto', background: '#fff', borderLeft: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>

          {/* Timeline */}
          <div style={{ padding: '16px', borderBottom: '1px solid #f3f4f6' }}>
            <p style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 1 }}>Tiến trình</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
              {CUSTOM_STATUS_STEPS.map((step, idx) => {
                const currentIdx = STATUS_ORDER.indexOf(order.status);
                const isDone = idx < currentIdx || (idx === currentIdx && order.status !== 'CANCELLED');
                const isCurrent = idx === currentIdx && order.status !== 'CANCELLED';
                return (
                  <li key={step.key} style={{ display: 'flex', gap: 12, paddingBottom: idx < CUSTOM_STATUS_STEPS.length - 1 ? 16 : 0, position: 'relative' }}>
                    {idx < CUSTOM_STATUS_STEPS.length - 1 && (
                      <div style={{ position: 'absolute', left: 11, top: 24, width: 2, bottom: 0, background: isDone ? '#4f46e5' : '#e5e7eb' }} />
                    )}
                    <div style={{
                      width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12,
                      background: isCurrent ? '#4f46e5' : isDone ? '#4f46e5' : '#f3f4f6',
                      color: isDone || isCurrent ? '#fff' : '#9ca3af',
                      border: isCurrent ? '2px solid #a5b4fc' : 'none',
                      zIndex: 1
                    }}>
                      {isDone && !isCurrent ? '✓' : idx + 1}
                    </div>
                    <p style={{ margin: 'auto 0', fontSize: 13, fontWeight: isCurrent ? 700 : 500, color: isCurrent ? '#4f46e5' : isDone ? '#111827' : '#9ca3af' }}>
                      {step.label}
                    </p>
                  </li>
                );
              })}
              {order.status === 'CANCELLED' && (
                <li style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#fef2f2', border: '1px solid #fca5a5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#dc2626' }}>✕</div>
                  <p style={{ margin: 'auto 0', fontSize: 13, fontWeight: 600, color: '#dc2626' }}>Đã hủy</p>
                </li>
              )}
            </ul>
          </div>

          {/* Quote summary + approve button */}
          {order.latestQuotedPrice != null && (
            <div style={{ padding: '16px', borderBottom: '1px solid #f3f4f6' }}>
              <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 1 }}>Báo giá cuối</p>
              <p style={{ margin: '0 0 2px', fontSize: 22, fontWeight: 800, color: '#065f46' }}>{formatPrice(order.latestQuotedPrice)}</p>
              <p style={{ margin: '0 0 12px', fontSize: 11, color: '#9ca3af' }}>Revision {order.quoteRevision}</p>
              
              {(order.status === 'QUOTED' || order.status === 'NEGOTIATING') && (
                <Button type="primary" style={{ background: '#059669', borderColor: '#059669', width: '100%' }}
                  onClick={handleApprove} loading={processing}>
                  ✓ Chấp nhận báo giá
                </Button>
              )}

              {order.status === 'APPROVED' && (
                <Button 
                  type="primary"
                  style={{ background: '#4f46e5', borderColor: '#4f46e5', width: '100%', fontWeight: 700 }}
                  onClick={() => navigate('/checkout', { 
                    state: { 
                      product: { 
                        id: order.id, 
                        name: `Thiết kế: ${order.title}`, 
                        latestQuotedPrice: order.latestQuotedPrice,
                        modelSrc: order.quoteFileVersions?.[0]?.fileUrl || order.quoteFileVersions?.[0]?.url 
                      }, 
                      quantity: 1, 
                      sourceType: 'CUSTOM_QUOTE_MF2' 
                    } 
                  })}
                >
                  🚀 Thanh toán ngay
                </Button>
              )}
            </div>
          )}

          {/* File versions */}
          {order.quoteFileVersions?.length > 0 && (
            <div style={{ padding: '16px', borderBottom: '1px solid #f3f4f6' }}>
              <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 1 }}>File 3D đính kèm</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {order.quoteFileVersions.map((f, i) => (
                  <a key={i} href={f.fileUrl || f.url} target="_blank" rel="noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: '#f0f4ff', borderRadius: 8, textDecoration: 'none', border: '1px solid #e0e7ff' }}>
                    <span style={{ fontSize: 18 }}>📦</span>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: '#3730a3', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.title || `File v${f.versionNumber}`}</p>
                      <p style={{ margin: 0, fontSize: 10, color: '#6b7280' }}>Phiên bản {f.versionNumber}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Order info */}
          <div style={{ padding: '16px' }}>
            <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 1 }}>Mã yêu cầu</p>
            <p style={{ margin: 0, fontSize: 11, fontFamily: 'monospace', color: '#374151', wordBreak: 'break-all' }}>{order.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomOrderDetail;
