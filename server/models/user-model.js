import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    bio: { type: String, required: false, default: ''},
    email: { type: String, nique: true, required: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
  },
  { collection: "users" }
);

export default model("users", UserSchema);
