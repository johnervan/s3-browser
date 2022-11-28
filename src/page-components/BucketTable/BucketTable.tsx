import { Table } from 'antd';
import Column from 'antd/lib/table/Column';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import { IBucketList } from '../../model/s3';

type BucketTableProps = {
  keyOrPrefixList: [];
  prefix: string;
};

const generateBreadcrumbs = (pathList: string[]) => {
  const breadcrumbList: any[] = [
    {
      crumb: '_',
      link: '/',
    },
  ];
  pathList.forEach((path, index) => {
    breadcrumbList.push({
      crumb: path,
      link: pathList.slice(0, index + 1).join('/'),
    });
  });
  return breadcrumbList;
};

export const BucketTable: FunctionComponent<BucketTableProps> = ({ keyOrPrefixList, prefix }) => {
  return (
    <Table dataSource={keyOrPrefixList} pagination={false} rowKey="keyOrPrefix">
      <Column
        title={
          prefix
            ? generateBreadcrumbs(prefix.split('/')).map((obj) => (
                <>
                  <Link key={obj.link} href={obj.link}>
                    {obj.crumb}
                  </Link>
                  {' / '}
                </>
              ))
            : '/'
        }
        dataIndex="keyOrPrefix"
        key="keyOrPrefix"
        render={(keyOrPrefix, row: IBucketList) => {
          if (keyOrPrefix.charAt(keyOrPrefix.length - 1) === '/') {
            keyOrPrefix = keyOrPrefix.replace(/\/\s*$/, '');
            return <Link href={`/${keyOrPrefix}`}>{`${keyOrPrefix.split('/').pop()}/`}</Link>;
          }
          return (
            <a
              target="_blank"
              href={`${row.baseUrl}/${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}/${keyOrPrefix}`}
              rel="noopener noreferrer"
            >
              {keyOrPrefix.split('/').pop()}
            </a>
          );
        }}
      />
    </Table>
  );
};
