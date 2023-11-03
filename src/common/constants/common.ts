export enum Permission {
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

//Default role
export enum DefaultRole {
  User = 'User',
  Admin = 'Admin',
}

export enum Message {
  NOT_PERMISSION = 'You do not have not permission to access resource',
  WRONG_LOGIN_INFO = 'Username or password is incorrect',
  CONTRACT_EXIST = 'Contract is exist',
  NOT_FOUND_CONTRACT = 'Not found contract',
  EMAIL_EXIST = 'Email is exist',
  TOKEN_INVALID = 'Token invalid',
}

export enum TokenType {
  REFRESH = 'refresh_token',
  VERIFY_USER = 'verify_user_token',
  RESET_PASSWORD = 'reset_password',
}
