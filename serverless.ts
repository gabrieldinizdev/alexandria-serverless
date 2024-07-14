import type { AWS } from "@serverless/typescript";

import wakeup from "@functions/wakeup";

const serverlessConfiguration: AWS = {
  service: "alexandria-serverless",
  frameworkVersion: "3",
  useDotenv: true,
  plugins: [
    "serverless-esbuild",
    "serverless-offline",
    "serverless-deployment-bucket",
  ],
  provider: {
    name: "aws",
    region: "us-east-1",
    deploymentBucket: {
      name: "lambda-${self:service}-${self:provider.stage, 'dev'}",
      serverSideEncryption: "AES256",
    },
    runtime: "nodejs20.x",
    stage: "${opt:stage, 'dev'}",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },

  // import the function via paths
  functions: { wakeup },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
