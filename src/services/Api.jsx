import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '28129133-250e8f189138f2de7512e2e52';

export async function getImages(searchName, page) {
  const url = `${API_URL}?q=${searchName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  const response = await axios.get(url);
  return response.data;
}
