export class DrinkItem {
    name: string;
    spicy: number;
    sweet: number;
    sour: number;
    bitter: number;
    ingredients: string[];
    steps: string[];
    image: string;

    constructor(
        name: string,
        spicy: number,
        sweet: number,
        sour: number,
        bitter: number,
        ingredients: string[],
        steps: string[],
        image: string,
    ) {
        this.name = name;
        this.spicy = spicy;
        this.sweet = sweet;
        this.sour = sour;
        this.bitter = bitter;
        this.ingredients = ingredients;
        this.steps = steps;
        this.image = image;
    }

    toJson(): string {
        return JSON.stringify({
            name: this.name,
            spicy: this.spicy,
            sweet: this.sweet,
            sour: this.sour,
            bitter: this.bitter,
            ingredients: this.ingredients,
            steps: this.steps,
            image: this.image,
        });
    }

    static fromJson(json: string): DrinkItem {
        const data = JSON.parse(json);
        return new DrinkItem(
            data.name,
            data.spicy,
            data.sweet,
            data.sour,
            data.bitter,
            data.ingredients,
            data.steps,
            data.image
        );
    }
}
