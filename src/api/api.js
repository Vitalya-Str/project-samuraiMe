import axios from "axios";

const instance = axios.create({
   withCredentials: true,
   baseURL: `https://social-network.samuraijs.com/api/1.0/`,
   headers: {
      'API-KEY': 'd0ce4cd8-d0d2-4152-99ad-f6e1407cb23f'
   }

})

export const UsersAPI = {
   getUsers(currentPage, pageSize) {
      return instance.get(`users?page=${currentPage}&count=${pageSize}`)
         .then(response => response.data)
   }
}

export const followAPI = {
   unfollow(userId) {
      return instance.delete(`follow/${userId}`)
         .then(response => response.data)
   },
   follow(userId) {
      return instance.post(`follow/${userId}`)
         .then(response => response.data)
   }
}

export const authAPI = {
   authMe() {
      return instance.get(`auth/me`)
         .then(response =>response.data)
   }
}