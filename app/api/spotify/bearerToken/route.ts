import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    const url = `https://accounts.spotify.com/api/token`;

    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");
    urlencoded.append("client_id", process.env.SPOTIFY_API_KEY!);
    urlencoded.append("client_secret", process.env.SPOTIFY_API_SECRET!);

    let bearerToken = ""
  
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: urlencoded,
      redirect: 'follow',
      cache: 'no-store'
    };
  
    try {
      const response = await fetch(url, requestOptions);
  
      if (!response.ok) {
        return NextResponse.json({ error: "Error fetching bearer token." }, { status: 400 })
      }
  
      const data = await response.json();
  
      // Assuming successful response contains an access token
      bearerToken = data.access_token;
    } catch (error) {
      console.error('Error fetching Spotify access token:', error);
    }
    const headers = {
      'Cache-Control': 'no-store, max-age=0'
    };

    return NextResponse.json({ bearerToken }, { headers })
}

export const revalidate=0
export const fetchCache = 'force-no-store'