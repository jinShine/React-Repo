import { Button } from 'antd';
import { FcGoogle } from 'react-icons/fc';

interface IProps {
  onClick: () => void;
}

export const GoogleLoginButton = function ({ onClick }: IProps) {
  return (
    <Button shape="round" icon={<FcGoogle />} size="large" onClick={onClick}>
      Google 계정으로 시작하기
    </Button>
  );
};
