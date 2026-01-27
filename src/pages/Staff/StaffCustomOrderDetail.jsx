import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

// Mock data based on DB schema:
// Order → OrderItem → Design_Work → Design_Version_History
// OrderItem.SourceType: PREMADE, CUSTOMER_FILE, DESIGN_WORK, AI_GENERATE
// OrderItem.FulfillmentStatus: PENDING, DESIGNING, WAITING_REVIEW, APPROVED, PRINTING, COMPLETED, REJECTED

const mockOrder = {
  // From Order table
  id: "ORD-001",
  customerId: "CUST-001",
  staffId: "STAFF-001",
  totalPrice: 450000,
  orderStatus: "PROCESSING",
  priority: 1,
  createdAt: "2024-01-15 14:30",

  // From Customer + Account tables (joined)
  customer: {
    id: "CUST-001",
    accountId: "ACC-001",
    fullname: "Nguyễn Văn An",
    email: "an@email.com",
    contactPhone: "0901234567",
    dateOfBirth: "1995-05-15",
  },

  // From ShippingAddress table
  shippingAddress: {
    id: "ADDR-001",
    receiverName: "Nguyễn Văn An",
    phone: "0901234567",
    addressLine: "123 Nguyễn Huệ",
    ward: "Phường Bến Nghé",
    district: "Quận 1",
    city: "TP.HCM",
    province: "Hồ Chí Minh",
    isDefault: true,
  },

  // From OrderItem table
  items: [
    {
      id: "ITEM-001",
      orderId: "ORD-001",
      sourceType: "PREMADE",  // From Design_Variant
      designVariantId: "VAR-001",
      designVersionHistoryId: null,
      quantityOrdered: 2,
      unitPrice: 50000,
      totalPrice: 100000,
      fulfillmentStatus: "PENDING",
      createdAt: "2024-01-15 14:30",
      // Joined from Design_Variant
      designVariant: {
        id: "VAR-001",
        code: "KEY-001",
        name: "Móc khóa nhựa PLA",
        price: 50000,
        previewModelUrl: "/models/keychain.glb",
      },
    },
    {
      id: "ITEM-002",
      orderId: "ORD-001",
      sourceType: "DESIGN_WORK",  // Custom design request
      designVariantId: null,
      designVersionHistoryId: "DVH-002",
      quantityOrdered: 1,
      unitPrice: 250000,
      totalPrice: 250000,
      fulfillmentStatus: "DESIGNING",
      createdAt: "2024-01-15 14:30",
      // Joined from Design_Work
      designWork: {
        id: "DW-001",
        sourceType: "CUSTOMER_REQUEST",
        assignedStaffId: "STAFF-001",
        status: "IN_PROGRESS",
        createdAt: "2024-01-15 14:30",
      },
      // Design_Version_History
      designVersions: [
        {
          id: "DVH-001",
          versionNumber: 1,
          fileUrl: "/designs/design_v1.stl",
          uploaderId: "STAFF-001",
          isPreviewable: true,
          isPrintable: false,
          createdAt: "2024-01-16 10:00",
          status: "REJECTED",
          note: "Bản đầu tiên - chưa đạt yêu cầu"
        },
      ],
      // From Design_Thread → Design_Message
      customerRequest: "Yêu cầu tượng chibi nhân vật anime, cao 10cm, tư thế đứng",
    },
    {
      id: "ITEM-003",
      orderId: "ORD-001",
      sourceType: "CUSTOMER_FILE",  // Customer uploaded file
      designVariantId: null,
      designVersionHistoryId: "DVH-003",
      quantityOrdered: 1,
      unitPrice: 100000,
      totalPrice: 100000,
      fulfillmentStatus: "WAITING_REVIEW",
      createdAt: "2024-01-15 14:30",
      // Customer uploaded file info
      customerFile: {
        fileName: "phone_case_design.stl",
        fileUrl: "/uploads/phone_case_design.stl",
        fileSize: "2.4 MB",
        uploadedAt: "2024-01-15 14:35",
      },
    },
  ],

  // From Invoice table
  invoice: {
    id: "INV-001",
    invoiceCode: "INV-2024-0001",
    subTotal: 450000,
    taxAmount: 0,
    shippingFee: 30000,
    totalAmount: 480000,
    paymentStatus: "UNPAID",
    dueDate: "2024-01-22",
  },
};

