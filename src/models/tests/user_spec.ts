import { UserStore } from "../user";

const user = new UserStore()

describe('User Model', () => { 
    afterEach(async () => {
        await user.clearUsersTable()
        await user.resetUsersTableSequence()
    })

    it('index method should be defined', () => {
        expect(user.index).toBeDefined()
    })

    it('show method should be defined', () => {
        expect(user.show).toBeDefined()
    })

    it('create method should be defined', () => {
        expect(user.create).toBeDefined()
    })

    it('should return all users', async () => {
        await user.create({ firstname: "Queen", lastname: "Wellington", password: "test123" })
        await user.create({ firstname: "Eli", lastname: "Romano", password: "test456" })
        const result = await user.index()
        expect(result).toEqual([{ id: 1, firstname: "Queen", lastname: "Wellington", password: "test123                                                     " }, { id: 2, firstname: "Eli", lastname: "Romano", password: "test456                                                     " }])
    })

    it('should return user with matching id', async () => {
        await user.create({ firstname: "Queen", lastname: "Wellington", password: "test123" })
        await user.create({ firstname: "Eli", lastname: "Romano", password: "test456" })

        const result = await user.show('2')
        expect(result).toEqual({id: 2, firstname: "Eli", lastname: "Romano", password: "test456                                                     " })
    })

    it('should create user', async () => {
        const result = await user.create({ firstname: "Timothy", lastname: "Yolanda", password: "test789" })
        expect(result).toEqual({ id: 1, firstname: "Timothy", lastname: "Yolanda", password: "test789                                                     " })
    })
})