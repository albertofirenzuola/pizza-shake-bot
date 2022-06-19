import ingredientsJson from '../assets/ingredients.json';
import { IngredientModel } from '../models/ingredient-model';

export class IngredientService { 

    readonly ingredients = IngredientModel.arrayFromJson(ingredientsJson);

}