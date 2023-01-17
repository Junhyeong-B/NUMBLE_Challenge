import { createPost, getRandomImage } from 'utils/api';
import { replace } from 'utils/router';

interface Props {
  target: HTMLElement;
}

interface State {
  title: string;
  content: string;
}

class CreatePostPage {
  state: State;
  component: HTMLFormElement;
  image: string;
  constructor({ target }: Props) {
    this.state = {
      title: '',
      content: '',
    };

    this.component = document.createElement('form');
    target.insertAdjacentElement('beforeend', this.component);

    this.getRandomImage();
    this.render();
    this.addHandleChangeEvent();
  }

  render() {
    this.component.innerHTML = `
      <label for="title">제목</label>
      <input id="CreatePost__Title" name="title" type="text">
      <label for="content">내용</label>
      <input id="CreatePost__Content" name="content" type="text">
      <button id="CreatePost__Submit" type="submit">등록하기</button>
    `;
  }

  addHandleChangeEvent() {
    const titleElement = document.querySelector('#CreatePost__Title');
    const contentElement = document.querySelector('#CreatePost__Content');
    const submitButtonElement = document.querySelector('#CreatePost__Submit');

    if (!titleElement || !contentElement || !submitButtonElement) {
      return;
    }

    titleElement.addEventListener('input', this.onChange.bind(this));
    contentElement.addEventListener('input', this.onChange.bind(this));
    submitButtonElement.addEventListener('submit', this.onSubmit.bind(this));
    this.component.addEventListener('submit', this.onSubmit.bind(this));
  }

  setState(nextState: State) {
    this.state = nextState;
  }

  onChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (!target) {
      return;
    }

    this.setState({
      ...this.state,
      [target.name]: target.value,
    });
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    if (this.state.title === '' || this.state.content === '') {
      return;
    }

    const response = await createPost({
      ...this.state,
      image: this.image,
    });

    console.log({
      ...this.state,
      image: this.image,
    });
    console.log(response);

    if (!response) {
      return;
    }

    replace('/');
    return;
  }

  async getRandomImage() {
    const randomImage = await getRandomImage();
    const image = randomImage.urls.small;
    this.image = image;
  }
}

export default CreatePostPage;
