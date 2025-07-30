const TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export function setToken(access_token: string) {
  localStorage.setItem(TOKEN_KEY, access_token);
}
export function setRefreshToken(refresh_token: string) {
  
  localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
}


export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}
export function removeRefreshToken() {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}