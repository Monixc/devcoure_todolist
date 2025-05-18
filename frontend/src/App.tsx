import MainLayout from "./components/layout/MainLayout";
import GlobalStyle from "./styles/globalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <MainLayout>
        <h1>데브코스 투두리스트</h1>
      </MainLayout>
    </>
  );
}

export default App;
