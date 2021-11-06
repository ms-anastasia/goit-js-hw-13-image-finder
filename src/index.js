import imageTpl from './templates/images.hbs';
import './css/styles.css';
import ImgsApiService from './js/apiService';
import LoadMoreBtn from './js//load-more';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  galleryContainer: document.querySelector('.js-images-container'),
};

// const loadMoreBtn = new LoadMoreBtn({
//   selector: '[data-action="load-more"]',
//   hidden: true,
// });
const imgApiService = new ImgsApiService();

refs.searchForm.addEventListener('submit', onSearch);
// loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function onSearch(e) {
  e.preventDefault();

  imgApiService.query = e.currentTarget.elements.query.value;

  if (imgApiService.query === '') {
    return alert('Введи что-то нормальное');
  }

//   loadMoreBtn.show();
  imgApiService.resetPage();
//   clearContainer();
  fetchGallery();
}

function fetchGallery() {
//   loadMoreBtn.disable();
  imgApiService.fetchGallery().then(gallery => {
    appendGalleryMarkup(gallery);
    // loadMoreBtn.enable();
  });
}

function appendGalleryMarkup(gallery) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', imageTpl(gallery));
}

// function clearContainer() {
//   refs.galleryContainer.innerHTML = '';
// }