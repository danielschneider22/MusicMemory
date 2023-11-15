export async function getSpotifyAccessToken(apiKey: string, apiSecret: string): Promise<string> {
    const url = `https://accounts.spotify.com/api/token`;

    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");
    urlencoded.append("client_id", apiKey);
    urlencoded.append("client_secret", apiSecret);
  
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: urlencoded,
      redirect: 'follow'
    };
  
    try {
      const response = await fetch(url, requestOptions);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch Spotify access token. Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      // Assuming successful response contains an access token
      const accessToken = data.access_token;
  
      return accessToken;
    } catch (error) {
      console.error('Error fetching Spotify access token:', error);
      return "";
    }
  }

  interface ISpotifyTrack {
    name: string;
    artists: { name: string }[]
    album: { name: string, release_date: string }
  }

  export interface SpotifyTrack {
    name: string;
    artist: string,
    album: string,
    date: string,
    type: string
  }

  export async function spotifySearchTrack(track: string, bearerToken: string): Promise<SpotifyTrack[]> {
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(track)}&type=track&limit=10`;
  
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + bearerToken,
      },
    };
  
    try {
      const response = await fetch(url, requestOptions);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch Spotify track. Status: ${response.status}`);
      }
  
      const data: {tracks: {items: ISpotifyTrack[]}} = await response.json();

      const mapped = data?.tracks?.items?.map((track) => { return { name: track.name, artist: track.artists[0].name, album: track.album.name, date: track.album.release_date, type: "User Chosen" }}) || [];
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