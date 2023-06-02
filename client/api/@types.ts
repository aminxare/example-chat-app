export interface Response<T> {
  message?: string | null;
  data: T;
}
