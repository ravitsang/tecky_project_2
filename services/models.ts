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

export interface Article{
    title?:string,
    content:string
}