
export interface User{
    id?:number
    name:string
    password:string
    email:string
    link:string
    photo:string | null
    membership:boolean
    created_at:string
    updated_at:string
}

export interface Article {
    id?:number,
    user_id:number,
    title:string,
    content:string,
    tag?:string
}