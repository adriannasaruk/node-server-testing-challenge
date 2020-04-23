const request = require("supertest")

const server = require("./server")
const db = require ("./dbConfig")

describe("server", function () {

    describe("/names", function () {
        beforeEach(async () => {
        await db("names").truncate()
        })

        it("should return 201 on success", function () {
        return request(server)
        .post('/names')
        .send({name: "Jenny"})
        .then (res => {
        expect(res.status).toBe(201)
        })
        })
        it("should add name on success", async function () {
        const name = "Jenny"
        const existing = await db("names").where({name: name})
        expect(existing).toHaveLength(0)

        await request(server)
        .post('/names')
        .send({name: name})
        .then (res => {
        expect(res.body.message).toBe("Success")
        })
        const inserted = await db("names").where({name: name})
        expect(inserted).toHaveLength(1)
        })
        })
        beforeEach(async () => {
        await db("names").truncate()
        })

        it("should return 201 on success", function () {
        return request(server)
        .post('/names')
        .send({name: "Jenny"})
        .then (res => {
        expect(res.status).toBe(201)
        })
        })
        it("should add name on success", async function () {
        const name = "Jenny"
        const existing = await db("names").where({name: name})
        expect(existing).toHaveLength(0)

        await request(server)
        .post('/names')
        .send({name: name})
        .then (res => {
        expect(res.body.message).toBe("Success")
        })
        const inserted = await db("names").where({name: name})
        expect(inserted).toHaveLength(1)
    })

    describe("/:id/names", function () {
        beforeEach(async () => {
            await db("names").truncate()
            })

        it("should return 201 on success", function() {
            return request (server)
            .delete("/names/:id")
            .send({id: 1})
            .then(res => {
                expect(res.status).toBe(201)
            })
        })
        it("should remove name", async function() {
            const id = 1
            const existing = await db("names").where({id: id})
            expect(existing).toHaveLength(0)

            await request (server)
            .post("/names")
            .send({name: "Jenny"})
            .then(res => {
                expect(res.body.message).toBe("Success")
            })
            const inserted = await db("names").where({name: "Jenny"})
            expect(inserted).toHaveLength(1)

            await request(server)
            .delete(`/names/${1}`)
            .then(res => {
                expect(res.body.message).toBe("deleted")
            })
            const deleted = await db("names").where({id:id})
            expect(deleted).toHaveLength(0)
        })
    })
})