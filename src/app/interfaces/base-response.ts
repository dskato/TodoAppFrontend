export interface BaseResponse<T> {
  code: number;
  message: string | null;
  data: T;
  codeText: string;
}
