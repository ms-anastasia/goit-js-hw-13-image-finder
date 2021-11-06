const API_KEY = '24213942-a792ed2f2e86967ff0299013f';
const BASE_URL = 'https://pixabay.com/api/';
const options = {
  headers: {
    Authorization: API_KEY,
  },
};

export default class ImgApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImg() {
      const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
      
    return fetch(url, options)
      .then(response => response.json())
      .then(({ images }) => {
        this.incrementPage();
        return images;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}