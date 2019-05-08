export class Profile {
  constructor(
      public login: string,
      public avatar: string,
      public url: string,
      public name: string,
      public email: string,
      public followers: number,
      public following: number,
  ) {}
}
