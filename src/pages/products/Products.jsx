import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../states/actions/productActions';
import { Alert, Select, Spin, Table, Tag, Image, Button, Modal, message } from 'antd';
import withLoadingIndicator from '../../hoc/withLoadingIndicator';
import useProductApi from '../../hooks/useProductApi';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error: errorProduct, deleteProduct } = useProductApi();

  const { products, loading, error } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isDeleteAllDisabled, setIsDeleteAllDisabled] = useState(true);

  const fetchProductList = useCallback(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    fetchProductList();
  }, [fetchProductList]);

  useEffect(() => {
    if (selectedTags.length === 0) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product =>
        selectedTags.every(tag => product.tags && product.tags.includes(tag))
      ));
    }
  }, [products, selectedTags]);

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this product?',
      onOk: async () => {
        await deleteProduct(id);
        if (!isLoading) {
          fetchProductList();
        }
        if (errorProduct) {
          message.error('Error delete product. Please try again!');
        }
      },
    });
  };

  const handleDeleteAll = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete all selected products?',
      onOk: async () => {
        for (const id of selectedRowKeys) {
          await deleteProduct(id);
        }
        if (!isLoading) {
          fetchProductList();
        }
        if (errorProduct) {
          message.error('Error deleting products. Please try again!');
        }
        setSelectedRowKeys([]);
        setIsDeleteAllDisabled(true);
      },
    });
  };

  const handleUpdate = (id) => {
    navigate(`/update-product/${id}`);
  };

  const handleSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
    setIsDeleteAllDisabled(selectedRowKeys.length === 0);
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'media',
      key: 'media',
      render: media => {
        const image = media[0]; // Get the first item in the array
        return <Image src={image} className='object-cover' alt={image} width={100} height={100} />;
      },
    },
    {
      title: 'Product Title',
      dataIndex: 'title',
      key: 'title',
      render: title => title.length > 50 ? `${title.substring(0, 50)}...` : title,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: price => `$${price.toFixed(2)}`,
    },
    {
      title: 'Product Type',
      dataIndex: 'product_type',
      key: 'productType',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags && tags.map(tag => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className='flex flex-row gap-3'>
          <Button type="default" onClick={() => handleUpdate(record.id)} disabled={isLoading} loading={isLoading}>Update</Button>
          <Button type="default" danger onClick={() => handleDelete(record.id)} disabled={isLoading} loading={isLoading}>Delete</Button>
        </div>
      ),
    },
  ];

  const allTags = [...new Set(products.flatMap(product => product.tags).filter(tag => tag != null))];

  const handleTagChange = (selectedTags) => {
    setSelectedTags(selectedTags);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert message="Error" description={error} type="error" showIcon />
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Products</h2>
      <div className="mb-4 flex justify-between items-center">
        <Select
          mode="multiple"
          style={{ width: '80%' }}
          placeholder="Filter by tags"
          onChange={handleTagChange}
        >
          {allTags.map(tag => (
            <Select.Option key={tag} value={tag}>{tag}</Select.Option>
          ))}
        </Select>
        <Button
          type="link"
          danger
          disabled={isDeleteAllDisabled}
          onClick={handleDeleteAll}
        >
          Delete All
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredProducts}
        rowKey="id"
        rowSelection={{
          selectedRowKeys,
          onChange: handleSelectChange,
        }}
      />
    </div>
  );
};

const ProductsWithLoadingIndicator = withLoadingIndicator(Products);
export default ProductsWithLoadingIndicator;