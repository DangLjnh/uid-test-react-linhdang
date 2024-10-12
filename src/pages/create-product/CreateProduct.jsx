import { useState } from 'react';
import { Form, Input, InputNumber, Upload, Button, Select, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { validatePrice } from '../../helpers/validateForm';

const { Option } = Select;

const CreateProduct = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const onFinish = (values) => {
    console.log('Success:', values);
    // Handle form submission
    message.success('Product created successfully!');
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Create New Product</h2>
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
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the product description!' }]}
          >
            <ReactQuill theme="snow" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ validator: validatePrice }]}
          >
            <InputNumber
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            name="media"
            label="Media"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: 'Please upload at least one image!' }]}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleChange}
              beforeUpload={() => false}
            >
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item
            name="productType"
            label="Product Type"
          >
            <Select placeholder="Select a product type">
              <Option value="physical">Physical Product</Option>
              <Option value="digital">Digital Product</Option>
              <Option value="service">Service</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="tags"
            label="Tags"
          >
            <Select mode="tags" style={{ width: '100%' }} placeholder="Product tags">
              <Option value="new">New</Option>
              <Option value="featured">Featured</Option>
              <Option value="sale">Sale</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Create Product
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default CreateProduct;