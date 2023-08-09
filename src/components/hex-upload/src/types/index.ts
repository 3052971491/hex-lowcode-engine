import { UploadProps } from 'ant-design-vue';

export type Recordable<T = any> = Record<string, T>;

export interface FetchParams {
  data?: Recordable;
  file?: any;
  name?: string;
  filename?: string;
  [key: string]: any;
}

export interface HexUploadProps extends Omit<UploadProps, 'accept'> {
  accept: string[];
  maxFileSize: number;
  api: (opt?: FetchParams) => Promise<any>;
}

export interface UploadActionType {
  setProps(option: Partial<HexUploadProps>): void;
  reload: (opt?: FetchParams) => Promise<void>;
}

export enum UploadResultStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  UPLOADING = 'uploading',
  REMOVED = 'removed',
}

export interface UploadApiResult {
  message: string;
  code: number;
  url: string;
}

export interface FileItem {
  thumbUrl?: string;
  name: string;
  size: string | number;
  type?: string;
  percent: number;
  file: File;
  status?: UploadResultStatus;
  responseData?: UploadApiResult;
  uuid: string;
}

export interface PreviewFileItem {
  url: string;
  name: string;
  type: string;
}
