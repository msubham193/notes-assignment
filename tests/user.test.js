// authentication.test.js
import axios from "axios";
import { app } from "../index.js";
import User from "../models/user.js";

// Clear the User collection before running tests
beforeAll(async () => {
  await User.deleteMany({});
}, 10000); // Increase the timeout to 10000 ms (10 seconds)

// Test user data for signup and login
const testUser = {
  username: "testuser",
  password: "testpassword",
};

describe("POST /api/auth/signup", () => {
  it("should create a new user", async () => {
    const res = await axios.post(`${app}/api/auth/signup`, testUser);

    expect(res.status).toBe(201);
    expect(res.data).toHaveProperty("message", "User created successfully");
  });

  it("should return 409 for duplicate username", async () => {
    const res = await axios.post(`${app}/api/auth/signup`, testUser);

    expect(res.status).toBe(409);
    expect(res.data).toHaveProperty("error", "Username already taken");
  });
});

describe("POST /api/auth/login", () => {
  it("should log in an existing user and return a valid token", async () => {
    const res = await axios.post(`${app}/api/auth/login`, testUser);

    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty("token");
    // You may want to save the token for further tests
    testUser.token = res.data.token;
  });

  it("should return 401 for invalid credentials", async () => {
    const res = await axios.post(`${app}/api/auth/login`, {
      username: "nonexistentuser",
      password: "wrongpassword",
    });

    expect(res.status).toBe(401);
    expect(res.data).toHaveProperty("error", "Invalid username or password");
  });
});

// Clean up after tests
afterAll(async () => {
  await User.deleteMany({});
}, 10000);
