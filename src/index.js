import imageTpl from './templates/images.hbs';
import './css/styles.css';
import ImgApiService from './js/apiService';
import LoadMoreBtn from './js//load-more';
import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  galleryContainer: document.querySelector('.js-images-container'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};
const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});
const imgApiService = new ImgApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  imgApiService.searchQuery = e.currentTarget.elements.query.value;
  imgApiService.resetPage();
  imgApiService.fetchImg().then(hits => {
    clearContainer();
    renderGallery(hits);
  });
  if (imgApiService.searchQuery === '') {
        defaultModules.set(PNotifyMobile, {});
        return alert({
            text: '! Enter something!',
            addClass: 'notify',
            delay: 2000,
        });

    };
}
function renderGallery(hits) {
  if (hits.length >= 12) {
        loadMoreBtn.show();
    }
    else {
        loadMoreBtn.hide();
    }
        refs.galleryContainer.insertAdjacentHTML('beforeend', imageTpl(hits));
}
function onLoadMore(hits) {
  imgApiService.fetchImg().then(renderGallery);
  const element = refs.loadMoreBtn;
element.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
});
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

