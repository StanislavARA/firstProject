export type PostType = {
    id: number
    message: string
    likes: number
    avatar: string | undefined
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small:string|undefined
    large: string|undefined
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe: string
}
export type UserType = {
    name: string
    id: number
    uniqueUrlName: null,
    photos: PhotosType
    status: null | string,
    followed: boolean
}