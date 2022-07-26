import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesController } from './expenses.controller';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model } from 'mongoose';
import { Expense, ExpenseSchema } from '../schemas/expense.schema';
import { ExpensesService } from './expenses.service';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { ExpenseDTOStub } from '../../test/stubs/expense.dto.stub';
import { CategoryDoesntExist } from '../exceptions/category-doesnt-exist.exception';
import { Category, CategorySchema } from '../schemas/category.schema';
import { CategoryDTOStub } from '../../test/stubs/category.dto.stub';
import { User, UserSchema } from '../schemas/user.schema';
import { UserDoesntExist } from '../exceptions/user-doesnt-exist.exception';
import { UserDTOStub } from '../../test/stubs/user.dto.stub';

describe('ExpensesController', () => {
  let expensesController: ExpensesController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let expenseModel: Model<Expense>;
  let categoryModel: Model<Category>;
  let userModel: Model<User>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;

    expenseModel = mongoConnection.model('expenses', ExpenseSchema);
    categoryModel = mongoConnection.model('expensecategories', CategorySchema);
    userModel = mongoConnection.model('users', UserSchema);

    const app: TestingModule = await Test.createTestingModule({
      controllers: [ExpensesController],
      providers: [
        ExpensesService,
        {
          provide: getConnectionToken('DatabaseConnection'),
          useValue: mongoConnection,
        },
        { provide: getModelToken('expenses'), useValue: expenseModel },
        {
          provide: getModelToken('expensecategories'),
          useValue: categoryModel,
        },
        { provide: getModelToken('users'), useValue: userModel },
      ],
    }).compile();
    expensesController = app.get<ExpensesController>(ExpensesController);
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

  
  describe('getExpensesByUser', () => {
    it('should return an array with one expense', async () => {

      const newUser = new userModel(UserDTOStub());
      await newUser.save();
      const newExpense = { ...ExpenseDTOStub(), userId: newUser._id.toString() };
      await new expenseModel(newExpense).save();

      const expenses = await expensesController.getExpensesByUser({userId: newUser._id.toString()});
      expect(expenses.length === 1 && Array.isArray(expenses)).toBeTruthy();
    });

    it('should return the saved expense', async () => {
      
      const newUser = new userModel(UserDTOStub());
      await newUser.save();
      const newExpense = { ...ExpenseDTOStub(), userId: newUser._id.toString() };
      await new expenseModel(newExpense).save();

      const expenses = await expensesController.getExpensesByUser({userId: newUser._id.toString()});
      const expense = expenses[0];
      expect(expense.description).toBe(ExpenseDTOStub().description);
    });

    it('should return an empty array', async () => {
      const expenses = await expensesController.getExpensesByUser({userId: '62df501ee11250bb65262493'});
      expect(expenses.length === 0 && Array.isArray(expenses)).toBeTruthy();
    });
  });

  describe('postExpense', () => {
    it('should return the saved expense', async () => {

      const newUser = new userModel(UserDTOStub());
      await newUser.save();
      const newExpense = { ...ExpenseDTOStub(), userId: newUser._id.toString() };

      await new categoryModel(CategoryDTOStub()).save();
      const createdExpense = await expensesController.postExpense(newExpense);
      expect(createdExpense.description).toBe(ExpenseDTOStub().description);
    });

    it('should return UserDoesntExist (Bad Request - 400) exception', async () => {
      await new categoryModel(CategoryDTOStub()).save();
      await expect(
        expensesController.postExpense(ExpenseDTOStub()),
      ).rejects.toThrow(UserDoesntExist);
    });

    it('should return CategoryDoesntExist (Bad Request - 400) exception', async () => {
      
      const newUser = new userModel(UserDTOStub());
      await newUser.save();
      const newExpense = { ...ExpenseDTOStub(), userId: newUser._id.toString() };

      await expect(
        expensesController.postExpense(newExpense),
      ).rejects.toThrow(CategoryDoesntExist);
    });
  });
});
