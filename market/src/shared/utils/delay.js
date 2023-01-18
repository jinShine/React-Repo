export const gDelay = (time = COMMON_DEALY_TIME, value) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(value), time);
  });

export const COMMON_DEALY_TIME = 1500;
