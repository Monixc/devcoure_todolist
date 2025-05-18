import styled from "styled-components";

interface MainLayoutProps {
  children: React.ReactNode;
}

const Layout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  box-sizing: border-box;
  overflow: hidden;

  background-color: rgb(255, 255, 255);
`;

const MainContent = styled.div`
  display: flex;
  width: 80%;
  height: 100%;
  justify-content: center;

  gap: 32px;
  background-color: rgb(151, 151, 151);
  box-sizing: border-box;
`;
const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Layout>
      <MainContent>{children}</MainContent>
    </Layout>
  );
};

export default MainLayout;
