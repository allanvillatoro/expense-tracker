import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { MongoMemoryServer } from "mongodb-memory-server";
import { connect, Connection, Model } from 'mongoose';
import { Category, CategorySchema } from '../schemas/category.schema';
import { CategoriesService } from './categories.service';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { CategoryDTOStub } from '../../test/stubs/category.dto.stub';
import { CategoryAlreadyExists } from '../exceptions/category-already-exists.exception';
import { UserDoesntExist } from '../exceptions/user-doesnt-exist.exception';
import { User, UserSchema } from '../schemas/user.schema';
import { UserDTOStub } from '../../test/stubs/user.dto.stub';

describe('CategoriesController', () => {
  let categoriesController: CategoriesController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let categoryModel: Model<Category>;
  let userModel: Model<User>;

  beforeAll(async()=>{
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    categoryModel = mongoConnection.model('expensecategories', CategorySchema);
    userModel = mongoConnection.model('users', UserSchema);
    
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        CategoriesService,
        { provide: getConnectionToken("DatabaseConnection"), useValue: mongoConnection },
        { provide: getModelToken('expensecategories'), useValue: categoryModel },
        { provide: getModelToken('users'), useValue: userModel }
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

      const newUser = new userModel(UserDTOStub());
      await newUser.save();
      const newCategory = { ...CategoryDTOStub(), userId: newUser._id.toString() };
      await (new categoryModel(newCategory).save());

      const categories = await categoriesController.getCategoriesByUser(newUser._id.toString());
      expect(categories.length === 1 && Array.isArray(categories)).toBeTruthy();
    });
    it("should return the saved category", async () => {

      const newUser = new userModel(UserDTOStub());
      await newUser.save();
      const newCategory = { ...CategoryDTOStub(), userId: newUser._id.toString() };
      await (new categoryModel(newCategory).save());

      const categories = await categoriesController.getCategoriesByUser(newUser._id.toString());
      const category = categories[0];
      expect(category.name).toBe(CategoryDTOStub().name);
    });
    it("should return an empty array", async () => {
      const categories = await categoriesController.getCategoriesByUser('62df501ee11250bb65262493');
      expect(categories.length === 0 && Array.isArray(categories)).toBeTruthy();
    });
  })

  describe ("postCategory",()=>{
    it("should return the saved category", async () => {

      const newUser = new userModel(UserDTOStub());
      await newUser.save();
      const newCategory = { ...CategoryDTOStub(), userId: newUser._id.toString() };
      const createdCategory = await categoriesController.postCategory(newCategory);
      expect(createdCategory.name).toBe(CategoryDTOStub().name);
    });

    //new
    it('should return UserDoesntExist (Bad Request - 400) exception', async () => {
      await expect(
        categoriesController.postCategory(CategoryDTOStub()),
      ).rejects.toThrow(UserDoesntExist);
    });

    it("should return CategoryAlreadyExists (Bad Request - 400) exception", async () => {

      const newUser = new userModel(UserDTOStub());
      await newUser.save();
      const newCategory = { ...CategoryDTOStub(), userId: newUser._id.toString() };

      await (new categoryModel(newCategory).save());
      await expect(categoriesController.postCategory(newCategory))
        .rejects
        .toThrow(CategoryAlreadyExists);
    });
  })
});

