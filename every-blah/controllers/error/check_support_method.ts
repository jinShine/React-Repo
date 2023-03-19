import BadRequest from './bad_request';

export default function checkSupportMethod(supportMethod: string[], method?: string) {
  if (supportMethod.indexOf(method!) === -1) {
    throw new BadRequest('지원하지 않는 method 입니다.');
  }
}
