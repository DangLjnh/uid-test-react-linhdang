import { useEffect, useMemo, useState } from 'react';
import { Form, Input, InputNumber, Upload, Button, Select, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { formatCurrency, parseCurrency } from '../../helpers/utils';
import withLoadingIndicator from '../../hoc/withLoadingIndicator';
import useProductApi from '../../hooks/useProductApi';
import useUploadMedia from '../../hooks/useUploadMedia';
import { useNavigate, useParams } from 'react-router-dom';
import RichTextArea from '../../components/richTextArea';
import { validateUploadImage } from '../../helpers/validateForm';


const { Option } = Select;

const UpdateProduct = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, isLoading, error, fetchProduct, updateProduct, fetchProducts } = useProductApi();
  const { uploadMedia, uploadedMediaUrls } = useUploadMedia();

  const [fileList, setFileList] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [productTags, setProductTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMediaUploaded, setIsMediaUploaded] = useState(false);
  const [dataForm, setDataForm] = useState({});
  const [richTextValue, setRichTextValue] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      const product = await fetchProduct(id);
      form.setFieldsValue({
        title: product.title,
        description: product.description,
        price: product.price,
        media: product.media,
        product_type: product.product_type,
        tags: product.tags,
      });
      const fileListWithBase64 = await Promise.all(product.media.map(async (url, index) => {
        const base64 = await convertUrlToBase64(url);
        return {
          uid: `rc-upload-1728793302862-${index}`,
          percent: 0,
          name: `image${index}`,
          status: 'done',
          url,
          type: "image/jpeg",
          thumbUrl: base64,
        };
      }));
      setFileList(fileListWithBase64);     
    };
    loadProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (isMediaUploaded) {
        dataForm.media = uploadedMediaUrls;
        updateProduct(id, dataForm);
        setIsSubmitting(isLoading);
        setIsMediaUploaded(false);
        if(!isLoading) {
            message.success('Product updated successfully!');
            navigate('/products');
        }
        if(error) {
            message.error('Error updating product. Please try again!');
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedMediaUrls, isMediaUploaded]);

  useEffect(() => {
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const convertUrlToBase64 = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Update Product</h2>
        <Form
          form={form}
          name="update_product"
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
            <RichTextArea onChange={setRichTextValue} value={richTextValue} />
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
              beforeUpload={(file) => validateUploadImage(file, Upload)}
            >
              {fileList.length >= 8 ? null : (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
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
                Update Product
            </Button>
        </Form>
      </div>
    </>
  );
};

const UpdateProductWithLoadingIndicator = withLoadingIndicator(UpdateProduct);
export default UpdateProductWithLoadingIndicator;