
import { getToken } from '../../../../lib/auth';
import { NextResponse } from 'next/server';
const url = 'http://127.0.0.1:8001/api/waitlists';

export async function GET(request){
    const authToken = await getToken(); // Replace with your actual token
    if(!authToken){
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const result = await response.json()
        let status = 200;
        if(!response.ok){
            status = 401;
        }
        return NextResponse.json({...result}, {status: status});
    } catch (error) {
        console.error('Error fetching waitlists:', error);
    }
};

// getWaitlists();