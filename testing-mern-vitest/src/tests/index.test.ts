import request from "supertest";
import {describe , expect , it, vi} from "vitest"
import { app } from "..";
import { admin } from "../users/admin";
import { prismaClient } from "../__mocks__/db";
// vi.mock('../db', () => ({
//     prismaClient: {sum: { create: vi.fn() }}
// }))
vi.mock('../db');
vi.mock('../users/admin');

describe('POST/ sum', () => {
  it("should return the sum of two numbers", async () => {
    prismaClient.sum.create.mockResolvedValue({
        id: 1,
        a : 2,
        b : 2,    
        result : 4,
    })
    const res = await request(app).post("/sum").send({
        a:1,
        b:2
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(3);
  })
  it("should return the sum of two numbers", async () => {
    const res = await request(app).post("/sum").send({
        a:1,
        b:-1
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(0);
  })
  it("should return the sum of two numbers", async () => {
    const res = await request(app).post("/sum").send({
        a:100,
        b:102
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(202);
  })
  it("should return the sum of two numbers", async () => {
    const res = await request(app).post("/sum").send({
        a:0,
        b:0
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(0);
  })
  it("should return the sum of two numbers", async () => {
    const res = await request(app).post("/sum").send({
        a:"fdiugsdf",
        b:[[1,2,3]]
    });
    expect(res.statusCode).toBe(411);
    expect(res.body.message).toBe("incorrect inputs");
  })
})

describe("GET/ sum", () => {
    it("should return the sum of two numbers", async() => {
        prismaClient.sum.create.mockResolvedValue({
            id: 1,
            a : 2,
            b : 2,    
            result : 4,
        })

        vi.spyOn(prismaClient.sum, "create");//spy on the function (checking if correct inputs are passed to the function)

        const res = await request(app).get("/sum").set({
            a:"1",
            b:"5"
        }).send();

        expect(prismaClient.sum.create).toHaveBeenCalledWith({
            data:{
                a:1,
                b:5,
                result:6
            }
        })
        expect(prismaClient.sum.create).toHaveBeenCalledOnce();

        expect(res.statusCode).toBe(200);
        expect(res.body.result).toBe(6);
        expect(res.body.id).toBe(1);
    })
    it("should return the sum of two numbers", async() => {
        const res = await request(app).get("/sum").set({
            a:"1",
            b: "-1"
        }).send();
        expect(res.statusCode).toBe(200);
        expect(res.body.result).toBe(0);
    })
    it("should return the sum of two numbers", async() => {
        const res = await request(app).get("/sum").set({
            a:"1",
            b:"[1,2,3]"
        }).send();
        expect(res.statusCode).toBe(411);
        expect(res.body.message).toBe("incorrect inputs");
    })
    it("should return the sum of two numbers", async() => {
        const res = await request(app).get("/sum").set({
            a:"1"
        }).send();
        expect(res.statusCode).toBe(411);
        expect(res.body.message).toBe("incorrect inputs");
    })
})

describe("testing mock admin function", () => {
    it("the test should pass without any error",() =>{
        console.log(admin()); //undefined if mock is present , if we add the mock then it will return the actual string
    });
})
