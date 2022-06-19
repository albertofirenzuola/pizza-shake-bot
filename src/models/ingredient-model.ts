export class IngredientModel {

    constructor(
        public id = 0,
        public name = '',
        public category = ''
    ) {}

    static fromJson(json: any ): IngredientModel {
        return new IngredientModel(
            json.id,
            json.name,
            json.category
        );
    }

    static arrayFromJson(data: any[]): IngredientModel[] {
        return data.map(item => IngredientModel.fromJson(item));
    }

}