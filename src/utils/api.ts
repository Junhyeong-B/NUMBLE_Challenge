const API_END_POINT = process.env.API_END_POINT;

export const request = async <T>(
  url: string,
  option?: RequestInit
): Promise<T | undefined> => {
  try {
    const response = await fetch(`${API_END_POINT}${url}`, option);

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
