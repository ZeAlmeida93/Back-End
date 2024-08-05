
import mongoose from "mongoose";

export interface IUser extends mongoose.Document {

name:string,
email:string,
password:string,
avatar?:string,
role: string;
isActive:boolean;

}




const UserSchema   = new mongoose.Schema ({

    name:{type: String, require: true},
    email:{type: String, require: true},
    password:{type: String, require: true},
    avatar:{type: String ,default : "default.jpg"},
    role: {type: String, require: true , default: "USER"},
    isActive: {type: Boolean , default: true},
    createdAt: {type:Date, default:Date.now()},
    updatedAt: {type:Date, default:Date.now()},


}, {timestamps: true});

export default mongoose.model<IUser>("User", UserSchema);
