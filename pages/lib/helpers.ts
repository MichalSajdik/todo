export const options: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};

export const secretKey = process.env.JWT_SECRET_KEY;

export const ROUTES = {
  TODOS: '/todos',
  REGISTER: '/register',
  LOGIN: '/login',
};