import MainPage from 'pages/MainPage';
import CreatePostPage from 'pages/CreatePostPage';
import PostDetailPage from 'pages/PostDetailPage';
import { initRouter, replace } from 'utils/router';

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

    if (pathname === '/') {
      new MainPage({ target: this.root });
    } else if (pathname === '/create') {
      new CreatePostPage({ target: this.root });
    } else if (pathname.startsWith('/post/')) {
      const postId = pathname.split('/')[2];

      if (isNaN(Number(postId))) {
        replace('/');
        return;
      }

      new PostDetailPage({ target: this.root, postId });
    } else {
      replace('/');
    }
  }
}

export default App;
