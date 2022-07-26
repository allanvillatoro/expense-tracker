import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model } from 'mongoose';
import { EmailAlreadyExists } from '../exceptions/email-already-exists.exception';
import { User, UserSchema } from '../schemas/user.schema';
import { UserDTOStub } from '../../test/stubs/user.dto.stub';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { LoginUserDTOStub } from '../../test/stubs/login-user.dto.stub';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('UsersController', () => {
  let usersController: UsersController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<User>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    userModel = mongoConnection.model('users', UserSchema);
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getConnectionToken('DatabaseConnection'),
          useValue: mongoConnection,
        },
        { provide: getModelToken('users'), useValue: userModel },
      ],
    }).compile();
    usersController = app.get<UsersController>(UsersController);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  describe('registerUser', () => {
    it('should return the saved user', async () => {
      const createdUser = await usersController.register(UserDTOStub());
      expect(createdUser.email).toBe(UserDTOStub().email);
    });
    it('should return EmailAlreadyExists (Bad Request - 400) exception', async () => {
      await new userModel(UserDTOStub()).save();
      await expect(usersController.register(UserDTOStub())).rejects.toThrow(
        EmailAlreadyExists,
      );
    });
  });

  describe('loginUser', () => {
    it('should return the corresponding saved user', async () => {
      const { password, ...userData } = UserDTOStub();
      const userPasswordHash = {
        ...userData,
        password: bcrypt.hashSync(password, 10),
      };
      await new userModel(userPasswordHash).save();
      const user = await usersController.login(LoginUserDTOStub());
      expect(user.email).toBe(UserDTOStub().email);
    });

    it('should return UnauthorizedException (401) exception', async () => {
      await expect(usersController.login(LoginUserDTOStub())).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
