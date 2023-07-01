import {userModel} from "../models/userModel";

const getUserByEmailIdAndPassword = (email: string, password: string) => {
  //any function that throws an error needs to be wrapped in a try catch. but don't wrap it here
    let user = userModel.findOne(email);

    if (isUserValid(user, password)) {
      return user;
    }
    else{
      throw(new Error(`The username and password you entered are incorrect.`))
    }
};
const getUserById = (id:any) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user: any, password: string) {
  return user.password === password;
}

export {
  getUserByEmailIdAndPassword,
  getUserById,
};
