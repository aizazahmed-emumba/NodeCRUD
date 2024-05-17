import { Types } from "mongoose";

interface RefreshTokenDecoded {
    _id: Types.ObjectId;
    roles : string
} 

export default RefreshTokenDecoded;


