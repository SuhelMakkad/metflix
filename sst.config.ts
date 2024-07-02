/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "metflix",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    new sst.aws.Nextjs("MyWeb", {
      environment: {
        TMBD_API_KEY: process.env.TMBD_API_KEY!
      }
    });
  },
});
