import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getPicturesByQuery } from './js/pixabay-api';
import { renderGalleryCard } from './js/render-functions';
import errorSvg from './img/error.svg';
import cautionSvg from './img/caution.svg';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const preloader = document.querySelector('.loader-wrap');
const loadMoreBtn = document.querySelector('.load-more-btn');
// const secondPreloader = document.querySelector('.second-loader-wrap');

//Підключення бібліотеки для відображення галереї, що гортається
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt', //Підпис під зображенням
  captionDelay: 250, //Час, після якого буде відображений підпис
});
const params = {
  query: '',
  page: 1,
  per_page: 15,
  max_page: 0,
};

form.addEventListener('submit', handlerSubmit); //Прослуховувач подій

async function handlerSubmit(event) {
  event.preventDefault(); //Запобігаємо дефолтному перезавантаженню сторінки
  gallery.innerHTML = ''; //очищаємо вміст галереї перед новим пошуком
  params.page = 1;
  params.query = form.elements.input.value.trim(); //Обробка запиту користувача

  if (!params.query) {
    //Якщо користувач залишив поле пустим
    iziToast.warning({
      title: 'Caution',
      titleColor: 'white',
      titleSize: '16px',
      message: 'Please, fill out the field!',
      messageColor: 'white',
      messageSize: '16px',
      position: 'topRight',
      backgroundColor: '#ffa000',
      iconUrl: cautionSvg,
      close: false,
      closeOnClick: true,
    });
    form.reset();
    return;
  }

  preloader.style.display = 'flex'; //Додавання прелоадера
  try {
    const picture = await getPicturesByQuery(params); //HTTP запит, результатом якого буде об'єкт, записаний в picture

    // Якщо об'єкт бекенду data.hits пустий (користувач ввів щось невалідне) -> сповіщуємо про це
    if (picture.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        titleColor: 'white',
        titleSize: '16px',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: 'white',
        messageSize: '16px',
        position: 'bottomRight',
        backgroundColor: '#ef4040',
        iconUrl: errorSvg,
        close: false,
        closeOnClick: true,
      });
    } else {
      params.max_page = Math.ceil(picture.totalHits / params.per_page);
      if (params.max_page > 1) {
        loadMoreBtn.style.display = 'block';
        loadMoreBtn.addEventListener('click', handlerLoadMore);
      } else {
        loadMoreBtn.style.display = 'none';
      }
      gallery.innerHTML = renderGalleryCard(picture.hits); //Виклик функції для створення розмітки
      lightbox.refresh(); //Метод бібліотеки SimpleLightbox, який видаляє і повторно ініціалізує лайтбокс
    }
    //Інформуємо користувача у разі виникнення помилки
  } catch (error) {
    iziToast.error({
      title: 'Error',
      titleColor: 'white',
      titleSize: '16px',
      message: `Ups... Someting went wrong. Error: ${error}`,
      messageColor: 'white',
      messageSize: '16px',
      position: 'bottomRight',
      backgroundColor: '#ef4040',
      iconUrl: errorSvg,
      close: false,
      closeOnClick: true,
    });
  } finally {
    form.reset(); //Оновлення поля форми
    preloader.style.display = 'none'; //Видалення прелоадера після завантаження картинок
  }
}

async function handlerLoadMore() {
  params.page += 1;
  preloader.style.display = 'flex';
  loadMoreBtn.style.display = 'none';
  try {
    const picture = await getPicturesByQuery(params);
    gallery.insertAdjacentHTML('beforeend', renderGalleryCard(picture.hits));
    lightbox.refresh();

    //!тут буде плавний скролл
  } catch (error) {
    iziToast.error({
      title: 'Error',
      titleColor: 'white',
      titleSize: '16px',
      message: `Ups... Someting went wrong. Error: ${error}`,
      messageColor: 'white',
      messageSize: '16px',
      position: 'bottomRight',
      backgroundColor: '#ef4040',
      iconUrl: errorSvg,
      close: false,
      closeOnClick: true,
    });
  } finally {
    preloader.style.display = 'none';
    if (params.page === params.max_page) {
      loadMoreBtn.style.display = 'none';
      loadMoreBtn.removeEventListener('click', handlerLoadMore);
      iziToast.warning({
        title: 'Caution',
        titleColor: 'white',
        titleSize: '16px',
        message:
          'We are sorry, but you have reached the end of search results.',
        messageColor: 'white',
        messageSize: '16px',
        position: 'topRight',
        backgroundColor: '#ffa000',
        iconUrl: cautionSvg,
        close: false,
        closeOnClick: true,
      });
    } else {
      loadMoreBtn.style.display = 'block';
    }
  }
}
