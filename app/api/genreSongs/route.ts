import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    const body = await request.json();
    const genre = body.genre;
    const numRequested = body.numRequested
    const lowerDate = body.lowerDate
    const upperDate = body.upperDate

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + process.env.CHAT_GPT_API_TOKEN);

    const raw = JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [
        {
            "role": "user",
            "content": "Output " + numRequested + " popular songs with the genre " + genre + " released between " + lowerDate + " and " + upperDate + ". Do not number the outputted songs and do not include the artist name. The format of this output should be Song A\nSong B\nSong C"
        }
        ],
        "temperature": 0.7,
        "max_tokens": 500
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", (requestOptions as any))
    const responseInfo = await response.json()
    const responseText = responseInfo.choices[0].message.content;
    try{
        const songArray = responseText.split("\n").map((song: string) => song.replace(/[\d]+\./g, "").trim());
        return NextResponse.json({ songs: songArray })
    } catch(e) {
        return NextResponse.json({ error: e, responseText }, { status: 400 })
    }
    
}