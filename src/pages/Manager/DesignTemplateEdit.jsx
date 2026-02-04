import React, { useState, useEffect } from 'react';
import { 
  Form, Input, Button, Switch, message, Card, Row, Col, Modal, Select, Tag 
} from 'antd';
import { StarOutlined, StarFilled, CloseOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import designTemplateApi from '../../api/designTemplateApi';
import designTagApi from '../../api/designTagApi';
import conceptTagApi from '../../api/conceptTagApi';

const DesignTemplateEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [originalData, setOriginalData] = useState(null);
  
  // Tag management state
  const [selectedTags, setSelectedTags] = useState([]); // [{conceptTagId, tagName, isMainTag}]
  const [availableTags, setAvailableTags] = useState([]); // All concept tags from DB
  const [mainTagId, setMainTagId] = useState(null);

  useEffect(() => {
    fetchAvailableTags();
    if (id) {
      setIsEditMode(true);
      fetchTemplateDetail();
      fetchTemplateTags();
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

    // Check if deactivating
    if (isEditMode && originalData?.isActive && !values.isActive) {
      Modal.confirm({
        title: 'Xác nhận Deactive',
        content: 'Sản phẩm sẽ bị ẩn khỏi cửa hàng. Bạn có chắc không?',
        okText: 'Xác nhận',
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
        // Sync tags if in edit mode
        if (isEditMode && id) {
          await syncTags();
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
          const suggestion = error.response?.data?.additionalData?.suggestion;
          message.error(errorMsg + (suggestion ? ` ${suggestion}` : ''));
        }
      },
    });
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['clean']
    ],
  };

  const handleAddTag = (tagId) => {
    const tag = availableTags.find(t => t.id === tagId);
    if (!tag) return;
    
    // Check if already added
    if (selectedTags.find(t => t.conceptTagId === tagId)) {
      message.warning('Tag đã được thêm');
      return;
    }
    
    const newTag = {
      conceptTagId: tag.id,
      tagName: tag.name,
      isMainTag: selectedTags.length === 0, // First tag is main by default
    };
    
    setSelectedTags([...selectedTags, newTag]);
    if (selectedTags.length === 0) {
      setMainTagId(tag.id);
    }
  };

  const handleRemoveTag = (tagId) => {
    const newTags = selectedTags.filter(t => t.conceptTagId !== tagId);
    setSelectedTags(newTags);
    
    // If removed tag was main, set first tag as main
    if (tagId === mainTagId && newTags.length > 0) {
      setMainTagId(newTags[0].conceptTagId);
    } else if (newTags.length === 0) {
      setMainTagId(null);
    }
  };

  const handleSetMainTag = (tagId) => {
    setMainTagId(tagId);
  };

  return (
    <div className="max-w-4xl">
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
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="code"
                label="Mã sản phẩm"
                rules={[
                  { required: true, message: 'Vui lòng nhập mã sản phẩm' },
                  { 
                    pattern: /^[A-Z0-9-]+$/, 
                    message: 'Chỉ cho phép chữ hoa, số và dấu gạch ngang' 
                  },
                ]}
              >
                <Input
                  placeholder="MS-2026-001"
                  disabled={isEditMode}
                  style={{ textTransform: 'uppercase' }}
                  onChange={(e) => {
                    const upper = e.target.value.toUpperCase();
                    form.setFieldsValue({ code: upper });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Tên sản phẩm"
                rules={[
                  { required: true, message: 'Vui lòng nhập tên sản phẩm' },
                  { max: 200, message: 'Tối đa 200 ký tự' },
                ]}
              >
                <Input
                  placeholder="Mô hình rồng 3D"
                  showCount
                  maxLength={200}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Mô tả">
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              modules={quillModules}
              placeholder="Nhập mô tả sản phẩm..."
              style={{ height: 200, marginBottom: 50 }}
            />
          </Form.Item>

          <Form.Item
            name="fileUrl"
            label="File 3D URL"
            rules={[{ required: true, message: 'Vui lòng nhập URL file 3D' }]}
            extra="Đuôi file: .stl, .obj, .3mf"
          >
            <Input placeholder="https://f000.backblazeb2.com/.../model.stl" />
          </Form.Item>

          <Form.Item
            name="thumbnailUrl"
            label="Ảnh đại diện URL"
            extra="Đuôi file: .jpg, .png, .webp"
          >
            <Input
              placeholder="https://f000.backblazeb2.com/.../thumbnail.jpg"
              onChange={handleThumbnailChange}
            />
          </Form.Item>

          {thumbnailPreview && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Preview:</p>
              <img
                src={thumbnailPreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded border"
                onError={() => setThumbnailPreview('')}
              />
            </div>
          )}

          <Form.Item
            name="isActive"
            label="Trạng thái"
            valuePropName="checked"
          >
            <Switch
              checkedChildren="Active"
              unCheckedChildren="Deactive"
            />
          </Form.Item>

          {/* Tag Management Section */}
          {isEditMode && (
            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">Quản lý Tags</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Thêm Tag</label>
                <Select
                  placeholder="Chọn tag để thêm"
                  style={{ width: '100%' }}
                  onChange={handleAddTag}
                  value={null}
                  showSearch
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {availableTags
                    .filter(tag => !selectedTags.find(st => st.conceptTagId === tag.id))
                    .map(tag => (
                      <Select.Option key={tag.id} value={tag.id}>
                        {tag.name}
                      </Select.Option>
                    ))}
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Tags hiện tại {selectedTags.length > 0 && `(${selectedTags.length})`}
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map(tag => (
                    <Tag
                      key={tag.conceptTagId}
                      color={tag.conceptTagId === mainTagId ? 'gold' : 'blue'}
                      closable
                      onClose={(e) => { e.preventDefault(); handleRemoveTag(tag.conceptTagId); }}
                      className="px-3 py-1 text-sm cursor-pointer"
                      icon={
                        tag.conceptTagId === mainTagId ? (
                          <StarFilled className="text-yellow-500" />
                        ) : (
                          <StarOutlined 
                            onClick={(e) => { e.stopPropagation(); handleSetMainTag(tag.conceptTagId); }}
                            className="hover:text-yellow-500 cursor-pointer"
                          />
                        )
                      }
                    >
                      {tag.tagName}
                    </Tag>
                  ))}
                  {selectedTags.length === 0 && (
                    <p className="text-gray-400 text-sm">Chưa có tag nào. Thêm tag từ dropdown bên trên.</p>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  💡 Click vào ngôi sao để đặt làm tag chính. Tag chính sẽ hiển thị màu vàng.
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <Button onClick={() => navigate('/manager/design-templates')}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {isEditMode ? 'Cập nhật' : 'Tạo mới'}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default DesignTemplateEdit;
