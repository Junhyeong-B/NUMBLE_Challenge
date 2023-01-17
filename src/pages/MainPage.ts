import MessageList from 'components/MessageList';
import { getPosts } from 'utils/api';
import { push } from 'utils/router';
import type { Post } from 'utils/type';

interface Props {
  target: HTMLElement;
}

interface State {
  posts: Post[];
}

class MainPage {
  page: HTMLDivElement;
  state: State;
  messageList: MessageList;
  constructor({ target }: Props) {
    this.page = document.createElement('div');
    target.insertAdjacentElement('beforeend', this.page);

    this.state = {
      posts: [],
    };

    this.render();
    this.addOnClickEvent();
    this.messageList = new MessageList({
      target: this.page,
      initialState: this.state.posts,
    });

    this.fetchMessageData();
  }

  setState(nextState: State) {
    this.state = nextState;
    this.messageList.setState(this.state.posts);
  }

  render() {
    this.page.innerHTML = `
      <h1>HPNY 2023<h1>
      <button id="CreatePost">새 글 작성하기</button>
    `;
  }

  async fetchMessageData() {
    const response = await getPosts();

    if (!response) {
      return;
    }

    this.setState({ posts: response.data.posts });
  }

  addOnClickEvent() {
    const buttonElement = document.querySelector('#CreatePost');
    if (!buttonElement) {
      return;
    }

    buttonElement.addEventListener('click', () => {
      push('/create');
    });
  }
}

export default MainPage;