// FulfillmentStatus from OrderItem
const fulfillmentStatusConfig = {
  PENDING: { label: "Chờ xử lý", color: "bg-yellow-100 text-yellow-800", icon: "⏳" },
  DESIGNING: { label: "Đang thiết kế", color: "bg-blue-100 text-blue-800", icon: "🎨" },
  WAITING_REVIEW: { label: "Chờ duyệt", color: "bg-purple-100 text-purple-800", icon: "👁️" },
  APPROVED: { label: "Đã duyệt", color: "bg-green-100 text-green-800", icon: "✅" },
  READY_TO_PRINT: { label: "Sẵn sàng in", color: "bg-indigo-100 text-indigo-800", icon: "📋" },
  PRINTING: { label: "Đang in", color: "bg-orange-100 text-orange-800", icon: "🖨️" },
  COMPLETED: { label: "Hoàn thành", color: "bg-green-100 text-green-800", icon: "✓" },
  REJECTED: { label: "Từ chối", color: "bg-red-100 text-red-800", icon: "✗" },
};

// SourceType from OrderItem
const sourceTypeConfig = {
  PREMADE: { label: "Design_Variant có sẵn", color: "text-gray-600", icon: "📦" },
  CUSTOMER_FILE: { label: "File khách upload", color: "text-blue-600", icon: "📤" },
  DESIGN_WORK: { label: "Design_Work tạo mới", color: "text-purple-600", icon: "✏️" },
  AI_GENERATE: { label: "AI Generate", color: "text-green-600", icon: "🤖" },
};

// OrderStatus from Order
const orderStatusConfig = {
  PENDING: { label: "Chờ xử lý", color: "bg-yellow-100 text-yellow-800" },
  PROCESSING: { label: "Đang xử lý", color: "bg-blue-100 text-blue-800" },
  PRINTING: { label: "Đang in", color: "bg-orange-100 text-orange-800" },
  SHIPPED: { label: "Đã giao", color: "bg-indigo-100 text-indigo-800" },
  COMPLETED: { label: "Hoàn thành", color: "bg-green-100 text-green-800" },
};

const StaffCustomOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(mockOrder);
  const [uploadingItemId, setUploadingItemId] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [note, setNote] = useState("");

  const updateItemStatus = (itemId, newStatus) => {
    setOrder((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === itemId ? { ...item, fulfillmentStatus: newStatus } : item
      ),
    }));
  };

  const handleUploadDesignVersion = (itemId) => {
    if (!previewFile) return alert("Chọn file trước!");

    setOrder((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === itemId
          ? {
            ...item,
            fulfillmentStatus: "WAITING_REVIEW",
            designVersions: [
              ...(item.designVersions || []),
              {
                id: `DVH-NEW-${Date.now()}`,
                versionNumber: (item.designVersions?.length || 0) + 1,
                fileUrl: `/designs/${previewFile.name}`,
                uploaderId: "STAFF-001",
                isPreviewable: true,
                isPrintable: false,
                createdAt: new Date().toLocaleString(),
                status: "PENDING",
                note,
              },
            ],
          }
          : item
      ),
    }));

    setUploadingItemId(null);
    setPreviewFile(null);
    setNote("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
<<<<<<< HEAD
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            to="/staff/custom-orders"
            className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-50 shadow-sm"
          >
            ←
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Order #{order.id}</h1>
            <p className="text-gray-500 text-sm">CreatedAt: {order.createdAt} | Priority: P{order.priority}</p>
          </div>
        </div>
        <span className={`px-4 py-2 rounded-lg font-medium ${orderStatusConfig[order.orderStatus]?.color}`}>
          {orderStatusConfig[order.orderStatus]?.label}
        </span>
=======
      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
        <Link to="/staff/custom-orders" className="text-indigo-600 hover:text-indigo-800 font-medium">
          ← Quay lại danh sách đơn hàng
        </Link>
>>>>>>> a07e3d5110528856f49319fcee5e5d4e94dc1e77
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left - OrderItems */}
        <div className="col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            📦 OrderItems ({order.items.length})
          </h2>

          {order.items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              {/* Item Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-3xl">
                    {sourceTypeConfig[item.sourceType]?.icon}
                  </div>
                  <div>
                    <h3 className="text-gray-800 font-semibold">
                      {item.designVariant?.name || item.customerFile?.fileName || `Design Work #${item.designWork?.id}`}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-sm">
                      <span className={sourceTypeConfig[item.sourceType]?.color}>
                        {sourceTypeConfig[item.sourceType]?.label}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-gray-500">Qty: {item.quantityOrdered}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-gray-500">Unit: {item.unitPrice.toLocaleString()}đ</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-green-600 font-medium">Total: {item.totalPrice.toLocaleString()}đ</span>
                    </div>
                    <p className="text-gray-400 text-xs mt-1">ID: {item.id}</p>
                  </div>
                </div>
                <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${fulfillmentStatusConfig[item.fulfillmentStatus]?.color}`}>
                  {fulfillmentStatusConfig[item.fulfillmentStatus]?.icon} {fulfillmentStatusConfig[item.fulfillmentStatus]?.label}
                </span>
              </div>

              {/* PREMADE Item */}
              {item.sourceType === "PREMADE" && (
                <div className="pt-4 border-t border-gray-100">
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <p className="text-gray-500 text-xs mb-1">Design_Variant</p>
                    <p className="text-gray-800 font-medium">{item.designVariant?.code} - {item.designVariant?.name}</p>
                    <p className="text-gray-400 text-xs">Preview: {item.designVariant?.previewModelUrl}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => updateItemStatus(item.id, "PRINTING")} className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600">
                      🖨️ Start Printing
                    </button>
                    <button onClick={() => updateItemStatus(item.id, "COMPLETED")} className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600">
                      ✅ Complete
                    </button>
                  </div>
                </div>
              )}

              {/* CUSTOMER_FILE Item */}
              {item.sourceType === "CUSTOMER_FILE" && (
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-blue-700 text-xs mb-1">Customer Uploaded File</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-800 font-medium">{item.customerFile?.fileName}</p>
                        <p className="text-gray-400 text-xs">{item.customerFile?.fileSize} • {item.customerFile?.uploadedAt}</p>
                      </div>
                      <button className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">⬇️ Download</button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => updateItemStatus(item.id, "APPROVED")} className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600">
                      ✅ Approve File
                    </button>
                    <button onClick={() => updateItemStatus(item.id, "REJECTED")} className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600">
                      ❌ Reject
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300">
                      👁️ Preview 3D
                    </button>
                  </div>
                </div>
              )}

              {/* DESIGN_WORK Item */}
              {item.sourceType === "DESIGN_WORK" && (
                <div className="pt-4 border-t border-gray-100 space-y-4">
                  {/* Customer Request */}
                  {item.customerRequest && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                      <p className="text-purple-700 text-xs mb-1">💬 Customer Request (from Design_Message)</p>
                      <p className="text-gray-700">{item.customerRequest}</p>
                    </div>
                  )}

                  {/* Design_Version_History */}
                  {item.designVersions?.length > 0 && (
                    <div>
                      <p className="text-gray-500 text-sm mb-2">📁 Design_Version_History:</p>
                      <div className="space-y-2">
                        {item.designVersions.map((v) => (
                          <div key={v.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center gap-3">
                              <span className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center font-bold text-sm">v{v.versionNumber}</span>
                              <div>
                                <p className="text-gray-800 text-sm font-medium">{v.fileUrl}</p>
                                <p className="text-gray-400 text-xs">
                                  {v.createdAt} • Previewable: {v.isPreviewable ? '✓' : '✗'} • Printable: {v.isPrintable ? '✓' : '✗'}
                                </p>
                                {v.note && <p className="text-gray-500 text-xs mt-1">Note: {v.note}</p>}
                              </div>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs ${v.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                                v.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                                  'bg-gray-100 text-gray-600'
                              }`}>
                              {v.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Upload New Version */}
                  {uploadingItemId === item.id ? (
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
                      <p className="text-gray-800 font-medium">📤 Upload Design_Version_History</p>
                      <input
                        type="file"
                        accept=".stl,.obj,.glb"
                        onChange={(e) => setPreviewFile(e.target.files[0])}
                        className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-500 file:text-white"
                      />
                      <textarea
                        placeholder="Note..."
                        className="w-full bg-white border border-gray-200 rounded-lg p-3 text-gray-800"
                        rows={2}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      />
                      <div className="flex gap-2">
                        <button onClick={() => handleUploadDesignVersion(item.id)} className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium">
                          📤 Upload Version
                        </button>
                        <button onClick={() => setUploadingItemId(null)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => setUploadingItemId(item.id)} className="w-full px-4 py-3 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600">
                      🎨 Upload New Design Version
                    </button>
                  )}
                </div>
              )}

              {/* Create ProductionJob */}
              {["APPROVED", "READY_TO_PRINT"].includes(item.fulfillmentStatus) && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => navigate(`/staff/custom-orders/${order.id}/items/${item.id}/production`)}
                    className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600"
                  >
                    🖨️ Create ProductionJob
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Customer Info */}
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <h3 className="text-gray-800 font-semibold mb-4">👤 Customer (Account)</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {order.customer.fullname.charAt(0)}
                </div>
                <div>
                  <p className="text-gray-800 font-medium">{order.customer.fullname}</p>
                  <p className="text-gray-400 text-sm">{order.customer.email}</p>
                </div>
              </div>
              <div className="pt-3 space-y-2 border-t border-gray-100 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Contact_Phone</span>
                  <span className="text-gray-800">{order.customer.contactPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Customer_Id</span>
                  <span className="text-gray-600 font-mono text-xs">{order.customer.id}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <h3 className="text-gray-800 font-semibold mb-4">📍 ShippingAddress</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-800 font-medium">{order.shippingAddress.receiverName}</p>
              <p className="text-gray-600">{order.shippingAddress.phone}</p>
              <p className="text-gray-600">
                {order.shippingAddress.addressLine}, {order.shippingAddress.ward}, {order.shippingAddress.district}, {order.shippingAddress.city}
              </p>
              {order.shippingAddress.isDefault && (
                <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">Default</span>
              )}
            </div>
          </div>

          {/* Invoice */}
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <h3 className="text-gray-800 font-semibold mb-4">💰 Invoice</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">InvoiceCode</span>
                <span className="text-gray-800 font-mono">{order.invoice.invoiceCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">SubTotal</span>
                <span className="text-gray-800">{order.invoice.subTotal.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">ShippingFee</span>
                <span className="text-gray-800">{order.invoice.shippingFee.toLocaleString()}đ</span>
              </div>
              <div className="pt-2 border-t border-gray-100 flex justify-between">
                <span className="text-gray-800 font-semibold">TotalAmount</span>
                <span className="text-green-600 font-bold">{order.invoice.totalAmount.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">PaymentStatus</span>
                <span className={`px-2 py-0.5 rounded text-xs ${order.invoice.paymentStatus === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {order.invoice.paymentStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <h3 className="text-gray-800 font-semibold mb-4">⚡ Actions</h3>
            <div className="space-y-2">
              <button className="w-full px-4 py-2.5 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600">
                💬 Contact Customer
              </button>
              <button className="w-full px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                🖨️ Print Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default StaffCustomOrderDetail;
