import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import axios from "axios";

type WakeUpInputHandlerType = {
  url: string;
};

const handler = async (input: WakeUpInputHandlerType) => {
  try {
    const { url } = input;

    const { data } = await axios.get(`${url}/health/wake-up`);

    console.log("finalizando requisição com:", data);

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
