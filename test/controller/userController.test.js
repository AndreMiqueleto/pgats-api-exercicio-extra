
// Bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

// Aplicação
const app = require('../../app');

// Mock
const userService = require('../../service/userService');

// Testes
describe('User Controller', () => {
    describe('POST /register', () => {
        it('Quando registro um novo usuário com sucesso devo receber um status 201 ', async () => {
            const resposta = await request(app)
                .post('/register')
                .send({
                    username: "Andre",
                    password: "123toquinho"
                });

            expect(resposta.status).to.equal(201);
            expect(resposta.body).to.have.property('message', 'User registered successfully.')
        });


        it('Quando procuro por um usuário que está cadastrado devo receber 200', async () => {
            const resposta = await request(app)
                .get('/users')
            
            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.be.an("array");
            expect(resposta.body[0]).to.have.property("username", "Andre");
        });


        it("Com Mock: Deve retornar lista mockada de usuários e status code 200", async () => {
            // define o que o stub deve retornar
            const fakeUsers = [
                { username: "ana", password: "123" },
                { username: "carlos", password: "456" }
            ];

            const getUsersMock = sinon.stub(userService, 'listUsers');
            getUsersMock.returns(fakeUsers);

            const resposta = await request(app)
                .get("/users");

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.deep.equal(fakeUsers);
            expect(getUsersMock.calledOnce).to.be.true; // garante que o stub foi chamado

            sinon.restore();
        });


        it("Com Mock: Quando insiro credenciais invalidas, deve retornar 401", async () => {
            const loginInvalidoMock = sinon.stub(userService, 'validateLogin');
            loginInvalidoMock.returns(null);

            const resposta = await request(app)
                .post("/login")
                .send({
                     username: "Andre",
                     password: "123bolinha",
                });

            expect(resposta.status).to.equal(401);
            expect(resposta.body).to.have.property('message', 'Invalid credentials.')

            sinon.restore();
        });

        it("Com Mock: Quando insiro credenciais validas, deve retornar 200", async () => {
            const loginValidoMock = sinon.stub(userService, 'validateLogin');
            loginValidoMock.returns({ username: "Andre", password: "123toquinho" });

            const resposta = await request(app)
                .post("/login")
                .send({
                     username: "Andre",
                     password: "123toquinho",
                });

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.have.property('message', 'Login successful.')

            sinon.restore();
        });
    
    });











    //    
// it('Usando Mocks: Quando informo remetente e destinatario inexistentes recebo 400', async () => {
    //         // mockar apenas a funcao transfer do service
    //         const transferServiceMock = sinon.stub(transferService, 'transfer');
    //         transferServiceMock.throws(new Error('Usuário não encontrado'));


    //         const resposta = await request(app)
    //             .post('/transfer')
    //             .send({
    //                 from: "Andre",
    //                 to: "Sam",
    //                 amount: 100
    //             });

    //         expect(resposta.status).to.equal(400);
    //         expect(resposta.body).to.have.property('error', 'Usuário não encontrado')

    //         // Reseto o Mock
    //         sinon.restore();
    //     });

    //     it('Usando Mocks: Quando informo valores validos eu tenho sucesso com 201 created', async () => {
    //         // mockar apenas a funcao transfer do service
    //         const transferServiceMock = sinon.stub(transferService, 'transfer');
    //         transferServiceMock.returns({ 
    //             from: "Andre",
    //             to: "Sam", 
    //             amount: 100, 
    //             date: new Date().toISOString()
    //          });


    //         const resposta = await request(app)
    //             .post('/transfer')
    //             .send({
    //                 from: "Andre",
    //                 to: "Sam",
    //                 amount: 100
    //             });

    //         expect(resposta.status).to.equal(201);
    //         expect(resposta.body).to.have.property('from', 'Andre')
    //         expect(resposta.body).to.have.property('to', 'Sam')
    //         expect(resposta.body).to.have.property('amount', 100)


    //         // Reseto o Mock
    //         sinon.restore();
    //     });

    //     it('Usando Mocks: Quando informo saldo insuficiente recebo 400', async () => {
    //         // mockar apenas a funcao transfer do service
    //         const transferServiceMock = sinon.stub(transferService, 'transfer');
    //         transferServiceMock.throws(new Error('Saldo insuficiente'));
       
    //         const resposta = await request(app)
    //             .post('/transfer')
    //             .send({
    //                 from: "Andre",
    //                 to: "Joana",
    //                 amount: 0
    //             });

    //         expect(resposta.status).to.equal(400);
    //         expect(resposta.body).to.have.property('error','Saldo insuficiente')

    //         // Reseto o Mock
    //         sinon.restore();
    //     });
    // });
    
    // describe('GET /transfers', () => {

    // });
});
