import supertest from 'supertest';
import app from '../../server';
import dotenv from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserStore } from '../../models/user';
import { userModelMock } from '../../models/tests/utilities/userModelMock';

const user = new UserStore();
const user_mock = new userModelMock();

dotenv.config();
const pepper = process.env.SALT_ROUNDS;
const token_secret: Secret = process.env.TOKEN_SECRET as unknown as Secret;
const payload = { id: 1, firstname: 'Queen', lastname: 'Wellington' };
const user_token = jwt.sign({ user: payload }, token_secret);
const invalid_user_token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJUYXJpcm8iLCJsYXN0bmFtZSI6IkJhbmRhIn0sImlhdCI6MTY3NDc.HACcDRyOfrr11f6gCC07RK0q1OU7FdtiPS';
const req = supertest(app);

describe('Test /users endpoints', () => {
    afterEach(async () => {
        await user_mock.clearUsersTable();
        await user_mock.resetUsersTableSequence();
    });

    it('GET /users/ returns all users with valid token', async () => {
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

        const res = await req.get('/users/').send({ token: user_token });
        const res_content = [
            {
                id: res.body[0].id,
                firstname: res.body[0].firstname,
                lastname: res.body[0].lastname,
            },
            {
                id: res.body[1].id,
                firstname: res.body[1].firstname,
                lastname: res.body[1].lastname,
            },
        ];
        expect(res_content).toEqual([
            { id: 1, firstname: 'Queen', lastname: 'Wellington' },
            { id: 2, firstname: 'Eli', lastname: 'Romano' },
        ]);
        expect(
            bcrypt.compareSync('test123' + pepper, res.body[0].password)
        ).toBeTrue();
        expect(
            bcrypt.compareSync('test456' + pepper, res.body[1].password)
        ).toBeTrue();
        expect(res.status).toEqual(200);
    });

    it('GET /users/ returns error with invalid token', async () => {
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

        const res = await req
            .get('/users/')
            .send({ token: invalid_user_token });
        expect(res.status).toEqual(401);
    });

    it('GET /users/:id returns individual user with existing id', async () => {
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

        const res = await req.get('/users/2').send({ token: user_token });
        const res_content = {
            id: res.body.id,
            firstname: res.body.firstname,
            lastname: res.body.lastname,
        };
        expect(res_content).toEqual({
            id: 2,
            firstname: 'Eli',
            lastname: 'Romano',
        });
        expect(
            bcrypt.compareSync('test456' + pepper, res.body.password)
        ).toBeTrue();
        expect(res.status).toEqual(200);
    });

    it('GET /users/:id returns error with non existent id', async () => {
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

        const res = await req.get('/users/5').send({ token: user_token });
        expect(res.status).toEqual(404);
    });

    it('POST /users/ creates new user', async () => {
        const res = await req.post('/users/').send({
            firstname: 'Timothy',
            lastname: 'Yolanda',
            password: 'test789',
        });
        const res_content = {
            new_user: {
                id: res.body.new_user.id,
                firstname: res.body.new_user.firstname,
                lastname: res.body.new_user.lastname,
            },
            token: res.body.token,
        };
        const user_token = jwt.sign(
            { user: { id: 1, firstname: 'Timothy', lastname: 'Yolanda' } },
            token_secret
        );

        const match = await bcrypt.compareSync(
            'test789' + pepper,
            res.body.new_user.password
        );
        expect(res_content).toEqual({
            new_user: { id: 1, firstname: 'Timothy', lastname: 'Yolanda' },
            token: user_token,
        });
        expect(match).toBeTrue();
        expect(res.status).toEqual(201);
    });
});
