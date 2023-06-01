export function buildUUID(len = 8, radix = 0, containTime = 0): string {
  const now = new Date();
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid = [];
  let i;
  radix = radix || chars.length;
  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    let r;
    uuid[8] = '-';
    uuid[13] = '-';
    uuid[18] = '-';
    uuid[23] = '-';
    uuid[14] = '4';
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = Math.random() * 16;
        uuid[i] = chars[i === 19 ? 0x3 : r];
      }
    }
  }
  if (containTime == null && containTime === true) {
    return `${now.getTime()}${uuid.join('')}`;
  }
  return uuid.join('');
}

let unique = 0;
export function buildShortUUID(prefix = ''): string {
  const time = Date.now();
  const random = Math.floor(Math.random() * 1000000000);
  unique++;
  return `${prefix}_${random}${unique}${String(time)}`;
}

export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/** 是否是URL地址 */
export function isURL(str: string) {
  return /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/.test(str);
}

/** await异步等待包装器 */
export function to<T, U = Error>(promise: Promise<T>, errorExt?: object): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        const parsedError = { ...err, ...errorExt };
        return [parsedError, undefined];
      }

      return [err, undefined];
    });
}
