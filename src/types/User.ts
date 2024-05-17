import { Types } from "mongoose";

interface User {
    _id: Types.ObjectId;
    email: string;
    password: string;
    roles: string;
    hobbies : string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface RequestUser {
    roles : string;
    _id : Types.ObjectId;
}

export default User;


