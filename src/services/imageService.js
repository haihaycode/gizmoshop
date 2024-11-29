import { HOST } from "@/api/config";

export const loadImage = (imageName, type) => {
    return `${HOST}/api/public/image/load/${type}/${imageName}`
}