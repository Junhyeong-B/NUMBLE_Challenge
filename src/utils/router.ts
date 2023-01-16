interface PushEvent extends Event {
  detail: {
    url: string;
  };
}

const ROUTE_PUSH = 'ROUTE_PUSH';
const ROUTE_REPLACE = 'ROUTE_REPLACE';

export const initRouter = <T extends () => void>(callback: T) => {
  window.addEventListener(ROUTE_PUSH, ((e: PushEvent) => {
    const url = e.detail?.url;

    if (!url) {
      return;
    }

    history.pushState(null, '', url);
    callback();
  }) as EventListener);

  window.addEventListener(ROUTE_REPLACE, ((e: PushEvent) => {
    const url = e.detail?.url;

    if (!url) {
      return;
    }

    history.replaceState(null, '', url);
    callback();
  }) as EventListener);

  window.addEventListener('popstate', () => {
    callback();
  });
};

export const push = (url: string) => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_PUSH, {
      detail: {
        url,
      },
    })
  );
};

export const replace = (url: string) => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_REPLACE, {
      detail: {
        url,
      },
    })
  );
};
