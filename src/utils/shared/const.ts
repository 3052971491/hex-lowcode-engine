export const __WillFetch__ = `const willFetch = (vars, config) => {
  // 通过 vars 可以更改查询参数
  // 通过 config.header 可以更改 header
  // 通过 config.url 可以更改  url
  // console.log(vars, config); // 可以查看还有哪些参数可以修改。
};`;

export const __FitHandler__ = `const fit = (response) => {
  const content = (response.result !== undefined) ? response.result : response;
  const error = {
    code: response.code,
    message: response.message ||
      (response.errors && response.errors[0] && response.errors[0].msg) ||
      response.result || '远程数据源请求出错, success is false',
  };
  let success = true;
  if (response.code === 200) {
    success = true;
  } else {
    success = false;
  };
  return {
    content,
    success,
    error,
  };
};`;

export const __DataHandler__ = `const didFetch = (content) => {
  // content.b = 1; 修改返回数据结构中的 b 字段为1
  return content; // 重要，需返回 content
};`;

export const __ErrorHandler__ = `const onError = (error) => {
  // console.log(error);
  // 可以在这里做弹框提示等操作
};`;
