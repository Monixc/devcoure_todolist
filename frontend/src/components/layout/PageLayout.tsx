import styled from "styled-components";

interface PageLayoutProps {
    children: React.ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
    return (
        <PageContainer>
            <PageContent>{children}</PageContent>
        </PageContainer>
    );
};

const PageContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`;

const PageContent = styled.div`
    width: 1152px;
    height: 100%;
    padding: 40px 24px 0;
`; 