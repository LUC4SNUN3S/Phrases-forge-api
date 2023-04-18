export interface IResponseApiOk {
  success: boolean;
  message: string;
  data?: any;
}

export interface IResponseApiData {
  success: boolean;
  data: any;
}

export interface IResponseApiError {
  status: number;
  messages: string[];
}

export const responseApiOk = function (
  message: string,
  data: any = null,
): IResponseApiOk {
  return {
    success: true,
    message,
    data,
  };
};

export const responseApiData = function (data: any): IResponseApiData {
  return { success: true, data: data };
};

export const responseApiError = function (
  messages: string[],
  status: number,
): IResponseApiError {
  return { status, messages };
};
