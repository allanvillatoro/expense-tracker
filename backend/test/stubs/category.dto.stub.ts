import { CategoryDTO } from "src/categories/dto/category.dto";

export const CategoryDTOStub = (): CategoryDTO => {
    return {
        name: 'drinks',
        budget: 400,
        alarmThreshold: 80
    };
  };