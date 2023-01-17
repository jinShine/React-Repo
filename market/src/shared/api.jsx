import axios from "axios";

// 단순 get요청으로 인증값이 필요없는 경우
const axiosApi = (url, options) => {
  const instance = axios.create({ baseURL: url, ...options });
  return instance;
};

// post, delete등 api요청 시 인증값이 필요한 경우
const axiosAuthApi = (url, options) => {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0IiwiYXV0aCI6IlVTRVIiLCJleHAiOjE2NzM5NTUwNjIsImlhdCI6MTY3Mzk1MTQ2Mn0.Tw9Y7vJehJUm_qxjeNZmGAynyHamoGSUn6UNKImnE0Q";
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: "Bearer " + token },
    ...options,
  });
  return instance;
};

export const defaultInstance = axiosApi(process.env.REACT_APP_BASE_URL);
export const authInstance = axiosAuthApi(process.env.REACT_APP_BASE_URL);

// 테스트용
const AUTH_TOKEN = "123";

export const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 10000,
  maxBodyLength: Infinity,
  maxContentLength: Infinity,
});

client.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
// client.defaults.common["Authorization"] = AUTH_TOKEN;

axios.interceptors.response.use(
  function (response) {
    // Status Code 200범위 내, 즉 성공했을때
    return response;
  },
  function (error) {
    // Status Code 200범위 밖, 즉 실패했을때
    if (error.response.status === 401 || error.response.satus === 406) {
      // window.location.href = "/signin";
    }
    if (error.response.status === 403) {
      window.alert("권한이 없는 사용자입니다.");
    }
    if (error.response.status === 403) {
      window.alert("서버 오류가 발생하였습니다.");
    }
    if (error.response.status === 404) {
      window.alert("데이터를 찾을 수 없습니다.");
    }

    return Promise.reject(error);
  }
);
