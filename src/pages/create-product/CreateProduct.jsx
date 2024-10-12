import { useEffect, useMemo, useState } from 'react';
import { Form, Input, InputNumber, Upload, Button, Select, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { formatCurrency, parseCurrency } from '../../helpers/utils';
import withLoadingIndicator from '../../hoc/withLoadingIndicator';
import useProductApi from '../../hooks/useProductApi';
import useUploadMedia from '../../hooks/useUploadMedia';

const { Option } = Select;

const CreateProduct = () => {
  const [form] = Form.useForm();
  const { products, isLoading, error, fetchProducts, createProduct } = useProductApi();
  const { uploadMedia, uploadedMediaUrls } = useUploadMedia();

  const [fileList, setFileList] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [productTags, setProductTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMediaUploaded, setIsMediaUploaded] = useState(false);
  const [dataForm, setDataForm] = useState({});

  useEffect(() => {
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isMediaUploaded) {
        dataForm.media = uploadedMediaUrls;
        createProduct(dataForm);
        setIsSubmitting(isLoading);
        setIsMediaUploaded(false);
        if(!isLoading) {
            message.success('Product created successfully!');
            form.resetFields();
        }
        if(error) {
            message.error('Error creating product. Please try again!');
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedMediaUrls, isMediaUploaded]);

  const onFinish = async (values) => {
    setIsSubmitting(true);
    const mediaFiles = values.media;
    await uploadMedia(mediaFiles);
    setDataForm(values);
    setIsMediaUploaded(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const { uniqueTags, uniqueProductTypes } = useMemo(() => {
    let tags = [];
    let types = [];
    products.forEach(product => {
      if (product.tags) {
        tags.push(...product.tags);
      }
      if (product.product_type) {
        types.push(product.product_type);
      }
    });
    return {
      uniqueTags: [...new Set(tags)],
      uniqueProductTypes: [...new Set(types)]
    };
  }, [products]);

  useEffect(() => {
    setProductTypes(uniqueProductTypes);
    setProductTags(uniqueTags);
  }, [uniqueProductTypes, uniqueTags]);

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
            rules={[                                                                                                         
                { required: true, message: 'Please input the product price!' },                                                
                { type: 'number', min: 0, message: 'Price must be a positive number!' }                                        
            ]}
          >
            <InputNumber
              formatter={formatCurrency}
              parser={parseCurrency}
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
            name="product_type"
            label="Product Type"
          >
            <Select placeholder="Select a product type">
            {productTypes?.map((type, index) => (
                <Option key={index} value={type}>
                    {type}
                </Option>
            ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="tags"
            label="Tags"
          >
            <Select mode="tags" style={{ width: '100%' }} placeholder="Product tags">
            {productTags?.map((tag, index) => (
                <Option key={index} value={tag}>
                    {tag}
                </Option>
            ))}
            </Select>
          </Form.Item>

            <Button type="primary" htmlType="submit" className="w-full" loading={isSubmitting} disabled={isSubmitting}>
                Create Product
            </Button>
        </Form>
      </div>
    </>
  );
};

const CreateProductsWithLoadingIndicator = withLoadingIndicator(CreateProduct);
export default CreateProductsWithLoadingIndicator;