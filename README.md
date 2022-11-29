# s3-browser
A simple NextJS application to view s3 prefixes and files in a local S3 bucket.
## Getting Started
First, create a `.env.local` config file. You may refer to `.env.local.example` for the required values.

Next, make sure your AWS credentials are loaded into your bash environment.

Next, build and run the server:

```bash
npm run build

npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the page and browse your S3 bucket!

This has been tested with [Localstack](https://github.com/localstack/localstack)

## Development
```bash
npm run dev
```
You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Upcoming Features:
- [ ] Add user input fields to remove need to use environment file
- [ ] Refactor code
