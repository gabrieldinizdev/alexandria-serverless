import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import axios from "axios";

type WakeUpInputHandlerType = {
  url: string;
};

const wakeUp = async (baseUrl: string) => {
  console.log("fazendo requisição para o backend...");
  await axios.get(`${baseUrl}/health/wake-up`);
};

const handler = async (input: WakeUpInputHandlerType) => {
  try {
    const { url } = input;
    console.log("chamando função wakeup...");
    await wakeUp(url);

    console.log("finalizando requisição...");
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
