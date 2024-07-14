import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import axios from "axios";

type WakeUpInputHandlerType = {
  url: string;
};

const wakeUp = async (baseUrl: string) => {
  await axios.get(`${baseUrl}/health/wake-up`);
};

const handler = async (input: WakeUpInputHandlerType) => {
  try {
    const { url } = input;
    await wakeUp(url);

    return formatJSONResponse({
      message: "successfull",
    });
  } catch (error) {
    return formatJSONResponse({
      message: "error",
    });
  }
};

export const main = middyfy(handler);
