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
