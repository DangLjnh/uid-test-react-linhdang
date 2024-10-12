import { Layout, Menu } from 'antd';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const AppLayout = ({ children }) => {
  const location = useLocation();

  // Define menu items using the `items` prop
  const menuItems = [
    {
      key: '/',
      label: <Link to="/">Home</Link>,
    },
    {
      key: '/products',
      label: <Link to="/products">Products</Link>,
    },
    {
      key: '/create-product',
      label: <Link to="/create-product">Create Product</Link>,
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Header className="bg-white">
        <div className="max-w-7xl mx-auto">
          <Menu
            mode="horizontal"
            className="border-b-0"
            items={menuItems}
            selectedKeys={[location.pathname]}
          />
        </div>
      </Header>
      <Content className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </Content>
      <Footer className="text-center">
        © {new Date().getFullYear()} Your Company Name. All rights reserved.
      </Footer>
    </Layout>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;