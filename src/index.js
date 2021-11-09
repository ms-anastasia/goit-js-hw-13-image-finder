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
  clearContainer();

  imgApiService.resetPage();
  imgApiService.searchQuery = e.currentTarget.elements.query.value;
  if (imgApiService.searchQuery === '') {
        defaultModules.set(PNotifyMobile, {});
        return alert({
            text: '! Search query is empty!',
            addClass: 'notify',
            delay: 2000,
        });

  };
  
  imgApiService.fetchImg().then(hits => {
    clearContainer();
    renderGallery(hits);
  }).catch(error => {
            console.log(error);
            defaultModules.set(PNotifyMobile, {});
            return alert({
                text: '! Information is not found!',
                addClass: 'notify',
                delay: 2000,
            });
        });;
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
  loadMoreBtn.hide();
}


