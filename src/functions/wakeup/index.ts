import { handlerPath } from "@libs/handler-resolver";
import { SettingsFunctions } from "@t/serverless.type";

const settings: SettingsFunctions = {
  name: "${self:service}-${self:provider.stage}",
  logRetentionInDays: 7,
  memorySize: 128,
  description: "Health Check - alexandria",
  timeout: 10,
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      schedule: {
        rate: ["cron(0/5 * * * ? *)"], // every 5 minutes
        input: {
          url: "${env:BASE_URL}",
        },
      },
    },
  ],
};

export default settings;
