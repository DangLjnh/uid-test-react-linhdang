import { useState } from 'react';
import { Form, Input, Select, Upload, Button, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const CreateProduct = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const onFinish = (values) => {
    console.log('Success:', values);
    // Handle form submission
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Title level={2}>Create New Product</Title>
      <Form
        form={form}
        name="create_product"
        onFinish={onFinish}
        layout="vertical"
        className="space-y-4"
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input the product title!' }]}
        >
          <Input className="w-full" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
        >
          <Input.TextArea rows={4} className="w-full" />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="size"
            label="Size"
          >
            <Select>
              <Option value="12x12">12x12 in (30.5x30.5 cm)</Option>
              <Option value="18x18">18x18 in (45x45 cm)</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
          >
            <Select>
              <Option value="draft">Draft</Option>
              <Option value="published">Published</Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          name="media"
          label="Media"
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleChange}
          >
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
        >
          <Select>
            <Option value="pillows">Pillows</Option>
            {/* Add more categories as needed */}
          </Select>
        </Form.Item>

        <Form.Item
          name="collections"
          label="Collections"
        >
          <Select mode="multiple">
            <Option value="gifts-for-dog-lovers">Gifts for Dog Lovers</Option>
            <Option value="trending-items">Trending Items</Option>
            <Option value="christmas-gifts">Christmas Gifts</Option>
            {/* Add more collections as needed */}
          </Select>
        </Form.Item>

        <Form.Item
          name="tags"
          label="Tags"
        >
          <Select mode="tags">
            <Option value="pillow">pillow</Option>
            <Option value="pet-lovers">pet lovers</Option>
            <Option value="personalized">Personalized</Option>
            {/* Add more tags as needed */}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Create Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateProduct;