var getFromApi = function(endpoint, query={}) {
    const url = new URL(`https://api.spotify.com/v1/${endpoint}`);
    Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));
    return fetch(url).then(function(response) {
        if (!response.ok) {
            return Promise.reject(response.statusText);
        }
        return response.json();
    });
};

var getRelatedArtist = function(artist, ID) {
    const url = new URL(`https://api.spotify.com/v1/${artist}/${ID}/related-artists`);
    return fetch(url).then(function(response) {
        if (!response.ok) {
            return Promise.reject(response.statusText);
        }
        return response.json();
    });
};


var artistID;
var getArtist = function(name) {
    let query = {
      q: name,
      limit: 1,
      type: 'artist'
    };
    console.log('hello');
    return getFromApi('search', query)
    .then( response =>{
        artistID = response.artists.items[0].id;
        console.log(artistID);
        return artistID;
      }).then((artistID)=>{
          console.log(getRelatedArtist('artists', artistID));
        return getRelatedArtist('artists', artistID);
      }).catch( err =>{
        console.error(err.message);
        }
      );
};