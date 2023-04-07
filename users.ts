
export class User {
  constructor(
    public gender: "male" | "female",
    public name: {
      title: "Mr" | "Mrs";
      first: string;
      last: string;
    },
    public location: {
      street: string;
      city: string;
      state: string;
      country: string;
      postcode: number;
    },
    public login: {
      username: string;
      password: string;
    },
    public email: string,
    public picture: {
      large: string;
      medium: string;
      thumbnail: string;
    }
  ) {}

  get fullName() {
    return `${this.name.first} ${this.name.last}`;
    
  }
}

export const loadUsers = async (n: number) => {
  const response = await fetch(`https://randomuser.me/api?results=${n}`);
  const { results } = (await response.json()) as { results: any[] };
  const users: Array<User> = [];
  for (const { gender, name, location, login, email, picture } of results) {
    users.push(new User(gender, name, location, login, email, picture));
    // quiero sacar por consola cada nuevo usuario  que se crea
    /*console.log(users);*/
  }
 
  console.log(users[1].fullName);
  return users;
};