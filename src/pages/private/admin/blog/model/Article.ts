export interface ArticleDto {
    idArticle: string
    title: string
    status: string
    description: string
    portada: string
    created: string
    employe: {
        idEmploye: string
        fullName: string
        photo: string
    }
}

export interface ArticleRequest {
    employe: string
    title: string
    category: string
    description: string
    paragraph1: string
    paragraph2: string
    paragraph3: string
    paragraph4: string
    paragraph5: string
    paragraph6: string
    portada?: File
    img1?: File
    img2?: File
    img3?: File
    img4?: File
    img5?: File
    img6?: File
    [key: string]: any; // Added to allow dynamic image keys
}

export interface Article {
    idArticle: string
    employe: {
        idEmploye: string
        fullName: string
        photo: string
    }
    title: string
    category: string
    code: string
    created: string
    description: string
    status: string
    paragraph1: string
    paragraph2: string
    paragraph3: string
    paragraph4: string
    paragraph5: string
    paragraph6: string
    portada: string
    img1: string
    img2: string
    img3: string
    img4: string
    img5: string
    img6: string
}