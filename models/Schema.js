import { Schema,models,model } from "mongoose";

const userShema = new Schema({
    username : String,
    email : String,
    password : String
})

const Users = models.user || model("user", userShema);

export default Users