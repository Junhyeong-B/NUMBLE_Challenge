import MainPage from 'pages/MainPage';

interface Props {
  target: HTMLDivElement;
}

class App {
  mainPage: MainPage;
  constructor({ target }: Props) {
    this.mainPage = new MainPage({ target });
  }
}

export default App;
