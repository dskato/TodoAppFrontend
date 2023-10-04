import { RoleDto } from "./role-dto";

export interface UserDto {
  idUser: number;
  firstName: string;
  lastName: string;
  email: string;
  idRole: number;
  roleEntity: RoleDto;
}
