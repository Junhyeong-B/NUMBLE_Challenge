import type { Post, PostDetail } from 'utils/type';

const API_END_POINT = process.env.API_END_POINT;
const UNSPLASH_URL = 'https://api.unsplash.com';

const unsplashFetchOption = {
  headers: {
    authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
  },
};

export const request = async <T>(
  url: string,
  option?: RequestInit,
  endPintUrl?: string
): Promise<T | undefined> => {
  try {
    const response = await fetch(
      `${endPintUrl ?? API_END_POINT}${url}`,
      option
    );

    if (!response.ok) {
      throw new Error(
        `API 호출 오류 / 상태 코드: ${response.status}, 텍스트: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export const getPosts = async () => {
  return await request<{
    code: number;
    data: { posts: Post[] };
  }>('/posts');
};

export const getRandomImage = async () => {
  return await request<{ urls: { small: string } }>(
    '/photos/random',
    unsplashFetchOption,
    UNSPLASH_URL
  );
};

export const createPost = async (body: {
  title: string;
  content: string;
  image: string;
}) => {
  return await request<{
    code: number;
    data: {
      post: PostDetail;
    };
  }>('/post', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
