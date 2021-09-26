import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { BaseLayout } from '../page-components/BaseLayout/BaseLayout';
import { BucketTable } from '../page-components/BucketTable/BucketTable';

const getFetcher = (url: string) => {
  return axios.get(url).then((res) => res.data);
};

const getPrefix = (path: string | string[] | undefined): string => {
  if (path === undefined) {
    return '';
  }
  if (typeof path === 'string') {
    return path;
  }
  return path.join('/');
};

export default function Home() {
  const router = useRouter();
  const [prefix, setPrefix] = useState(getPrefix(router.query.path));
  useEffect(() => {
    setPrefix(getPrefix(router.query.path));
  }, [router]);
  const { data: keyOrPrefixList, error } = useSWR(
    `/api/list-objects${prefix ? `?prefix=${prefix}/` : ''}`,
    getFetcher
  );
  return (
    <BaseLayout>
      <div style={{ padding: '16px 50px', minHeight: 'calc(100vh - 64px)' }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold', padding: '0 0 16px 0' }}>
          Bucket: {process.env.NEXT_PUBLIC_S3_BUCKET_NAME}
        </div>
        <BucketTable prefix={prefix} keyOrPrefixList={keyOrPrefixList} />
      </div>
    </BaseLayout>
  );
}
