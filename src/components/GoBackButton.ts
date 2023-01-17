import { push } from 'utils/router';

interface Props {
  target: HTMLElement;
  to: string;
}

class GoBackButton {
  component: HTMLButtonElement;
  target: HTMLElement;
  constructor({ target, to }: Props) {
    this.component = document.createElement('button');
    this.component.innerText = '뒤로가기';

    this.component.addEventListener('click', () => {
      push(to);
    });

    this.target = target;
  }

  render(position?: InsertPosition) {
    this.target.insertAdjacentElement(position ?? 'beforeend', this.component);
  }
}

export default GoBackButton;
