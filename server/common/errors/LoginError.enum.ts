export const ERROR_CODES = {
  login: {
    userNotFound: {
      coode: 'LOG01',
      message: 'Could not find matching user',
    },
    userAccountNotActice: {
      code: 'LOG02',
      message: 'User account is not active',
    },
    passwordDoesNotMatch: {
      code: 'LOG03',
      message: 'Password does not match',
    },
  },
  register: {},
};
