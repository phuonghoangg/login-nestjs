/* eslint-disable prettier/prettier */
import User from "src/users/models/user.entity"
import { Request } from "express"

 interface RequestWithUser extends Request{
    user:User
}

export default RequestWithUser