import MessageList, { Post } from 'components/MessageList';
import { request } from 'utils/api';

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

  async fetchMessageData() {
    const response = await request<{ code: number; data: { posts: Post[] } }>(
      '/posts',
      {
        method: 'GET',
      }
    );

    if (!response) {
      return;
    }

    this.setState({ posts: response.data.posts });
  }
}

export default MainPage;
