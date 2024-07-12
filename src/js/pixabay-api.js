export function getPicturesByQuery(query) {
  const FullURL = `https://pixabay.com/api/?key=44778240-802eb20b46cf6f3dc26aab8d1&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

  return fetch(FullURL).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}
