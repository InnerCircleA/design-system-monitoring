import { page } from 'component-tracking-anotation';
import { WebviewLayout } from '../components/layout/WebviewContainer';
import { Button } from 'ui-toolkit';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../components/CustomButton';

page();
const DetailPage = () => {
  const navigate = useNavigate();

  const handleClickBackButton = () => navigate(-1);
  const handleClickHomeButton = () => navigate('/');

  const buttonStyle1 = {
    style: { background: '#00FF00' },
  };

  const buttonStyle2 = {
    style: { fontSize: 30 },
  };

  return (
    <WebviewLayout>
      <ContentContainer>
        <h1>Detail Page</h1>
        <p style={{ marginTop: '1rem' }}>
          this page have two buttons.
          <li>Home Button with "theme: primary"</li>
          <li>Back Button with "theme: secondary"</li>
        </p>
        <p>Below Custom Button</p>
        <CustomButton>Custom</CustomButton>
        <Button {...buttonStyle1} {...buttonStyle2} theme={'primary'}>
          Good
        </Button>
      </ContentContainer>
      <BottomButtonGroup>
        <Button theme={'secondary'} onClick={handleClickBackButton}>
          Back
        </Button>
        <Button theme={'primary'} onClick={handleClickHomeButton}>
          Home
        </Button>
      </BottomButtonGroup>
    </WebviewLayout>
  );
};

const ContentContainer = styled.div`
  flex: 1;
  padding: 1rem;
`;

const BottomButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0.8rem 1rem;
  & > button + button {
    margin-left: 1rem;
  }
`;

export default DetailPage;
