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
            `<li>
              <img src="${post.image}" alt="post image">
              <h2>${post.title}</h2>
              <p>${post.content}</p>
            </li>`
        )
        .join('')}
    `;
  }
}

export default MessageList;
