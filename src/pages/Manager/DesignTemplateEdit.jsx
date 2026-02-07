import React, { useState, useEffect } from 'react';
import { 
  Form, Input, Button, Switch, message, Card, Row, Col, Modal, Select, Tag, Table, InputNumber, Space 
} from 'antd';
import { StarOutlined, StarFilled, CloseOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import designTemplateApi from '../../api/designTemplateApi';
import designTagApi from '../../api/designTagApi';
import conceptTagApi from '../../api/conceptTagApi';

const { Option } = Select;

const DesignTemplateEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [variantForm] = Form.useForm(); // Form cho Variant Modal
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [variantDescription, setVariantDescription] = useState(''); // Quill state for variant
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [originalData, setOriginalData] = useState(null);
  
  // Tag management state
  const [selectedTags, setSelectedTags] = useState([]); 
  const [availableTags, setAvailableTags] = useState([]); 
  const [mainTagId, setMainTagId] = useState(null);

  // Variant management state
  const [variants, setVariants] = useState([]);
  const [isVariantModalVisible, setIsVariantModalVisible] = useState(false);
  const [editingVariant, setEditingVariant] = useState(null);

  // Mock Materials
  const materials = [
    { id: 'm1', name: 'PLA Standard' },
    { id: 'm2', name: 'ABS Durable' },
    { id: 'm3', name: 'Resin High Detail' },
    { id: 'm4', name: 'PETG Tough' }
  ];

  useEffect(() => {
    fetchAvailableTags();
    if (id) {
      setIsEditMode(true);
      fetchTemplateDetail();
      fetchTemplateTags();
      // Mock fetch variants
      fetchVariants();
    }
  }, [id]);

  const fetchAvailableTags = async () => {
    try {
      const response = await conceptTagApi.getAll();
      setAvailableTags(response.data || []);
    } catch (error) {
      console.error('Failed to fetch tags', error);
    }
  };

  const fetchTemplateTags = async () => {
    try {
      const response = await designTagApi.getTags(id);
      const tags = response.data || [];
      setSelectedTags(tags);
      const mainTag = tags.find(t => t.isMainTag);
      if (mainTag) setMainTagId(mainTag.conceptTagId);
    } catch (error) {
      console.error('Failed to fetch template tags', error);
    }
  };

  const fetchTemplateDetail = async () => {
    setLoading(true);
    try {
      const response = await designTemplateApi.getDetail(id);
      const data = response.data;
      setOriginalData(data);
      form.setFieldsValue({
        code: data.code,
        name: data.name,
        fileUrl: data.fileUrl,
        thumbnailUrl: data.thumbnailUrl,
        isActive: data.isActive,
      });
      setDescription(data.description || '');
      setThumbnailPreview(data.thumbnailUrl);
    } catch (error) {
      message.error('Không thể tải thông tin sản phẩm');
      navigate('/manager/design-templates');
    } finally {
      setLoading(false);
    }
  };

  const fetchVariants = () => {
    // Mock data for variants
    const mockVariants = [
      {
        key: 'v1',
        id: 'v1',
        code: 'VAR-001',
        name: 'Phiên bản PLA Đỏ',
        materialId: 'm1',
        sizeScale: 1.0,
        price: 150000,
        stockQuantity: 10,
        isActive: true,
        description: '<p>Phiên bản tiêu chuẩn in bằng nhựa PLA màu đỏ.</p>'
      },
      {
        key: 'v2',
        id: 'v2',
        code: 'VAR-002',
        name: 'Phiên bản Resin Cao cấp',
        materialId: 'm3',
        sizeScale: 0.8,
        price: 350000,
        stockQuantity: 5,
        isActive: true,
        description: '<p>Phiên bản cao cấp với độ chi tiết cao.</p>'
      }
    ];
    setVariants(mockVariants);
  };

  const validateFileUrl = (url, extensions) => {
    if (!url) return false;
    const lowerUrl = url.toLowerCase();
    return extensions.some(ext => lowerUrl.endsWith(ext));
  };

  const handleThumbnailChange = (e) => {
    const url = e.target.value;
    if (url && validateFileUrl(url, ['.jpg', '.png', '.webp'])) {
      setThumbnailPreview(url);
    } else {
      setThumbnailPreview('');
    }
  };

  const handleSubmit = async (values) => {
    // Validate file URLs
    if (!validateFileUrl(values.fileUrl, ['.stl', '.obj', '.3mf'])) {
      message.error('File 3D phải có đuôi .stl, .obj hoặc .3mf');
      return;
    }
    if (values.thumbnailUrl && !validateFileUrl(values.thumbnailUrl, ['.jpg', '.png', '.webp'])) {
      message.error('Ảnh đại diện phải có đuôi .jpg, .png hoặc .webp');
      return;
    }

    if (isEditMode && originalData?.isActive && !values.isActive) {
      Modal.confirm({
        title: 'Xác nhận Deactive',
        content: 'Sản phẩm sẽ bị ẩn khỏi cửa hàng. Bạn có chắc không?',
        okText: 'Xóa',
        cancelText: 'Hủy',
        onOk: () => submitForm(values),
      });
      return;
    }

    submitForm(values);
  };

  const submitForm = async (values) => {
    setLoading(true);
    try {
      const payload = {
        ...values,
        description: description,
      };

      let response;
      if (isEditMode) {
        response = await designTemplateApi.update(id, payload);
      } else {
        response = await designTemplateApi.add(payload);
      }

      if (response.code === 'SUCCESS') {
        if (isEditMode && id) {
          await syncTags();
          // Mock save variants logic here
          console.log('Saving variants:', variants);
        }
        message.success(isEditMode ? 'Cập nhật thành công' : 'Thêm mới thành công');
        navigate('/manager/design-templates');
      } else {
        message.error(response.message || 'Thao tác thất bại');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Thao tác thất bại';
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const syncTags = async () => {
    try {
      const tags = selectedTags.map(tag => ({
        conceptTagId: tag.conceptTagId,
        isMainTag: tag.conceptTagId === mainTagId,
      }));
      
      await designTagApi.syncTags({
        designTemplateId: id,
        tags: tags,
      });
    } catch (error) {
      message.error('Đồng bộ tag thất bại');
      throw error;
    }
  };

  const handleDelete = () => {
    if (!originalData) return;
    if (originalData.isActive) {
      message.warning('Không thể xóa sản phẩm đang hoạt động. Vui lòng chuyển về Deactive trước.');
      return;
    }
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Hành động này sẽ loại bỏ hoàn toàn sản phẩm khỏi danh sách hiển thị.',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          const response = await designTemplateApi.delete(id);
          if (response.code === 'SUCCESS') {
            message.success('Đã xóa sản phẩm');
            navigate('/manager/design-templates');
          } else {
            message.error(response.message);
          }
        } catch (error) {
          const errorMsg = error.response?.data?.message || 'Xóa thất bại';
          message.error(errorMsg);
        }
      },
    });
  };

  // --- Variant Handlers ---
  const handleAddVariant = () => {
    setEditingVariant(null);
    setVariantDescription('');
    variantForm.resetFields();
    setIsVariantModalVisible(true);
  };

  const handleEditVariant = (variant) => {
    setEditingVariant(variant);
    setVariantDescription(variant.description || '');
    variantForm.setFieldsValue({
      ...variant
    });
    setIsVariantModalVisible(true);
  };

  const handleDeleteVariant = (variantId) => {
    Modal.confirm({
      title: 'Xóa biến thể',
      content: 'Bạn có chắc muốn xóa biến thể này?',
      okType: 'danger',
      onOk: () => {
        setVariants(variants.filter(v => v.id !== variantId));
        message.success('Đã xóa biến thể');
      }
    });
  };

  const handleSaveVariant = async () => {
    try {
      const values = await variantForm.validateFields();
      const variantData = {
        ...values,
        description: variantDescription,
        id: editingVariant ? editingVariant.id : `new_${Date.now()}`,
        isActive: values.isActive !== undefined ? values.isActive : true
      };

      if (editingVariant) {
        setVariants(variants.map(v => v.id === editingVariant.id ? variantData : v));
        message.success('Cập nhật biến thể thành công');
      } else {
        setVariants([...variants, variantData]);
        message.success('Thêm biến thể thành công');
      }
      setIsVariantModalVisible(false);
    } catch (error) {
      console.error('Validate Failed:', error);
    }
  };

  // --- Tag Handlers ---
  const handleAddTag = (tagId) => {
    const tag = availableTags.find(t => t.id === tagId);
    if (!tag) return;
    if (selectedTags.find(t => t.conceptTagId === tagId)) {
      message.warning('Tag đã được thêm');
      return;
    }
    const newTag = {
      conceptTagId: tag.id,
      tagName: tag.name,
      isMainTag: selectedTags.length === 0,
    };
    setSelectedTags([...selectedTags, newTag]);
    if (selectedTags.length === 0) setMainTagId(tag.id);
  };

  const handleRemoveTag = (tagId) => {
    const newTags = selectedTags.filter(t => t.conceptTagId !== tagId);
    setSelectedTags(newTags);
    if (tagId === mainTagId && newTags.length > 0) {
      setMainTagId(newTags[0].conceptTagId);
    } else if (newTags.length === 0) {
      setMainTagId(null);
    }
  };

  const handleSetMainTag = (tagId) => {
    setMainTagId(tagId);
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['clean']
    ],
  };

  const variantColumns = [
    { title: 'Tên biến thể', dataIndex: 'name', key: 'name' },
    { title: 'Mã (Code)', dataIndex: 'code', key: 'code' },
    { title: 'Vật liệu', dataIndex: 'materialId', key: 'materialId', render: (id) => materials.find(m => m.id === id)?.name || id },
    { title: 'Giá', dataIndex: 'price', key: 'price', render: (val) => `${val?.toLocaleString()} đ` },
    { title: 'Tồn kho', dataIndex: 'stockQuantity', key: 'stockQuantity' },
    { title: 'Trạng thái', dataIndex: 'isActive', key: 'isActive', render: (act) => <Tag color={act ? 'green' : 'red'}>{act ? 'Active' : 'Hidden'}</Tag> },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} size="small" onClick={() => handleEditVariant(record)} />
          <Button icon={<DeleteOutlined />} size="small" danger onClick={() => handleDeleteVariant(record.id)} />
        </Space>
      )
    }
  ];

  return (
    <div className="max-w-4xl pb-20">
      <Card
        title={
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">
              {isEditMode ? 'Chỉnh sửa Design Template' : 'Thêm Design Template mới'}
            </span>
            {isEditMode && (
              <Button danger onClick={handleDelete} disabled={originalData?.isActive}>
                Xóa sản phẩm
              </Button>
            )}
          </div>
        }
        loading={loading}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ isActive: false }}
        >
          {/* ... (Các field cũ giữ nguyên, tôi viết lại nhanh gọn ở đây) ... */}
           <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="code" label="Mã sản phẩm" rules={[{ required: true }, { pattern: /^[A-Z0-9-]+$/ }]}>
                <Input disabled={isEditMode} style={{ textTransform: 'uppercase' }} onChange={(e) => form.setFieldsValue({ code: e.target.value.toUpperCase() })} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }, { max: 200 }]}>
                <Input showCount maxLength={200} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Mô tả">
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              modules={quillModules}
              style={{ height: 200, marginBottom: 50 }}
            />
          </Form.Item>

          <Form.Item name="fileUrl" label="File 3D URL" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="thumbnailUrl" label="Ảnh đại diện URL">
            <Input onChange={handleThumbnailChange} />
          </Form.Item>

          {thumbnailPreview && (
            <div className="mb-4">
              <img src={thumbnailPreview} alt="Preview" className="w-32 h-32 object-cover rounded border" />
            </div>
          )}

          <Form.Item name="isActive" label="Trạng thái" valuePropName="checked">
            <Switch checkedChildren="Active" unCheckedChildren="Deactive" />
          </Form.Item>

          {/* Tag Section */}
          {isEditMode && (
            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">Quản lý Tags</h3>
              {/* Logic tag giữ nguyên, chỉ render lại UI */}
              <div className="mb-4">
                 <Select
                  placeholder="Thêm tag..."
                  style={{ width: '100%' }}
                  onChange={handleAddTag}
                  showSearch
                  optionFilterProp="children"
                >
                  {availableTags.filter(tag => !selectedTags.find(st => st.conceptTagId === tag.id)).map(tag => (
                    <Option key={tag.id} value={tag.id}>{tag.name}</Option>
                  ))}
                </Select>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedTags.map(tag => (
                  <Tag
                    key={tag.conceptTagId}
                    color={tag.conceptTagId === mainTagId ? 'gold' : 'blue'}
                    closable
                    onClose={(e) => { e.preventDefault(); handleRemoveTag(tag.conceptTagId); }}
                    icon={tag.conceptTagId === mainTagId ? <StarFilled /> : <StarOutlined onClick={(e) => {e.stopPropagation(); handleSetMainTag(tag.conceptTagId)}} />}
                    className="cursor-pointer"
                  >
                    {tag.tagName}
                  </Tag>
                ))}
              </div>
            </div>
          )}

          {/* Variant Section */}
          {isEditMode && (
             <div className="border-t pt-6 mt-6">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-lg font-semibold">Quản lý Biến thể (Variants)</h3>
                 <Button type="primary" icon={<PlusOutlined />} onClick={handleAddVariant}>Thêm biến thể</Button>
               </div>
               <Table 
                  columns={variantColumns} 
                  dataSource={variants} 
                  rowKey="id" 
                  pagination={false}
                  size="small"
                />
             </div>
          )}

          <div className="flex justify-end gap-3 mt-8">
            <Button onClick={() => navigate('/manager/design-templates')}>Hủy</Button>
            <Button type="primary" htmlType="submit" loading={loading}>{isEditMode ? 'Cập nhật Template' : 'Tạo mới'}</Button>
          </div>
        </Form>
      </Card>

      {/* Variant Modal */}
      <Modal
        title={editingVariant ? "Chỉnh sửa biến thể" : "Thêm biến thể mới"}
        open={isVariantModalVisible}
        onCancel={() => setIsVariantModalVisible(false)}
        onOk={handleSaveVariant}
        width={800}
      >
        <Form form={variantForm} layout="vertical" initialValues={{ isActive: true, sizeScale: 1, stockQuantity: 0 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="Tên biến thể" rules={[{ required: true }]}>
                <Input placeholder="VD: Phiên bản ABC" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="code" label="Mã (Code/SKU)" rules={[{ required: true }]}>
                <Input placeholder="VAR-..." />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
             <Col span={12}>
                <Form.Item name="materialId" label="Vật liệu" rules={[{ required: true }]}>
                  <Select placeholder="Chọn vật liệu">
                    {materials.map(m => (
                      <Option key={m.id} value={m.id}>{m.name}</Option>
                    ))}
                  </Select>
                </Form.Item>
             </Col>
             <Col span={6}>
               <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
                 <InputNumber style={{ width: '100%' }} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
               </Form.Item>
             </Col>
             <Col span={6}>
               <Form.Item name="stockQuantity" label="Tồn kho" rules={[{ required: true }]}>
                 <InputNumber style={{ width: '100%' }} />
               </Form.Item>
             </Col>
          </Row>
          <Row gutter={16}>
             <Col span={12}>
                <Form.Item name="sizeScale" label="Tỉ lệ kích thước (Scale)">
                  <InputNumber step={0.1} style={{ width: '100%' }} />
                </Form.Item>
             </Col>
             <Col span={12}>
                <Form.Item name="isActive" label="Trạng thái" valuePropName="checked">
                   <Switch checkedChildren="Active" unCheckedChildren="Hidden" />
                </Form.Item>
             </Col>
          </Row>
          <Form.Item label="Mô tả biến thể">
             <ReactQuill
                theme="snow"
                value={variantDescription}
                onChange={setVariantDescription}
                modules={quillModules}
                style={{ height: 150, marginBottom: 50 }}
              />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DesignTemplateEdit;
