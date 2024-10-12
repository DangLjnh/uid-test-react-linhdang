// import React from 'react';
import { Layout, Menu } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const AppLayout = ({ children }) => {
  return (
    <Layout className="min-h-screen">
      <Header className="bg-white">
        <div className="max-w-7xl mx-auto">
          <Menu mode="horizontal" className="border-b-0">
            <Menu.Item key="home">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="products">
              <Link to="/products">Products</Link>
            </Menu.Item>
            <Menu.Item key="create-product">
              <Link to="/create-product">Create Product</Link>
            </Menu.Item>
          </Menu>
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