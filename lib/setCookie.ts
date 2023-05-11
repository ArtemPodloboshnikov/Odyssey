type CookieOptions = {
    domain?: string,
    path?: string,
    expires?: string | Date,
    ['max-age']?: number,
    secure?: boolean,
    samesite?: 'strict' | 'lax'
}

export function setCookie(name: string, value: string|number|boolean, options?: CookieOptions) {

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    const date = new Date();
    date.setMonth(date.getMonth() + 2);

    const optionsLocal = {
      path: '/',
      expires: date,
      samesite: 'lax',
      ...options
    };

    if (optionsLocal.expires instanceof Date) {
        optionsLocal.expires = optionsLocal.expires.toUTCString();
    }

    for (const [optionKey, optionValue] of Object.entries(optionsLocal)) {
      updatedCookie += "; " + optionKey;

      if (optionValue) {
        updatedCookie += "=" + optionValue;
      }
    }

    document.cookie = updatedCookie;
}