class UserDto {
  id;
  bio;
  name;
  email;
  isActivated;

  constructor(model) {
    this.id = model._id;
    this.bio = model.bio;
    this.name = model.name;
    this.email = model.email;
    this.isActivated = model.isActivated;
  }
}

export default UserDto;
