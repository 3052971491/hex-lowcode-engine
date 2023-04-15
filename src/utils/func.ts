import { JSFunction } from '/@/types/value-type';

export function BuildFunction(name: string, ...args: any) {
  const code = `try {
        ${args[args.length - 1]}
        ${name ? `return ${name}()` : ''}
      } catch (error) {
        console.error(error);
      }`;
  args[args.length - 1] = code;
  const result = new Function(...args);
  return result;
}

/**
 * 将方法字符串解析成对象
 * @param code 方法字符串
 * @param context 上下文
 * @returns
 */
export function StringParsedToFunction(
  code: string,
  context: any = null,
): {
  [key: string]: JSFunction;
} {
  // 匹配所有以export function 开头, { 结尾的字符串
  const regExp = /export function.*{/g;
  const result = code.match(regExp);

  // 所有方法的名称
  const functionName: string[] =
    result?.map((res: string) => {
      const flag = 'export function';
      const first = res.indexOf(flag);
      if (first === -1) {
        return '';
      }
      const last = res.indexOf('(');
      if (last === -1) {
        return '';
      }
      return res.substring(flag.length, last).trim();
    }) ?? [];
  let originCode = code;
  // 去除export
  originCode = originCode.replaceAll('export', '');
  const assemblyCode = `return function () {
  ${originCode}
  return {
    ${functionName.join(',')}
  }
}`;

  const res = BuildFunction('', assemblyCode).call(context);
  const methods = res();

  const obj: {
    [key: string]: JSFunction;
  } = {};
  for (const key in methods) {
    if (Object.prototype.hasOwnProperty.call(methods, key)) {
      obj[key] = {
        type: 'JSFunction',
        value: methods[key].toString(),
      };
    }
  }

  return obj;
}
