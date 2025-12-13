interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        options: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "invisible";
          callback: (token: string) => void;
        }
      ) => number;
      execute: (widgetId: number) => void;
      reset?: (widgetId: number) => void;
    };
  }