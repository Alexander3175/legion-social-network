export default class Post {
  constructor(_id, user, title, content, like = 0, createdAt = Date.now(), file = null) { 
    this._id = _id;
    this.user = user;
    this.title = title;
    this.content = content;
    this.like = like;
    this.createdAt = createdAt; 
    this.file = file;
  }
}
