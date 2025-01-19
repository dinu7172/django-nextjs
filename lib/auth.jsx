const { cookies } = require("next/headers");

const TOKEN_NAME = "auth-token";
const REFRESH_TOKEN_NAME = "auth-refresh-token";

export async function getToken(){
    const cookieStore = await cookies();
    const authToken = await cookieStore.get(TOKEN_NAME);
    return authToken?.value;
}

export async function getRefreshToken(){
    const cookieStore = await cookies();
    const authToken = await cookieStore.get(REFRESH_TOKEN_NAME);
    return authToken?.value;
}

export async function setToken(authToken){
    const cookieStore = await cookies();
    console.log("")
    await cookieStore.set({
        name: TOKEN_NAME, 
        value: authToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development',
        sameSite: 'strict',
        maxAge: process.env.TOKEN_AGE || 3600,
    });
}
export async function setRefreshToken(authRefreshToken){
    const cookieStore = await cookies();
    await cookieStore.set({
        name: REFRESH_TOKEN_NAME, 
        value: authRefreshToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development',
        sameSite: 'strict',
        maxAge: process.env.TOKEN_AGE || 3600,
    });
}

export async function removeToken(){
    const cookieStore = await cookies();
    await cookieStore.delete(TOKEN_NAME);
    return await cookieStore.delete(REFRESH_TOKEN_NAME);
}