import * as dayjs from 'dayjs';

export const formatErrorResponse = (code: number, msg: any, data: any = {}) => {
  return {
    status: 0,
    error: code,
    msg: msg,
    currentTime: dayjs(new Date()).toISOString(),
    data: data,
  };
};

export const formatSuccessResponse = (
  code: number,
  msg: any,
  data: any = {},
) => {
  return {
    status: 1,
    error: code,
    msg: msg,
    currentTime: dayjs(new Date()).toISOString(),
    data: data,
  };
};
