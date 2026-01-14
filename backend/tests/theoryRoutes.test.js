const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const User = require("../models/User");
const Theory = require("../models/Theory");

let token;

beforeAll(async () => {
  // Authenticate as Admin
  await User.deleteMany({});
  const user = await User.create({
    name: "Test Admin",
    email: "topicadmin@test.com",
    password: "password123",
    isAdmin: true,
  });

  const res = await request(app)
    .post("/api/auth/login")
    .send({ email: "topicadmin@test.com", password: "password123" });

  token = res.body.token;
});

afterAll(async () => {
  await User.deleteMany({});
  await Theory.deleteMany({});
  await mongoose.connection.close();
});

describe("GET /api/theory", () => {
  it("should filter topics by subject", async () => {
    await Theory.create({
      topicId: "react-hooks",
      title: "React Hooks",
      category: "core",
      section: "hooks",
      subject: "react",
    });

    await Theory.create({
      topicId: "js-async",
      title: "Async JS",
      category: "core",
      section: "concepts",
      subject: "js",
    });

    // Test filtering for React
    const resReact = await request(app).get("/api/theory?subject=react");
    expect(resReact.statusCode).toBe(200);
    expect(resReact.body.length).toBe(1);
    expect(resReact.body[0].subject).toBe("react");

    // Test filtering for JS
    const resKS = await request(app).get("/api/theory?subject=js");
    expect(resKS.statusCode).toBe(200);
    expect(resKS.body.length).toBe(1);
    expect(resKS.body[0].subject).toBe("js");
  });

  it("should update theory by ID", async () => {
    const topic = await Theory.create({
      topicId: "update-test",
      title: "Original Title",
      category: "test",
      subject: "test",
    });

    const res = await request(app)
      .put(`/api/theory/${topic._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated Title",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Updated Title");
  });
});
