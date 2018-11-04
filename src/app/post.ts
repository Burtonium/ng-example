export class Post {
  constructor(data?: Object) {
    Object.assign(this, data);
  }
  public username: string;
  public content: string;
  public createdAt: Date;
  public id?: number;
}