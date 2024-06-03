import { Image } from "./image.model";
import { WeightAndHeight } from "./weightAndHeight.model";

export class Dog {
    weight: WeightAndHeight;
    height: WeightAndHeight;
    id: number;
    name: string;
    bredFor: string;
    breedGroup: string;
    lifeSpan: string;
    temperament: string;
    origin: string;
    referenceImageId: string;
    image: Image;
    relatedIds: number[];

    constructor(apiResponse: any) {
        this.weight = apiResponse.weight;
        this.height = apiResponse.height;
        this.id = apiResponse.id;
        this.name = apiResponse.name;
        this.bredFor = apiResponse.bred_for;
        this.breedGroup = apiResponse.breed_group;
        this.lifeSpan = apiResponse.life_span;
        this.temperament = apiResponse.temperament;
        this.origin = apiResponse.origin;
        this.referenceImageId = apiResponse.reference_image_id;
        this.image = apiResponse.image;
        this.relatedIds = apiResponse.relatedIds;
    }
}