import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  Select,
  Tabs,
  Space,
  Upload,
  Tag,
  Tooltip,
  Popconfirm,
  message,
  Card,
  Row,
  Col,
  Descriptions,
  Divider
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  SettingOutlined,
  DollarOutlined,
  BarcodeOutlined,
  InboxOutlined,
  SearchOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  // --- Mock Data Initialization ---
  useEffect(() => {
    const initialProducts = [
      {
        id: 1,
        name: 'Mô hình 3D Custom Logo',
        category: 'Doanh nghiệp',
        description: 'Logo doanh nghiệp in 3D chất lượng cao',
        basePrice: 500000,
        options: [
          { id: 'opt_1', name: 'Màu sắc', values: ['Đỏ', 'Xanh', 'Đen'] },
          { id: 'opt_2', name: 'Kích thước', values: ['10cm', '20cm'] }
        ],
        variants: [
          { id: 'v1', sku: 'LOGO-RED-10', attributes: { 'Màu sắc': 'Đỏ', 'Kích thước': '10cm' }, price: 500000, stock: 10 },
          { id: 'v2', sku: 'LOGO-RED-20', attributes: { 'Màu sắc': 'Đỏ', 'Kích thước': '20cm' }, price: 700000, stock: 5 },
          { id: 'v3', sku: 'LOGO-BLUE-10', attributes: { 'Màu sắc': 'Xanh', 'Kích thước': '10cm' }, price: 500000, stock: 8 },
          { id: 'v4', sku: 'LOGO-BLUE-20', attributes: { 'Màu sắc': 'Xanh', 'Kích thước': '20cm' }, price: 700000, stock: 3 },
          // ... others
        ],
        enabled: true,
        images: []
      },
      {
        id: 2,
        name: 'Vase 3D Nghệ Thuật',
        category: 'Trang trí',
        description: 'Bình hoa trang trí in 3D',
        basePrice: 300000,
        options: [
          { id: 'opt_1', name: 'Vật liệu', values: ['PLA', 'Wood'] }
        ],
        variants: [
          { id: 'v5', sku: 'VASE-PLA', attributes: { 'Vật liệu': 'PLA' }, price: 300000, stock: 20 },
          { id: 'v6', sku: 'VASE-WOOD', attributes: { 'Vật liệu': 'Wood' }, price: 450000, stock: 15 },
        ],
        enabled: true,
        images: []
      }
    ];
    setProducts(initialProducts);
  }, []);

  // --- Logic Generates Variants ---
  // Helper to generate cartesian product
  const cartesian = (args) => {
    const r = [], max = args.length - 1;
    function helper(arr, i) {
      for (let j = 0, l = args[i].values.length; j < l; j++) {
        const a = arr.slice(0); // clone arr
        a.push({ name: args[i].name, value: args[i].values[j] });
        if (i === max) r.push(a);
        else helper(a, i + 1);
      }
    }
    if(args.length > 0) helper([], 0);
    return r;
  };

  const generateVariantsFromOptions = (options) => {
    if (!options || options.length === 0) return [];
    
    // Filter options that have values
    const validOptions = options.filter(o => o.values && o.values.length > 0);
    if (validOptions.length === 0) return [];

    const combinations = cartesian(validOptions);
    
    return combinations.map((combo, index) => {
      const attributes = {};
      combo.forEach(c => attributes[c.name] = c.value);
      
      // Auto-generate SKU
      const skuSuffix = combo.map(c => c.value.substring(0, 3).toUpperCase()).join('-');
      
      return {
        id: `new_${Date.now()}_${index}`, // temporary ID
        sku: `SKU-${skuSuffix}`,
        attributes: attributes,
        price: 0, // Should inherit base price in real logic
        stock: 0,
        enabled: true
      };
    });
  };

  // --- Handlers ---

  const handleOpenDrawer = (product = null) => {
    setEditingProduct(product);
    if (product) {
      // Load existing product data
      form.setFieldsValue({
        ...product,
        // Map options for dynamic form
        options: product.options
      });
      // Logic handling variants needs care: pass existing variants to form
      // Simplification: We might rely on Form list state for options
    } else {
      form.resetFields();
      form.setFieldsValue({
        options: [{ name: 'Màu sắc', values: [] }], // Default option
        variants: []
      });
    }
    setIsDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerVisible(false);
    setEditingProduct(null);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      
      // Process Data
      const newProduct = {
        id: editingProduct ? editingProduct.id : Date.now(),
        ...values,
        // Ensure variants are attached (variants are part of form values if managed there, 
        // or we need to merge generated ones with inputs)
      };

      if (editingProduct) {
        setProducts(products.map(p => p.id === editingProduct.id ? newProduct : p));
        message.success('Cập nhật sản phẩm thành công');
      } else {
        setProducts([...products, newProduct]);
        message.success('Thêm sản phẩm thành công');
      }
      handleCloseDrawer();
    } catch (error) {
      console.error('Validation Failed:', error);
    }
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
    message.success('Đã xóa sản phẩm');
  };

  const handleToggleStatus = (id) => {
    setProducts(products.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
  };

  // --- UI Components ---

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <div className="font-semibold text-gray-900">{text}</div>
          <div className="text-xs text-gray-500">{record.sku || `ID: ${record.id}`}</div>
        </div>
      ),
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      render: (text) => <Tag color="blue">{text}</Tag>
    },
    {
      title: 'Khoảng giá',
      key: 'price',
      render: (_, record) => {
        if (!record.variants || record.variants.length === 0) return `${record.basePrice?.toLocaleString()} đ`;
        const prices = record.variants.map(v => v.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        return min === max 
          ? `${min.toLocaleString()} đ` 
          : `${min.toLocaleString()} - ${max.toLocaleString()} đ`;
      }
    },
    {
      title: 'Tổng tồn kho',
      key: 'stock',
      render: (_, record) => {
        const total = record.variants?.reduce((sum, v) => sum + v.stock, 0) || 0;
        return (
          <Tag color={total > 0 ? 'green' : 'red'}>
            {total} sản phẩm
          </Tag>
        );
      }
    },
    {
      title: 'Biến thể',
      key: 'variants',
      render: (_, record) => (
        <Space size={[0, 8]} wrap>
          {record.options?.map(opt => (
            <Tag key={opt.id}>{opt.name}: {opt.values.length}</Tag>
          ))}
        </Space>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'enabled',
      key: 'enabled',
      render: (enabled) => (
        <Tag color={enabled ? 'success' : 'default'}>
          {enabled ? 'Đang bán' : 'Đã ẩn'}
        </Tag>
      )
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Chỉnh sửa">
            <Button 
              type="text" 
              icon={<EditOutlined className="text-indigo-600" />} 
              onClick={() => handleOpenDrawer(record)}
            />
          </Tooltip>
          <Tooltip title={record.enabled ? 'Ẩn sản phẩm' : 'Hiện sản phẩm'}>
             <Button 
              type="text" 
              onClick={() => handleToggleStatus(record.id)}
              className={record.enabled ? 'text-orange-500' : 'text-green-500'}
            >
              {record.enabled ? 'Ẩn' : 'Hiện'}
            </Button>
          </Tooltip>
          <Popconfirm title="Xóa sản phẩm này?" onConfirm={() => handleDelete(record.id)}>
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Logic to watch options changes and update variants
  // In a real app, this is complex. Here we assume manual trigger or simple mapping.
  // For the sake of this prompt, we'll implement the UI for the Variant Generation button.

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý sản phẩm</h1>
            <p className="text-gray-500">Quản lý danh sách sản phẩm, biến thể và tồn kho</p>
          </div>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            size="large"
            onClick={() => handleOpenDrawer(null)}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Thêm sản phẩm
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6 shadow-sm">
          <Row gutter={16}>
             <Col span={8}>
               <Input 
                 placeholder="Tìm kiếm sản phẩm..." 
                 prefix={<SearchOutlined />} 
                 onChange={e => setSearchTerm(e.target.value)}
                 allowClear
               />
             </Col>
             <Col span={4}>
               <Select 
                 placeholder="Danh mục" 
                 style={{ width: '100%' }} 
                 allowClear
                 onChange={value => setSelectedCategory(value)}
               >
                 <Option value="Doanh nghiệp">Doanh nghiệp</Option>
                 <Option value="Trang trí">Trang trí</Option>
                 <Option value="Đồ chơi">Đồ chơi</Option>
                 <Option value="Công nghệ">Công nghệ</Option>
               </Select>
             </Col>
          </Row>
        </Card>

        {/* Main Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <Table 
            columns={columns} 
            dataSource={products.filter(p => 
              p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
              (!selectedCategory || p.category === selectedCategory)
            )} 
            rowKey="id"
          />
        </div>

        {/* Drawer Form */}
        <Drawer
          title={editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
          width={720}
          onClose={handleCloseDrawer}
          open={isDrawerVisible}
          extra={
            <Space>
              <Button onClick={handleCloseDrawer}>Hủy</Button>
              <Button type="primary" onClick={handleSave} className="bg-indigo-600">
                Lưu sản phẩm
              </Button>
            </Space>
          }
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={{ enabled: true }}
          >
            <Tabs defaultActiveKey="1">
              {/* Tab 1: General Info */}
              <TabPane tab="Thông tin chung" key="1">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="name"
                      label="Tên sản phẩm"
                      rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
                    >
                      <Input placeholder="VD: Mô hình 3D..." />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="category"
                      label="Danh mục"
                      rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
                    >
                      <Select placeholder="Chọn danh mục">
                        <Option value="Doanh nghiệp">Doanh nghiệp</Option>
                        <Option value="Trang trí">Trang trí</Option>
                        <Option value="Đồ chơi">Đồ chơi</Option>
                        <Option value="Công nghệ">Công nghệ</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                
                <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                      name="basePrice"
                      label="Giá cơ bản (VNĐ)"
                      rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
                    >
                      <InputNumber 
                        style={{ width: '100%' }} 
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                      />
                    </Form.Item>
                  </Col>
                   <Col span={12}>
                    <Form.Item name="enabled" label="Trạng thái" valuePropName="checked">
                       <Select>
                         <Option value={true}>Đang bán</Option>
                         <Option value={false}>Ngừng kinh doanh</Option>
                       </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="description"
                  label="Mô tả sản phẩm"
                >
                  <TextArea rows={4} placeholder="Nhập mô tả chi tiết..." />
                </Form.Item>
              </TabPane>

              {/* Tab 2: Variants */}
              <TabPane tab="Biến thể & Phiên bản" key="2">
                <div className="bg-blue-50 p-4 rounded-md mb-6 border border-blue-100">
                  <h4 className="flex items-center gap-2 text-blue-700 font-medium mb-2">
                    <SettingOutlined /> Cấu hình Thuộc tính
                  </h4>
                  <p className="text-sm text-blue-600 mb-0">
                    Thêm các thuộc tính như Màu sắc, Kích thước. Hệ thống sẽ tự động tạo ra các biến thể kết hợp.
                  </p>
                </div>

                <Form.List name="options">
                  {(fields, { add, remove }) => (
                    <div className="mb-6">
                      {fields.map(({ key, name, ...restField }) => (
                        <div key={key} className="flex gap-4 items-start mb-4 bg-gray-50 p-3 rounded border border-gray-200">
                          <Form.Item
                            {...restField}
                            name={[name, 'name']}
                            label="Tên thuộc tính"
                            rules={[{ required: true }]}
                            className="mb-0 w-1/3"
                          >
                            <Input placeholder="VD: Màu sắc" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'values']}
                            label="Giá trị"
                            rules={[{ required: true }]}
                            className="mb-0 flex-1"
                          >
                             <Select mode="tags" placeholder="Nhập giá trị và nhấn Enter (VD: Đỏ, Xanh)" style={{ width: '100%' }} />
                          </Form.Item>
                          <Button 
                            type="text" 
                            danger 
                            icon={<DeleteOutlined />} 
                            onClick={() => remove(name)} 
                            className="mt-8"
                          />
                        </div>
                      ))}
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Thêm thuộc tính mới
                      </Button>
                    </div>
                  )}
                </Form.List>
                
                <Divider dashed />

                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-gray-800">Danh sách các biến thể</h4>
                  <Button size="small" onClick={() => {
                     // Trigger generation manually usually
                     // For now user sets variants manually or we auto gen in simpler logic
                     message.info('Tính năng tự động tạo đang được phát triển. Vui lòng nhập tay bên dưới.');
                  }}>
                    Làm mới danh sách
                  </Button>
                </div>

                <Form.List name="variants">
                  {(fields, { add, remove }) => (
                    <div className="space-y-4">
                      {fields.map(({ key, name, ...restField }) => (
                        <Card size="small" key={key} title={`Biến thể #${name + 1}`} extra={<DeleteOutlined onClick={() => remove(name)} className="text-red-500 cursor-pointer" />}>
                           <Row gutter={16}>
                             <Col span={12}>
                               <Form.Item
                                {...restField}
                                name={[name, 'sku']}
                                label="Mã SKU"
                               >
                                 <Input prefix={<BarcodeOutlined />} placeholder="SKU-..." />
                               </Form.Item>
                             </Col>
                             <Col span={6}>
                               <Form.Item
                                {...restField}
                                name={[name, 'price']}
                                label="Giá"
                               >
                                 <InputNumber 
                                    style={{ width: '100%' }} 
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                 />
                               </Form.Item>
                             </Col>
                             <Col span={6}>
                               <Form.Item
                                {...restField}
                                name={[name, 'stock']}
                                label="Tồn kho"
                               >
                                 <InputNumber style={{ width: '100%' }} />
                               </Form.Item>
                             </Col>
                           </Row>
                        </Card>
                      ))}
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Thêm biến thể thủ công
                      </Button>
                    </div>
                  )}
                </Form.List>
              </TabPane>

              {/* Tab 3: Images */}
              <TabPane tab="Hình ảnh" key="3">
                 <Form.Item name="images">
                   <Upload.Dragger multiple listType="picture" action="/upload.do">
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">Nhấp hoặc kéo thả file vào khu vực này để tải lên</p>
                      <p className="ant-upload-hint">
                        Hỗ trợ upload một hoặc nhiều hình ảnh. (Mock upload)
                      </p>
                   </Upload.Dragger>
                 </Form.Item>
              </TabPane>
            </Tabs>
          </Form>
        </Drawer>
      </div>
    </div>
  );
};

export default ManageProducts;
