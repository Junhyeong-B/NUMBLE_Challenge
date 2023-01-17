import MainPage from 'pages/MainPage';
import CreatePostPage from 'pages/CreatePostPage';
import { initRouter } from 'utils/router';

interface Props {
  target: HTMLDivElement;
}

class App {
  root: HTMLDivElement;
  constructor({ target }: Props) {
    this.root = target;
    this.route();
    initRouter(this.route.bind(this));
  }

  route() {
    this.root.innerHTML = '';
    const { pathname } = window.location;

    switch (pathname) {
      case '/':
        new MainPage({ target: this.root });
        break;

      case '/create':
        new CreatePostPage({ target: this.root });
        break;

      default:
        return;
    }
  }
}

export default App;
