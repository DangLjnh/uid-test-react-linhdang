import { useEffect, useCallback, useState } from 'react';
// import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../states/actions/productActions';
import { Alert, Select, Spin, Table, Tag } from 'antd';
import withLoadingIndicator from '../../hoc/withLoadingIndicator';


const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  console.log(products);
  
  const [selectedTags, setSelectedTags] = useState([]);

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

  const columns = [
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
      <div className="mb-4">
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Filter by tags"
          onChange={handleTagChange}
        >
          {allTags.map(tag => (
            <Select.Option key={tag} value={tag}>{tag}</Select.Option>
          ))}
        </Select>
      </div>
      <Table columns={columns} dataSource={filteredProducts} rowKey="id" />
    </div>
  );
};

const ProductsWithLoadingIndicator = withLoadingIndicator(Products);
export default ProductsWithLoadingIndicator;