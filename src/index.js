import imageTpl from './templates/images.hbs';
import './css/styles.css';
import ImgApiService from './js/apiService';
import LoadMoreBtn from './js//load-more';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  galleryContainer: document.querySelector('.js-images-container'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const imgApiService = new ImgApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  imgApiService.searchQuery = event.currentTarget.elements.query.value;
  imgApiService.resetPage();
  imgApiService.fetchImg().then(hits => {
    clearContainer();
    renderGallery(hits);
  });
}
function renderGallery(hits) {
        refs.galleryContainer.insertAdjacentHTML('beforeend', imageTpl(hits));
}
function onLoadMore(hits) {
  imgApiService.fetchImg().then(renderGallery);
}
function clearContainer() {
    refs.galleryContainer.innerHTML = '';
}
  // if (imgApiService.query === '') {
  //   return alert('Введи что-то нормальное');
// //   loadMoreBtn.show();
//   imgApiService.resetPage();
// //   clearContainer();
//   fetchGallery();
// }

// function fetchGallery() {
// //   loadMoreBtn.disable();
//   imgApiService.fetchGallery().then(gallery => {
//     appendGalleryMarkup(gallery);
//     // loadMoreBtn.enable();
//   });
// }

