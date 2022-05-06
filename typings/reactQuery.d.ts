export interface IError {
  message: string;
  cause: {
    code: number;
    errors: {
      message: string;
      domain: string;
      reason: string;
    }[];
  };
}
