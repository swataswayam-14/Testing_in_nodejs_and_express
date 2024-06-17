import request from "supertest";
import {describe , expect , it} from "@jest/globals"
import { app } from "..";

describe('POST/ sum', () => {
  it("should return the sum of two numbers", async () => {
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
        const res = await request(app).get("/sum").set({
            a:"1",
            b:"5"
        }).send();
        expect(res.statusCode).toBe(200);
        expect(res.body.result).toBe(6);
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
