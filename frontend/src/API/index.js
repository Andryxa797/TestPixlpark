import axios from "axios";

export const PublicKey = '38cd79b5f2b2486d86f562e3c43034f8'
export const PrivateKey = '8e49ff607b1f46e1a5e8f6ad5d312a80'


const instance = () => {
    return axios.create({
        baseURL: 'http://localhost:3001',
        headers: {'Target-URL': `http://api.pixlpark.com`},
    });
}

export const AuthAPI = {
    GetRequestToken: () => {
        return instance().get('/oauth/requesttoken')
    },
    GetAccessToken: (requestToken, publicKey, privateKey) => {
        return instance().get('/oauth/accesstoken', {
            params: {
                oauth_token: requestToken,
                grant_type: 'api',
                username: publicKey,
                password: privateKey
            }
        })
    },
    GetRefreshToken: (refreshToken) => {
        return instance().get('/oauth/refreshtoken', {
            params: {
                refreshtoken: refreshToken,
            }
        })
    },
    UnAuthorize: (oauthToken) => {
        return instance().get('/oauth/unauthorize', {
            params: {
                oauth_token: oauthToken,
            }
        })
    },
}

export const OrdersAPI = {
    GetOrderList: (accessToken) => {
        return instance().get('/orders', {
            params: {
                oauth_token: accessToken,
            }
        })
    },
}