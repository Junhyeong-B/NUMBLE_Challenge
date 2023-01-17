import { push } from 'utils/router';
import type { Post } from 'utils/type';

interface Props {
  target: HTMLElement;
  initialState: Post[];
}

class MessageList {
  state: Post[];
  component: HTMLUListElement;

  constructor({ target, initialState }: Props) {
    this.component = document.createElement('ul');
    target.insertAdjacentElement('beforeend', this.component);
    this.state = initialState;
    this.addOnClickEvent();
    this.render();
  }

  setState(nextState: Post[]) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.component.innerHTML = `
      ${this.state
        .map(
          (post) =>
            `<li data-postid="${post.postId}">
              <img src="${post.image}" alt="post image">
              <h2>${post.title}</h2>
              <p>${post.content}</p>
            </li>`
        )
        .join('')}
    `;
  }

  onClick(e: Event) {
    const target = e.target as HTMLElement;
    const $li = target.closest('li');
    if (!$li) {
      return;
    }

    const postId = $li.dataset.postid;
    if (!postId) {
      return;
    }

    push(`/post/${postId}`);
  }

  addOnClickEvent() {
    this.component.addEventListener('click', this.onClick.bind(this));
  }
}

export default MessageList;
