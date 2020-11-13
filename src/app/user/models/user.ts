import { Role } from '@app/roles/models/role';

export class User {
  id: string;
  username: string;
  email: string;
  role: Role;
  jwtToken?: string;
}
