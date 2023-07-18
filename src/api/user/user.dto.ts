export class UserDTO {
    userName: string | null;
    password: string | null;
    name?: string | null;
    role?: string;
    avatar?: string;
    createdAt?: string;
    updatedAt?: string;
  constructor(
    userName: string,
    password: string,
    name: string,
    role: string,
    avatar: string,
    createdAt: string,
    updatedAt: string,
  ) {
    this.userName = userName;
    this.password = password;
    this.name = name;
    this.role = role;
    this.avatar = avatar;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export const mapToUserDTO = (obj:any) => {
  const output : UserDTO = {
    userName:obj.userName,
    password: obj.password,
    name: obj.name,
  }
  return output
}
