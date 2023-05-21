import ServerError from './server_error';

export default class BadRequestError extends ServerError {
  constructor(message: string) {
    super({ statusCode: 400, message });
  }
}
