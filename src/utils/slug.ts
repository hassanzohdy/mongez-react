import slugify from "slugify";

export default function slug(text: string): string {
    return slugify(text).toLocaleLowerCase();
}