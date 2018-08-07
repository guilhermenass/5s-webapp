export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  profile: number;

  constructor(id?: number, name?: string, email?: string, password?: string, profile?: number){
    this.id = id
    this.name = name;
    this.email = email;
    this.password = password;
    this.profile = profile;
  }
}
