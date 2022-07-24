import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { MongoMemoryServer } from "mongodb-memory-server";
import { connect, Connection, Model } from 'mongoose';
import { Category, CategorySchema } from 'src/schemas/category.schema';
import { CategoriesService } from './categories.service';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { CategoryDTOStub } from 'test/stubs/category.dto.stub';
import { CategoryAlreadyExists } from 'src/exceptions/category-already-exists.exception';

describe('CategoriesController', () => {
  let categoriesController: CategoriesController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let categoryModel: Model<Category>;

  beforeAll(async()=>{
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    categoryModel = mongoConnection.model('expensecategories', CategorySchema);
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        CategoriesService,
        { provide: getConnectionToken("DatabaseConnection"), useValue: mongoConnection },
        { provide: getModelToken('expensecategories'), useValue: categoryModel },
      ],
    }).compile();
    categoriesController = app.get<CategoriesController>(CategoriesController);
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

  describe("getCategories",()=>{
    it("should return an array with one category", async () => {
      await (new categoryModel(CategoryDTOStub()).save());
      const categories = await categoriesController.getCategories();
      expect(categories.length === 1 && Array.isArray(categories)).toBeTruthy();
    });
    it("should return the saved category", async () => {
      await (new categoryModel(CategoryDTOStub()).save());
      const categories = await categoriesController.getCategories();
      const category = categories[0];
      expect(category.name).toBe(CategoryDTOStub().name);
    });
    it("should return an empty array", async () => {
      const categories = await categoriesController.getCategories();
      expect(categories.length === 0 && Array.isArray(categories)).toBeTruthy();
    });
  })

  describe ("postCategory",()=>{
    it("should return the saved category", async () => {
      const createdCategory = await categoriesController.postCategory(CategoryDTOStub());
      expect(createdCategory.name).toBe(CategoryDTOStub().name);
    });

    it("should return CategoryAlreadyExists (Bad Request - 400) exception", async () => {
      await (new categoryModel(CategoryDTOStub()).save());
      await expect(categoriesController.postCategory(CategoryDTOStub()))
        .rejects
        .toThrow(CategoryAlreadyExists);
    });
  })
});

