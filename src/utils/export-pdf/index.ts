import html2canvas, { Options } from 'html2canvas';
import jsPDF from 'jspdf';

export interface DomToPdfOption {
  /** 导出文件名称 */
  name: string;
  /**
   * 水印名称
   * @description 当不为空时会生成水印
   */
  watermarkName: '';
}

/**
 * 导出为PDF
 * @description 设计器打印方案
 * @param dom DOM节点
 * @returns
 */
export async function domToPdf(dom: HTMLElement, option?: Partial<DomToPdfOption>) {
  if (!dom) return Promise.reject();
  const op = {
    allowTaint: false, // 允许跨域（图片跨域相关）
    useCORS: true, // （图片跨域相关）
    scale: 2,
    dpi: 300,
    logging: false,
    backgroundColor: '#FFFFFF', // 如果指定的div没有设置背景色会默认成黑色,这里是个坑
  } as Partial<Options>;
  // a4纸的尺寸[595.28,841.89]
  const A4Width = 595.28;
  const A4Height = 841.89;
  const canvas = await html2canvas(dom, op);
  const contentWidth = canvas.width;
  const contentHeight = canvas.height;

  // 一页pdf显示html页面生成的canvas高度;
  const pageHeight = (contentWidth / 592.28) * A4Height;

  // 未生成pdf的html页面高度
  let leftHeight = contentHeight;

  // 页面偏移
  let position = 20;

  // html页面生成的canvas在pdf中图片的宽高
  const imgWidth = A4Width - 40;
  const imgHeight = (imgWidth / contentWidth) * contentHeight;

  addWatermark(canvas, option?.watermarkName);

  const pageData = canvas.toDataURL('image/jpeg', 1);
  const pdf = new jsPDF('portrait', 'pt', 'a4');

  // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
  // 当内容未超过pdf一页显示的范围，无需分页
  if (leftHeight < pageHeight) {
    pdf.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight);
  } else {
    while (leftHeight > 0) {
      pdf.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight);
      leftHeight -= pageHeight;
      position -= A4Height;
      // 避免添加空白页
      if (leftHeight > 0) {
        pdf.addPage();
      }
    }
  }
  pdf.save(option?.name || 'hex-lowcode-engine');
}

/**
 * 添加水印
 * @param canvas
 * @param name
 */
function addWatermark(canvas: HTMLCanvasElement, name?: string) {
  if (!name) return;
  const ctx: any = canvas.getContext('2d');
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.rotate((20 * Math.PI) / 180);
  ctx.font = '20px Microsoft Yahei';
  ctx.fillStyle = 'rgba(184, 184, 184, 0.8)';
  for (let i = canvas.width * -1; i < canvas.width; i += 240) {
    for (let j = canvas.height * -1; j < canvas.height; j += 200) {
      // 填充文字，x 间距, y 间距
      ctx.fillText(name, i, j);
    }
  }
}
