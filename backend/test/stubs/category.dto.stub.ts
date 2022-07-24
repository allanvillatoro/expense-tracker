import { CategoryDTO } from "src/categories/dto/category.dto";

export const CategoryDTOStub = (): CategoryDTO => {
    return {
        name: 'Alimentos',
        budget: 400,
        alarmThreshold: 80
    };
  };