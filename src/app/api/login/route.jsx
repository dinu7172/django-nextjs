"use server"
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getRefreshToken, getToken, setRefreshToken, setToken } from '../../../../lib/auth';
const DJANGO_API_LOGIN_URL = "http://127.0.0.1:8001/api/token/pair"

export async function POST(request) {
    try {
        const token = await getToken();
        const refreshToken = await getRefreshToken();
        console.log("Token:- ", token, " and Refresh Token:" , refreshToken)
        const requestData = await request.json();
        const jsonData = JSON.stringify(requestData)
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json" 
            },
            body: jsonData
        }
        const response = await fetch(DJANGO_API_LOGIN_URL, requestOptions)
        const responseData = await response.json();
        if(response.ok){
            console.log("Login successful!")
            const {access, refresh} = responseData;
            await setToken(access);
            await setRefreshToken(refresh);
            return NextResponse.json({"loggIn": true}, { status: 200 });
        }
        return NextResponse.json({"loggIn": false, ...responseData}, { status: 400 });
        console.log("")
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}