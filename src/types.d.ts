export interface Sub {
    nick: string,
    subMonthos: number,
    avatar: string,
    description?: string
}



export type SubsResponseFromApi = Array<{
    nick: string
    months: number
    profileUrl: string
    description: string
}>