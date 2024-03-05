
interface SpotifyBearerToken {
  bearerToken: string,
  expires: Date
}

export async function getSpotifyAccessToken(): Promise<SpotifyBearerToken> {
    const response = await fetch("/api/spotify/bearerToken", {cache: 'no-store'});
    const json = await response.json();
    if(!response.ok) {
      console.error(json.error)
      throw Error(json.error)
    }
    const oneHourFromNow = new Date(new Date());
    oneHourFromNow.setHours(new Date().getHours() + 1);
    const bearerToken =  { bearerToken: json.bearerToken, expires: oneHourFromNow}
    console.log(json.bearerToken)
    localStorage.setItem("bearerToken", JSON.stringify(bearerToken))
    return bearerToken;
  }

  interface ISpotifyTrack {
    name: string;
    artists: { name: string }[]
    album: { name: string, release_date: string }
    popularity: number
  }

  export interface SpotifyTrack {
    name: string;
    artist: string,
    album: string,
    date: string,
    type: string,
    popularity: number
  }

  export async function spotifySearchTrack(search: string, limit: number): Promise<SpotifyTrack[]> {
    let bearerTokenStr = localStorage.getItem("bearerToken")
    let token = bearerTokenStr ? JSON.parse(bearerTokenStr) : undefined
    if(!token || (token && new Date() > new Date(token.expires))) {
      token = await getSpotifyAccessToken();
    }

    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(search)}&type=track&limit=${limit}`;
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token.bearerToken,
      },
    };
  
    try {
      const response = await fetch(url, requestOptions);
  
      if (!response.ok) {
        const data = await response.json();
        if(data.error.message.includes("expired")) {
          await getSpotifyAccessToken();
          return spotifySearchTrack(search, limit);
        } else {
          throw new Error(`Failed to fetch Spotify track. Status: ${response.status}`);
        }
        
      }
  
      const data: {tracks: {items: ISpotifyTrack[]}} = await response.json();
      const mapped = data?.tracks?.items?.map((track) => { return { name: track.name, artist: track.artists[0].name, album: track.album.name, date: track.album.release_date, popularity: track.popularity, type: "User Chosen" }}) || [];
      return mapped.filter(
        (song, index, self) =>
          index ===


          self.findIndex((s) => s.name === song.name && s.artist === song.artist)
      )

    } catch (error) {
      console.error('Error fetching Spotify track:', error);
      return [];
    }
  }