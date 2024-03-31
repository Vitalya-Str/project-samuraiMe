export type PostType = {
    id: number
    message: string
    likeCount: number
}
export type ProfileType = {
    aboutMe: string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotoType
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
export type PhotoType = {
    small: string | null
    large: string | null
}
export type UserType = {
    id: number
    name: string
    status: string | null
    photos: PhotoType
    followed: boolean
}
export type MessageType = {
    id: number
    message: string
}
export type DialogType = {
    id: number &  HTMLAnchorElement
    name: string
}