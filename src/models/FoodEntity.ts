export class FoodItem {
    name: string;
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    fiber: number;
    sugar: number;
    image: string;

    constructor(
        name: string,
        calories: number,
        protein: number,
        fat: number,
        carbs: number,
        fiber: number,
        sugar: number,
        image: string,
    ) {
        this.name = name;
        this.calories = calories;
        this.protein = protein;
        this.fat = fat;
        this.carbs = carbs;
        this.fiber = fiber;
        this.sugar = sugar;
        this.image = image;
    }

    toJson(): string {
        return JSON.stringify({
            name: this.name,
            calories: this.calories,
            protein: this.protein,
            fat: this.fat,
            carbs: this.carbs,
            fiber: this.fiber,
            sugar: this.sugar,
            image: this.image,
        });
    }

    static fromJson(json: string): FoodItem {
        const data = JSON.parse(json);
        return new FoodItem(
            data.name,
            data.calories,
            data.protein,
            data.fat,
            data.carbs,
            data.fiber,
            data.sugar,
            data.image,
        );
    }
}

export interface FoodState { foodStore: { list: FoodItem[]; }; }