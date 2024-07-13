import axios from 'axios';

export function getPicturesByQuery({
  query = '',
  page = 1,
  per_page = 15,
} = {}) {
  const FullURL = `https://pixabay.com/api/?key=44778240-802eb20b46cf6f3dc26aab8d1&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

  return axios
    .get(FullURL, { params: { query, page, per_page } })
    .then(({ data }) => data);
}
