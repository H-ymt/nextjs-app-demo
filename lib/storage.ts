import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";

const client = new S3Client({
  region: "auto",
  endpoint: process.env.CLOUDFLARE_ENDPOINT as string,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.CLOUDFLARE_ACCESS_KEY as string,
  },
});

export const putImage = async (file: File, pathname: string) => {
  const uploadParams: PutObjectCommandInput = {
    Bucket: "next-demo",
    Key: pathname,
    Body: file,
    ContentType: "image/png",
    ACL: "public-read",
  };

  const command = new PutObjectCommand(uploadParams);
  await client.send(command);

  return `${process.env.IMAGE_HOST_URL}/${pathname}`;
};

export const deleteImage = async (pathname: string) => {
  const uploadParams: DeleteObjectCommandInput = {
    Bucket: "next-demo",
    Key: pathname,
  };

  const command = new DeleteObjectCommand(uploadParams);
  return client.send(command);
};
