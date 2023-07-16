import usersReducer, {
  createNewUser,
  emptyUsersReducer,
  fetchAllUsers,
  loginUser,
} from "../../redux/reducers/usersReducer";
import User from "../../types/User";
import { user1, user2, user3 } from "../data/users";
import userServer from "../servers/userServer";
import store from "../store";
import SimpleUser from "../../types/SimpleUser";

beforeAll(() => {
  userServer.listen();
});

afterAll(() => {
  userServer.close();
});

beforeEach(() => {
  store.dispatch(emptyUsersReducer());
  store.dispatch(createNewUser(user1));
  store.dispatch(createNewUser(user2));
  store.dispatch(createNewUser(user3));
});

describe("Testing usersReducer", () => {
  test("Check initialState", () => {
    const state = usersReducer(undefined, { type: "unknown" });
    expect(state).toEqual({
      users: [],
      loading: false,
      error: null,
      currentUser: null,
      isLoggedIn: false,
    });
  });
  test("Check should emty user list", () => {
    const user: User = {
      id: 1,
      email: "test@gmail.com",
      role: "customer",
      password: "tester",
      name: "Tester",
      avatar: "",
    };
    const state = usersReducer(
      {
        users: [user],
        loading: false,
        error: "",
        currentUser: null,
        isLoggedIn: false,
      },
      emptyUsersReducer()
    );
    expect(state.users.length).toBe(0);
  });

  test("Check should fetch all users", async () => {
    //only can check the final result
    await store.dispatch(fetchAllUsers());
    expect(store.getState().usersReducer.users.length).toBe(4);
    expect(store.getState().usersReducer.loading).toBeFalsy();
    expect(store.getState().usersReducer.error).toBeFalsy(); //empty string is interpreted as falsy value if JS
  });
  test("Check should fetch users in pending state", () => {
    const state = usersReducer(undefined, fetchAllUsers.pending);
    expect(state).toEqual({
      users: [],
      loading: true,
      error: null,
      currentUser: null,
      isLoggedIn: false,
    });
  });

  test("Check if existing user can login", async () => {
    await store.dispatch(
      loginUser({
        email: "john@mail.com",
        password: "changeme",
      })
    );
    expect(store.getState().usersReducer.currentUser).toBeDefined();
  });
});
