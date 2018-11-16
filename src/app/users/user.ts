export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  profile: number;
  units_id: number;

  constructor(id?: number, name?: string, email?: string, password?: string, profile?: number, units_id?: number){
    this.id = id
    this.name = name;
    this.email = email;
    this.password = password;
    this.profile = profile;
    this.units_id = units_id
  }
}
