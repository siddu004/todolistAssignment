var Request = require("request");

describe("Server", () => {
    var server;
    beforeAll(() => {
        server = require("../app");
    });
   
    describe("test user signin function", () => {
        var data = {};
        beforeAll((done) => {
            Request.post("http://localhost:3000/api/users/signin", {json:true,body:{
              "email":"sid@gmail.com",
              "password":"siddu004"
            }},(error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });
        it("Status 201", () => {
            expect(data.status).toBe(201);
        });
        it("Body", () => {
            expect(data.body.result[0].fullName).toBe("Siddharth Gollapudi");
        });
    });
 
});