import { NextResponse } from 'next/server';
import { removeToken } from '../../../../lib/auth';

export async function POST(request) {
    // Clear the user's session or authentication token here
    // For example, if using cookies:
    const tokenResponse =   await removeToken();
    console.log(tokenResponse)
    const response = NextResponse.json({ message: 'Logged out successfully', status: 200 })

    return response;
} 