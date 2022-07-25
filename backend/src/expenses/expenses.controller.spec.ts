import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesController } from './expenses.controller';
import { MongoMemoryServer } from "mongodb-memory-server";
import { connect, Connection, Model } from 'mongoose';
import { Expense, ExpenseSchema } from '../schemas/expense.schema';
import { ExpensesService } from './expenses.service';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { ExpenseDTOStub } from '../../test/stubs/expense.dto.stub';
import { CategoryDoesntExist } from '../exceptions/category-doesnt-exist.exception';
import { Category, CategorySchema } from '../schemas/category.schema';
import { CategoryDTOStub } from '../../test/stubs/category.dto.stub';

describe('ExpensesController', () => {
  let expensesController: ExpensesController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let expenseModel: Model<Expense>;
  let categoryModel: Model<Category>;

  beforeAll(async()=>{
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;

    expenseModel = mongoConnection.model('expenses', ExpenseSchema);
    categoryModel = mongoConnection.model('expensecategories', CategorySchema);

    const app: TestingModule = await Test.createTestingModule({
      controllers: [ExpensesController],
      providers: [
        ExpensesService,
        { provide: getConnectionToken("DatabaseConnection"), useValue: mongoConnection },
        { provide: getModelToken('expenses'), useValue: expenseModel },
        { provide: getModelToken('expensecategories'), useValue: categoryModel },
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

  describe("getExpenses",()=>{
    it("should return an array with one expense", async () => {
      await (new expenseModel(ExpenseDTOStub()).save());
      const expenses = await expensesController.getExpenses();
      expect(expenses.length === 1 && Array.isArray(expenses)).toBeTruthy();
    });
    it("should return the saved expense", async () => {
      await (new expenseModel(ExpenseDTOStub()).save());
      const expenses = await expensesController.getExpenses();
      const expense = expenses[0];
      expect(expense.description).toBe(ExpenseDTOStub().description);
    });
    it("should return an empty array", async () => {
      const expenses = await expensesController.getExpenses();
      expect(expenses.length === 0 && Array.isArray(expenses)).toBeTruthy();
    });
  })

  describe ("postExpense",()=>{
    it("should return the saved expense", async () => {
      //Add: create the related category on the db
      await (new categoryModel(CategoryDTOStub()).save());
      const createdExpense = await expensesController.postExpense(ExpenseDTOStub());
      expect(createdExpense.description).toBe(ExpenseDTOStub().description);
    });

    it("should return CategoryDoesntExist (Bad Request - 400) exception", async () => {
      await (new expenseModel(ExpenseDTOStub()).save());
      await expect(expensesController.postExpense(ExpenseDTOStub()))
        .rejects
        .toThrow(CategoryDoesntExist);
    });
  })
});
