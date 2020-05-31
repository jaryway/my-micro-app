import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const BasicLayout: React.FunctionComponent<any> = ({ history, children }) => {
  const [{ collapsed }, setState] = useState({ collapsed: false });

  const toggle = () => {
    setState((prev) => ({ collapsed: !prev.collapsed }));
  };

  function logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  return (
    <Layout id='components-layout-demo-custom-trigger'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='logo' />
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['1']}
          onClick={({ key }) => {
            history.push(key);
            // console.log('onMenuClick', this.props);
          }}
        >
          <Menu.Item key='/user' icon={<UserOutlined />}>
            User
          </Menu.Item>
          <Menu.Item key='/car' icon={<VideoCameraOutlined />}>
            Car
          </Menu.Item>
          <Menu.Item key='/coffee' icon={<UploadOutlined />}>
            Coffe
          </Menu.Item>
          <Menu.Item key='/sub1' icon={<UploadOutlined />}>
            SubApp1
          </Menu.Item>
          <Menu.Item key='/sub2' icon={<UploadOutlined />}>
            SubApp2
          </Menu.Item>
          <Menu.Item key='/sub3' icon={<UploadOutlined />}>
            SubApp3
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header className='site-layout-background' style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
          <div style={{ float: 'right', paddingRight: 24 }}>
            <Button type='primary' onClick={logout}>
              LogOut
            </Button>
          </div>
        </Header>
        <Content
          className='site-layout-background'
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

// class BasicLayout extends React.Component {
//   state = {
//     collapsed: false,
//   };

//   toggle = () => {
//     this.setState({
//       collapsed: !this.state.collapsed,
//     });
//   };

//   render() {

//   }
// }

export default BasicLayout;
