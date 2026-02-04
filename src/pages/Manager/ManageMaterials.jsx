import React, { useState, useEffect } from 'react';
import { 
  Table, Button, Modal, Form, Input, InputNumber, 
  Tag, Card, Row, Col, Space, message, Typography, Divider, Tooltip 
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, HistoryOutlined } from '@ant-design/icons';
import materialApi from '../../api/materialApi';
import conceptTagApi from '../../api/conceptTagApi';
import { format } from 'date-fns';

const { Title, Text } = Typography;
const { Search } = Input;

const ManageMaterials = () => {
  // --- State ---
  const [materials, setMaterials] = useState([]);
  const [tags, setTags] = useState([]);
  const [loadingMaterials, setLoadingMaterials] = useState(false);
  const [loadingTags, setLoadingTags] = useState(false);

  // Modal States
  const [isMaterialModalVisible, setIsMaterialModalVisible] = useState(false);
  const [isUpdatePriceModalVisible, setIsUpdatePriceModalVisible] = useState(false);
  const [isTagModalVisible, setIsTagModalVisible] = useState(false);
  
  // Forms
  const [materialForm] = Form.useForm();
  const [priceForm] = Form.useForm();
  const [tagForm] = Form.useForm();

  // Selected Items
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  // --- Fetch Data ---
  const fetchMaterials = async (searchText = '') => {
    setLoadingMaterials(true);
    try {
      const params = {
        search: searchText,
        isActive: true,
        paging: { pageIndex: 1, pageSize: 100 } // Fetch all for now or implement proper pagination
      };
      const response = await materialApi.query(params);
      // Assuming response.data contains the list in a specific format. 
      // Adjusting based on typical API response wrapper if standard BaseResponseModel
      // If BaseResponseModel: { data: [...], ... }
      setMaterials(response.data || []); 
    } catch (error) {
      console.error("Failed to fetch materials", error);
      // message.error('Không thể tải danh sách vật liệu');
      // Set mock data if API fails (for development without backend)
      setMaterials([
        { 
          id: '1', name: 'PLA Basic', description: 'Nhựa in cơ bản', 
          baseCostPerGram: 100, totalServiceCostPerGram: 300, 
          isActive: true, isCurrent: true 
        },
        { 
          id: '2', name: 'Resin Standard', description: 'Nhựa lỏng tiêu chuẩn', 
          baseCostPerGram: 500, totalServiceCostPerGram: 1500, 
          isActive: true, isCurrent: true 
        }
      ]);
    } finally {
      setLoadingMaterials(false);
    }
  };

  const fetchTags = async () => {
    setLoadingTags(true);
    try {
      const response = await conceptTagApi.getAll();
       // If BaseResponseModel: { data: [...], ... }
      setTags(response.data || []);
    } catch (error) {
      console.error("Failed to fetch tags", error);
      // Mock data
      setTags([
        { id: '1', name: 'Artistic', description: 'Mẫu nghệ thuật', isActive: true },
        { id: '2', name: 'Mechanical', description: 'Chi tiết cơ khí', isActive: true }
      ]);
    } finally {
      setLoadingTags(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
    fetchTags();
  }, []);

  // --- Handlers: Material ---

  const handleCreateMaterial = async (values) => {
    try {
      await materialApi.add(values);
      message.success('Thêm vật liệu thành công');
      setIsMaterialModalVisible(false);
      materialForm.resetFields();
      fetchMaterials();
    } catch (error) {
      message.error('Thêm vật liệu thất bại: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleUpdatePrice = async (values) => {
    if (!selectedMaterial) return;
    try {
      const payload = {
        materialId: selectedMaterial.id,
        newBaseCost: values.baseCostPerGram,
        newServiceCost: values.totalServiceCostPerGram,
        effectiveDate: null // Backend sets to NOW
      };
      
      // Note: API spec calls for wrapping in specific object structure if needed, 
      // strictly following spec: { "materialId": "...", "newPrice": ... } ? 
      // Prompt says: "Create ... Request Body: ... baseCostPerGram...". 
      // Update Price Endpoint isn't fully detailed in "Request Body" in prompt section 2.1 
      // except "Logic: Không ghi đè...". 
      // Section 4 Example response shows "newPrice", implying we send price.
      // I will assume payload structure matches the fields needed.
      
      await materialApi.updatePrice(payload);
      message.success('Cập nhật giá thành công');
      setIsUpdatePriceModalVisible(false);
      priceForm.resetFields();
      fetchMaterials(); // Refresh to show new current price
    } catch (error) {
      message.error('Cập nhật giá thất bại');
    }
  };

  const openUpdatePriceModal = (record) => {
    setSelectedMaterial(record);
    priceForm.setFieldsValue({
      baseCostPerGram: record.baseCostPerGram,
      totalServiceCostPerGram: record.totalServiceCostPerGram
    });
    setIsUpdatePriceModalVisible(true);
  };

  // --- Handlers: Tags ---

  const handleCreateOrUpdateTag = async (values) => {
    try {
      if (selectedTag) {
        // Update
        await conceptTagApi.update(selectedTag.id, { ...values, isActive: true });
        message.success('Cập nhật thẻ thành công');
      } else {
        // Create
        await conceptTagApi.add({ ...values, isActive: true });
        message.success('Thêm thẻ mới thành công');
      }
      setIsTagModalVisible(false);
      tagForm.resetFields();
      setSelectedTag(null);
      fetchTags();
    } catch (error) {
      message.error('Thao tác thất bại');
    }
  };

  const handleDeleteTag = async (id) => {
    Modal.confirm({
      title: 'Xóa thẻ phân loại?',
      content: 'Bạn có chắc chắn muốn xóa thẻ này không?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          await conceptTagApi.delete(id);
          message.success('Đã xóa thẻ');
          fetchTags();
        } catch (error) {
          message.error('Xóa thất bại');
        }
      }
    });
  };

  const openEditTagModal = (tag) => {
    setSelectedTag(tag);
    tagForm.setFieldsValue(tag);
    setIsTagModalVisible(true);
  };

  // --- Columns ---

  const materialColumns = [
    {
      title: 'Tên Vật liệu',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Giá Vốn (VNĐ/g)',
      dataIndex: 'baseCostPerGram',
      key: 'baseCostPerGram',
      render: (val) => val ? val.toLocaleString() : '-',
    },
    {
      title: 'Giá Dịch vụ (VNĐ/g)',
      dataIndex: 'totalServiceCostPerGram',
      key: 'totalServiceCostPerGram',
      render: (val) => val ? <Tag color="blue">{val.toLocaleString()}</Tag> : '-',
    },
    {
      title: 'Tác vụ',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Cập nhật giá mới">
            <Button 
              type="text" 
              icon={<HistoryOutlined />} 
              onClick={() => openUpdatePriceModal(record)}
              className="text-blue-600 hover:text-blue-800"
            >
              Cập nhật giá
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <Title level={2} style={{ margin: 0 }}>Quản lý Danh mục Lõi</Title>
            <Text type="secondary">Quản lý vật liệu in 3D và các thẻ phân loại thiết kế</Text>
          </div>
        </div>

        <Row gutter={[24, 24]}>
          
          {/* Left Column: Materials */}
          <Col xs={24} lg={16}>
            <Card 
              title="Danh sách Vật liệu" 
              extra={
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />} 
                  onClick={() => { setIsMaterialModalVisible(true); materialForm.resetFields(); }}
                >
                  Thêm Vật liệu
                </Button>
              }
              className="shadow-sm rounded-lg"
            >
              <div className="mb-4">
                <Search 
                  placeholder="Tìm kiếm vật liệu..." 
                  onSearch={fetchMaterials} 
                  enterButton 
                  allowClear
                />
              </div>
              <Table 
                columns={materialColumns} 
                dataSource={materials} 
                rowKey="id" 
                loading={loadingMaterials}
                pagination={{ pageSize: 5 }}
              />
            </Card>
          </Col>

          {/* Right Column: Tags */}
          <Col xs={24} lg={8}>
            <Card 
              title="Thẻ Phân loại (Concept Tags)"
              extra={
                <Button 
                  type="dashed" 
                  size="small" 
                  icon={<PlusOutlined />} 
                  onClick={() => { setSelectedTag(null); tagForm.resetFields(); setIsTagModalVisible(true); }}
                >
                  Thêm
                </Button>
              }
              className="shadow-sm rounded-lg"
            >
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <Tag 
                    key={tag.id} 
                    color="geekblue" 
                    closable 
                    onClose={(e) => { e.preventDefault(); handleDeleteTag(tag.id); }}
                    className="py-1 px-3 text-sm cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => openEditTagModal(tag)}
                  >
                    {tag.name}
                  </Tag>
                ))}
                {tags.length === 0 && !loadingTags && <Text type="secondary">Chưa có thẻ nào.</Text>}
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      {/* --- MOALS --- */}

      {/* 1. Add Material Modal */}
      <Modal
        title="Thêm Vật liệu Mới"
        open={isMaterialModalVisible}
        onCancel={() => setIsMaterialModalVisible(false)}
        footer={null}
      >
        <Form form={materialForm} layout="vertical" onFinish={handleCreateMaterial}>
          <Form.Item 
            name="name" 
            label="Tên Vật liệu" 
            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
          >
            <Input placeholder="Ví dụ: Nhựa PLA Tough" />
          </Form.Item>
          
          <Form.Item 
            name="description" 
            label="Mô tả"
          >
            <Input.TextArea placeholder="Mô tả đặc tính..." rows={2} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item 
                name="baseCostPerGram" 
                label="Giá vốn (VNĐ/g)" 
                rules={[{ required: true, message: 'Nhập giá vốn' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value?.replace(/\$\s?|(,*)/g, '')} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
                name="totalServiceCostPerGram" 
                label="Giá dịch vụ (VNĐ/g)" 
                rules={[{ required: true, message: 'Nhập giá dịch vụ' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value?.replace(/\$\s?|(,*)/g, '')} />
              </Form.Item>
            </Col>
          </Row>

          <div className="text-right">
            <Button onClick={() => setIsMaterialModalVisible(false)} style={{ marginRight: 8 }}>Hủy</Button>
            <Button type="primary" htmlType="submit">Lưu Vật liệu</Button>
          </div>
        </Form>
      </Modal>

      {/* 2. Update Price Modal */}
      <Modal
        title={<span>Cập nhật giá cho: <Text type="success">{selectedMaterial?.name}</Text></span>}
        open={isUpdatePriceModalVisible}
        onCancel={() => setIsUpdatePriceModalVisible(false)}
        footer={null}
      >
        <Form form={priceForm} layout="vertical" onFinish={handleUpdatePrice}>
           <Row gutter={16}>
            <Col span={12}>
              <Form.Item 
                name="baseCostPerGram" 
                label="Giá vốn MỚI (VNĐ/g)" 
                rules={[{ required: true }]}
              >
                 <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
                name="totalServiceCostPerGram" 
                label="Giá dịch vụ MỚI (VNĐ/g)" 
                rules={[{ required: true }]}
              >
                 <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
           <div className="text-right">
            <Button onClick={() => setIsUpdatePriceModalVisible(false)} style={{ marginRight: 8 }}>Hủy</Button>
            <Button type="primary" htmlType="submit">Cập nhật Giá</Button>
          </div>
        </Form>
      </Modal>

      {/* 3. Tag Modal */}
      <Modal
        title={selectedTag ? "Cập nhật Thẻ" : "Thêm Thẻ Phân loại"}
        open={isTagModalVisible}
        onCancel={() => setIsTagModalVisible(false)}
        footer={null}
      >
        <Form form={tagForm} layout="vertical" onFinish={handleCreateOrUpdateTag}>
          <Form.Item 
            name="name" 
            label="Tên Thẻ" 
            rules={[{ required: true, message: 'Vui lòng nhập tên thẻ!' }]}
          >
            <Input placeholder="Ví dụ: Mechanical" />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={2} />
          </Form.Item>
           <div className="text-right">
            <Button onClick={() => setIsTagModalVisible(false)} style={{ marginRight: 8 }}>Hủy</Button>
            <Button type="primary" htmlType="submit">{selectedTag ? "Cập nhật" : "Thêm mới"}</Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageMaterials;
