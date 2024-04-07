import axios from "axios";
import { PhotoType, ProfileType, UserType } from "../types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        'API-KEY': 'd0ce4cd8-d0d2-4152-99ad-f6e1407cb23f'
    }

})

type UsersType = {
    items: UserType[]
    status: string
    followed: string
    totalCount: null | number
    error: null | string
}
type UnfollowFollowType = {
    resultCode: ResultCodeEnum
    messages: string[]
    data: {}
}
export const UsersAPI = {
    async getUsers(currentPage = 1, pageSize = 5, term: string = '', friend: null | boolean = null) {
        let response = await instance.get<UsersType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`));
        return response.data;
    },
    async unfollow(userId: number) {
        let response = await instance.delete<UnfollowFollowType>(`follow/${userId}`);
        return response.data;
    },
    async follow(userId: number) {
        let response = await instance.post<UnfollowFollowType>(`follow/${userId}`);
        return response.data;
    }
}

type UpdateStatusAPIType = {
    resultCode: ResultCodeEnum
    messages: string[]
    data: {}
}

type SavePhotoType = {
    photos: PhotoType
    resultCode: ResultCodeEnum
    messages: string[]
    data: {}
}
export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instance.put<UpdateStatusAPIType>(`profile/status`, { status })
    },
    async savePhoto(photoFile: File) {
        const formData = new FormData()
        formData.append('image', photoFile)
        const res = await instance.put<SavePhotoType>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    }
}

type AuthMeAPIType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodeEnum
    messages: string[]
}

type AuthLoginAPIType = {
    resultCode: ResultCodeEnum | ResultCodeCaptchaEnum
    messages: string[]
    data: {
        userId: number
    }
}
type LogOutAPIType = {
    resultCode: ResultCodeEnum
    messages: string[]
    data: {}
}

export enum ResultCodeEnum {
    success = 0,
    error = 1
}

export enum ResultCodeCaptchaEnum {
    captchaSuccess = 10
}

export const authAPI = {
    async authMe() {
        let response = await instance.get<AuthMeAPIType>(`auth/me`);
        return response.data;
    },
    authLogin(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instance.post<AuthLoginAPIType>(`auth/login`, { email, password, rememberMe, captcha })

    },
    logOut() {
        return instance.delete<LogOutAPIType>(`auth/login`)
    }
}

type securityAPIType = {
    url: string
}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<securityAPIType>(`security/get-captcha-url`)
    }
}