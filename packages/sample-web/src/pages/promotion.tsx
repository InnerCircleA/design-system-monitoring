import { page } from 'component-tracking-anotation';
import { Button as LinkButton } from 'ui-toolkit';

page();

export default function Promotion() {
  return (
    <div>
      <h1>예시 프로모션 페이지입니다.</h1>
      <LinkButton theme="primary">신청하로가기</LinkButton>
      <LinkButton theme="primary">더 자세히 알아보기</LinkButton>
    </div>
  );
}
