import {
  ListBucketsCommand,
  ListBucketsCommandOutput,
  ListObjectsV2Command,
  ListObjectsV2CommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import { IBucketList } from '../../model/s3';

const S3_ENDPOINT_URL = process.env.S3_ENDPOINT_URL || 'https://s3.amazonaws.com';

const s3 = new S3Client({
  region: 'ap-southeast-1',
  endpoint: process.env.S3_ENDPOINT_URL,
  forcePathStyle: true,
});

export const listBuckets = async (): Promise<any> => {
  try {
    const response: ListBucketsCommandOutput = await s3.send(new ListBucketsCommand({}));
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const listObjects = async (prefix = ''): Promise<IBucketList[]> => {
  try {
    const response: ListObjectsV2CommandOutput = await s3.send(
      new ListObjectsV2Command({
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
        Prefix: prefix,
        Delimiter: '/',
      })
    );
    const keyOrPrefixList = [];
    keyOrPrefixList.push(
      ...(response.CommonPrefixes
        ? response.CommonPrefixes.map((data) => ({
            keyOrPrefix: data.Prefix || '',
            baseUrl: S3_ENDPOINT_URL,
          }))
        : [])
    );
    keyOrPrefixList.push(
      ...(response.Contents
        ? response.Contents?.map((data) => ({
            keyOrPrefix: data.Key || '',
            baseUrl: S3_ENDPOINT_URL,
          }))
        : [])
    );
    return keyOrPrefixList;
  } catch (err) {
    console.log(err);
    return [];
  }
};
