import { UserStore } from '../user';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { userModelMock } from './utilities/userModelMock';

dotenv.config();

const pepper = process.env.SALT_ROUNDS;

const user = new UserStore();
const user_mock = new userModelMock();

describe('User Model', () => {
    afterEach(async () => {
        await user_mock.clearUsersTable();
        await user_mock.resetUsersTableSequence();
    });

    it('index method should be defined', () => {
        expect(user.index).toBeDefined();
    });

    it('show method should be defined', () => {
        expect(user.show).toBeDefined();
    });

    it('create method should be defined', () => {
        expect(user.create).toBeDefined();
    });

    it('should return all users', async () => {
        await user.create({
            firstname: 'Queen',
            lastname: 'Wellington',
            password: 'test123',
        });
        await user.create({
            firstname: 'Eli',
            lastname: 'Romano',
            password: 'test456',
        });
        const result = await user.index();
        const result_content = [
            {
                id: result[0].id,
                firstname: result[0].firstname,
                lastname: result[0].lastname,
            },
            {
                id: result[1].id,
                firstname: result[1].firstname,
                lastname: result[1].lastname,
            },
        ];
        expect(result_content).toEqual([
            { id: 1, firstname: 'Queen', lastname: 'Wellington' },
            { id: 2, firstname: 'Eli', lastname: 'Romano' },
        ]);
        expect(
            bcrypt.compareSync('test123' + pepper, result[0].password)
        ).toBeTrue();
        expect(
            bcrypt.compareSync('test456' + pepper, result[1].password)
        ).toBeTrue();
    });

    it('should return user with matching id', async () => {
        await user.create({
            firstname: 'Queen',
            lastname: 'Wellington',
            password: 'test123',
        });
        await user.create({
            firstname: 'Eli',
            lastname: 'Romano',
            password: 'test456',
        });

        const result = await user.show('2');
        const result_content = {
            id: result.id,
            firstname: result.firstname,
            lastname: result.lastname,
        };
        expect(result_content).toEqual({
            id: 2,
            firstname: 'Eli',
            lastname: 'Romano',
        });
        expect(
            bcrypt.compareSync('test456' + pepper, result.password)
        ).toBeTrue();
    });

    it('should create user', async () => {
        const result = await user.create({
            firstname: 'Timothy',
            lastname: 'Yolanda',
            password: 'test789',
        });
        const result_content = {
            id: result.id,
            firstname: result.firstname,
            lastname: result.lastname,
        };
        expect(result_content).toEqual({
            id: 1,
            firstname: 'Timothy',
            lastname: 'Yolanda',
        });
        expect(
            bcrypt.compareSync('test789' + pepper, result.password)
        ).toBeTrue();
    });
});
