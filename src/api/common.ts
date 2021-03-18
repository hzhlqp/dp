import axios from "axios";
import store from "../store";
import router from "../router";
import { Message } from "element-ui";

// http request 拦截器
axios.interceptors.request.use(
  config => {
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    router.replace({ path: "/error", query: { type: "page-err" } });
    // 对返回的错误处理
    return Promise.reject(error);
  }
);

const axiosCreate: any = (
  type: string,
  path: string,
  data: any,
  query: any
) => {
  let squery: string = "";
  if (query) {
    for (let k in query) {
      let split: string = "";
      if (squery === "") {
        split = "?";
      } else {
        split = "&";
      }
      squery += split + k + "=" + query[k];
    }
  }

  let _token: string = store.getters.getToken;

  // token不可为空, 登录页面无需token
  if (!_token && router.history.current.path != "/login") {
    router.replace({ path: "/login" });
  }

  let instance = axios.create({
    headers: {
      Authorization: _token
    }
  });

  // 跨域
  instance.defaults.withCredentials = true;

  // 设置cookie
  if (type === "get") {
    return instance({
      method: type,
      //   url: API_BASE_URL + path,
      url: path,
      params: data
    });
  } else if (type === "post") {
    return instance({
      method: type,
      //   url: API_BASE_URL + path + squery,
      url: path + squery,
      data: data
    });
  }
};

let routePath: string = "";
export const http = (type: string, path: string, data: any, query: any) => {
  return new Promise<any>((resolve, reject) => {
    axiosCreate(type, path, data, query)
      .then((res: any) => {
        let _result = res.data.data || data || {};

        // 请求接口成功
        if (res.data.code == 0) {
          resolve(_result);

          // token过期
        } else if (res.data.code == 499) {
          // 弹窗过多拦截
          if (!store.getters.getToken && !path.match("/login")) return;
          store.commit("SET_TOKEN", "");

          Message({
            message: "token expired, please login again",
            type: "error"
          });

          router.push({
            path: "/login",
            query: { reurl: router.history.current.fullPath }
          });

          // 没权限
        } else if (res.data.code == 509) {
          resolve("");

          // 防止重复提示
          if (routePath === router.history.current.path) return;
          routePath = router.history.current.path;
          Message.closeAll();
          Message({
            duration: 30000000,
            message: "No data permission, please visit other pages",
            type: "error"
          });
          // 报错了
        } else {
          if (path.match("/login")) {
            Message({
              message: "Incorrect username or password",
              type: "error"
            });
            resolve("");
          } else {
            Message({
              message: "request error",
              type: "error"
            });
          }
        }

        if (routePath !== router.history.current.path) {
          Message.closeAll();
        }

        // 当前请求路由地址
        routePath = router.history.current.path;
      })
      .catch((res: any) => {
        console.log(res);
      });
  });
};
