export default class CustomServerError extends Error {
  public statusCode: number;

  public location?: string; // 리다이렉트

  constructor({ statusCode = 500, message, location }: { statusCode?: number; message: string; location?: string }) {
    super(message);
    this.statusCode = statusCode;
    this.location = location;
  }

  serializeError(): { message: string } | string {
    return { message: this.message };
  }
}
