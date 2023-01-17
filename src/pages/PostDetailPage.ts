import type { PostDetail } from 'utils/type';
import { getPostDetail as apiGetPostDetail } from 'utils/api';
import { replace } from 'utils/router';
import GoBackButton from 'components/GoBackButton';

interface Props {
  target: HTMLElement;
  postId: string;
}

class PostDetailPage {
  component: HTMLDivElement;
  postId: string;
  state: PostDetail;
  goBackButton: GoBackButton;
  constructor({ target, postId }: Props) {
    this.component = document.createElement('div');
    target.insertAdjacentElement('beforeend', this.component);

    this.postId = postId;

    this.state = {
      post: {
        postId: '',
        title: '',
        content: '',
        image: '',
        createdAt: '',
        updatedAt: '',
      },
      comments: [],
    };

    this.getPostDetail();
    this.goBackButton = new GoBackButton({ target: this.component, to: '/' });
  }

  setState(nextState: PostDetail) {
    this.state = nextState;
    this.render();
  }

  render() {
    /* html */
    this.component.innerHTML = `
      <img src="${this.state.post.image}" alt="post image">
      <div>
        <h2>${this.state.post.title}</h2>
        <p>${this.state.post.createdAt}</p>
        <p>${this.state.post.content}</p>
      </div>
      <div>
        <button>수정</button>
        <button>삭제</button>
      </div>
      <div>
        ${this.state.comments
          .map(
            (comment) => `
          <div>
            <p>
              ${comment.content}
            </p>
            <button>삭제</button>
          </div>
        `
          )
          .join('')}
      </div>
      <div>
        <input type='text'>
        <button>댓글 추가</button>
      </div>
    `;
    this.goBackButton.render('beforebegin');
  }

  async getPostDetail() {
    const response = await apiGetPostDetail(this.postId);

    if (!response) {
      replace('/');
      return;
    }

    this.setState(response.data);
  }
}

export default PostDetailPage;
