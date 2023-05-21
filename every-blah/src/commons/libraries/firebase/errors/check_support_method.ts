import BadRequestError from './bad_request_error';

export default function checkSupportMethod(supportMethods: string[], method?: string) {
  if (supportMethods.indexOf(method!) === -1) {
    throw new BadRequestError('지원하지 않는 method 입니다.');
  }
}
