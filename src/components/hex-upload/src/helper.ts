/**
 * 自定义文件类型校验
 * @param file 文件
 * @param accepts 文件校验类型
 * @returns
 */
export function checkFileType(file: File, accepts: string[]) {
  const newTypes = accepts.join('|');
  // const reg = /\.(jpg|jpeg|png|gif|txt|doc|docx|xls|xlsx|xml)$/i;
  const reg = new RegExp(`\\.(${newTypes})$`, 'i');

  return reg.test(file.name);
}

/**
 * 校验该文件是否是图片
 * @description 匹配规则: jpg|jpeg|png|gif|webp|bmp|tiff
 * @param file 文件
 * @returns
 */
export function checkImgType(file: File) {
  return isImgTypeByName(file.name);
}

export function isImgTypeByName(name: string) {
  return /\.(jpg|jpeg|png|gif|webp|bmp|tiff)$/i.test(name);
}

export function getBase64WithFile(file: File) {
  return new Promise<{
    result: string;
    file: File;
  }>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve({ result: reader.result as string, file });
    reader.onerror = (error) => reject(error);
  });
}
