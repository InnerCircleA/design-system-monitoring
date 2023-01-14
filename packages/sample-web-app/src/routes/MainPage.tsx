import { page } from "component-tracking-anotation";
import { Button } from "ui-toolkit";
import { useNavigate } from "react-router-dom";
import { WebviewLayout } from "../components/layout/WebviewContainer";
import styled from "@emotion/styled";

page();

const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const handleClickDetailButton = () => {
        navigate("/detail")
    }

    return <WebviewLayout>
        <ContentContainer>
            <h1>
                Main Page
            </h1>
            <p style={{ marginTop: "1rem" }}>
                this page has one button.
                <li>Detail Button with "theme: primary"</li>
            </p>
        </ContentContainer>
        <BottomButtonGroup>
            <Button theme={"primary"} onClick={handleClickDetailButton}>Detail</Button>
        </BottomButtonGroup>
    </WebviewLayout>
}

const ContentContainer = styled.div` 
    flex: 1;
    padding: 1rem;
`;

const BottomButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 0.8rem 1rem;
`;

export default MainPage;
