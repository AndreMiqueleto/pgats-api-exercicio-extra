
// Bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

// Aplicação
const app = require('../../app');

// Mock
const userService = require('../../service/userService');

// Testes
describe("User Controller", () => {

  afterEach(() => {
    sinon.restore();
  });

  // ------------------------------
  // Testes do POST /register
  // ------------------------------
  describe("POST /register", () => {
    it("Quando registro um novo usuário com sucesso devo receber status 201", async () => {
      const resposta = await request(app)
        .post("/register")
        .send({ username: "Andre", password: "123toquinho" });

      expect(resposta.status).to.equal(201);
      expect(resposta.body).to.have.property("message", "User registered successfully.");
    });

    it("Mock: Quando tento registrar um usuário sem informar a senha devo receber status 400", async () => {
      const userRegisterMock = sinon.stub(userService, "addUser");
      userRegisterMock.returns(null);

      const resposta = await request(app)
        .post("/register")
        .send({ username: "Andre", password: "" });

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property("message", "Username and password required.");
    });

    it("Mock: Quando tento registrar um usuário que já existe devo receber status 409", async () => {
      const userRegisterMock = sinon.stub(userService, "addUser");
      userRegisterMock.returns(null);

      const resposta = await request(app)
        .post("/register")
        .send({ username: "Andre", password: "test" });

      expect(resposta.status).to.equal(409);
      expect(resposta.body).to.have.property("message", "User already exists.");
    });
  });

  // ------------------------------
  // Testes do GET /users
  // ------------------------------
  describe("GET /users", () => {
    it("Quando procuro por um usuário que está cadastrado devo receber 200", async () => {
      const resposta = await request(app).get("/users");

      expect(resposta.status).to.equal(200);
      expect(resposta.body).to.be.an("array");
      expect(resposta.body[0]).to.have.property("username", "Andre");
    });

    it("Mock: Deve retornar lista mockada de usuários e status code 200", async () => {
      const fakeUsers = [
        { username: "ana", password: "123" },
        { username: "carlos", password: "456" },
      ];

      const getUsersMock = sinon.stub(userService, "listUsers");
      getUsersMock.returns(fakeUsers);

      const resposta = await request(app).get("/users");

      expect(resposta.status).to.equal(200);
      expect(resposta.body).to.deep.equal(fakeUsers);
      expect(getUsersMock.calledOnce).to.be.true;
    });
  });

  // ------------------------------
  // Testes do POST /login
  // ------------------------------
  describe("POST /login", () => {
    it("Mock: Quando insiro credenciais inválidas, deve retornar 401", async () => {
      const loginInvalidoMock = sinon.stub(userService, "validateLogin");
      loginInvalidoMock.returns(null);

      const resposta = await request(app)
        .post("/login")
        .send({ username: "Andre", password: "123bolinha" });

      expect(resposta.status).to.equal(401);
      expect(resposta.body).to.have.property("message", "Invalid credentials.");
    });

    it("Mock: Quando insiro credenciais válidas, deve retornar 200", async () => {
      const loginValidoMock = sinon.stub(userService, "validateLogin");
      loginValidoMock.returns({ username: "Andre", password: "123toquinho" });

      const resposta = await request(app)
        .post("/login")
        .send({ username: "Andre", password: "123toquinho" });

      expect(resposta.status).to.equal(200);
      expect(resposta.body).to.have.property("message", "Login successful.");
    });
  });
});
