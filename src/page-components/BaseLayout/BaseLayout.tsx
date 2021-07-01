import Layout, { Content, Header } from 'antd/lib/layout/layout';
import Head from 'next/head';
import { FunctionComponent } from 'react';

export const BaseLayout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Head>
        <title>S3 Browser</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Header>
          <span style={{ color: 'white', fontSize: '18px' }}>S3 Viewer</span>
        </Header>
        <Layout>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </>
  );
};
