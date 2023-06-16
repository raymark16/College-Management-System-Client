import { Layout } from 'antd';
import SiderComponent from './SiderComponent';
import SiteLayoutComponent from './SiteLayoutComponent';

const LayoutComponent = () => {
  return (
    <Layout style={{
      minHeight: '100vh',
    }}>
      <SiderComponent />
      <SiteLayoutComponent />
    </Layout>
  )
}

export default LayoutComponent