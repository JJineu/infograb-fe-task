export function setCookie(name: string, value: string, days = 1) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  if (typeof document !== 'undefined') {
    document.cookie = `${name}=${value};${expires};path=/`;
  }
}

export function getCookie(name: string) {
  const nameEQ = `${name}=`;
  const cookies = document.cookie ? document.cookie.split(';') : [];
  for (const cookie of cookies) {
    const trimmedCookie = cookie.trim();
    if (trimmedCookie.startsWith(nameEQ)) {
      return trimmedCookie.substring(nameEQ.length);
    }
  }
}
