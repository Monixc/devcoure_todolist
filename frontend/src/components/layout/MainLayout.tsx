import styled from "styled-components";

interface MainLayoutProps {
  sidebar: React.ReactNode;
  main: React.ReactNode;
}

export const MainLayout = ({ sidebar, main }: MainLayoutProps) => {
  return (
    <Container>
      <SidebarWrapper>
        {sidebar}
      </SidebarWrapper>
      <MainContent>
        {main}
      </MainContent>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 90vh;
  overflow: hidden;
`;

const SidebarWrapper = styled.aside`
  flex-shrink: 0;
  width: 265px;
  margin-right: 32px;
  height: 100%;
  position: relative;
`;

const MainContent = styled.main`
  flex: 1;  
  height: 100%;
`;
