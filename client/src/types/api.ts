export interface Error {
  response?: {
    data?: {
      message?: string;
      stack?: string;
    };
    status?: number;
  };
  message?: string;
}
