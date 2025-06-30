export class BaseResponse {
  static success(
    response: any = null,
    message = 'OK',
    flag: number | null = null,
  ) {
    return {
      statusCode: 201,
      message,
      flag: flag,
      body: response,
    };
  }
}
