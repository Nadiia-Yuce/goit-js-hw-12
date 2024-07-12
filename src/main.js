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
//Підключення бібліотеки для відображення галереї, що гортається
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt', //Підпис під зображенням
  captionDelay: 250, //Час, після якого буде відображений підпис
});

form.addEventListener('submit', handlerSubmit); //Прослуховувач подій

function handlerSubmit(event) {
  event.preventDefault(); //Запобігаємо дефолтному перезавантаженню сторінки
  gallery.innerHTML = ''; //очищаємо вміст галереї перед новим пошуком
  const query = form.elements.input.value.toLowerCase().trim(); //Обробка запиту користувача

  if (query === '') {
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
    return;
  }

  preloader.style.display = 'flex'; //Додавання прелоадера
  getPicturesByQuery(query) //HTTP запит
    .then(data => {
      //Якщо об'єкт бекенду data.hits пустий (користувач ввів щось невалідне) -> сповіщуємо про це
      if (data.hits.length === 0) {
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
        gallery.innerHTML = renderGalleryCard(data.hits); //Виклик функції для створення розмітки
        lightbox.refresh(); //Метод бібліотеки SimpleLightbox, який видаляє і повторно ініціалізує лайтбокс
      }
    })
    .catch(error => {
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
    }) //Інформуємо користувача у разі виникнення помилки
    .finally(() => {
      form.reset(); //Оновлення поля форми
      preloader.style.display = 'none'; //Видалення прелоадера після завантаження картинок
    });
}
