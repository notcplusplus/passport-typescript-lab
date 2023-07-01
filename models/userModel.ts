//database
interface User {
  id: number //not mandatory
  name: string;
  email: string;
  password: string;
}
const findOrCreateUser = (profile: any) => {
  console.log("profile: ", profile)
  const user: User = {
    id: profile.id,
    name: profile.username, //username not quite the same as username
    email: profile.email,
    password: ""
  }

  console.log(user)
  database.push(user);
  return user;
}

const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
  },
];

const userModel = {

  /* FIXED (types) 😭 */
  findOne: (email: string) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  /* FIXED (types) 😭 */
  findById: (id: number) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
};

export { database, userModel, findOrCreateUser };
