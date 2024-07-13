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

//Підключення бібліотеки для відображення галереї, що гортається
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt', //Підпис під зображенням
  captionDelay: 250, //Час, після якого буде відображений підпис
});

// список параметрів, який буде передаватися при НТТР запиті (pixabay-api.js)
const params = {
  query: '',
  page: 1,
  per_page: 15,
  max_page: 0,
};

form.addEventListener('submit', handlerSubmit); //Прослуховувач форми

async function handlerSubmit(event) {
  event.preventDefault(); //Запобігаємо дефолтному перезавантаженню сторінки
  gallery.innerHTML = ''; //очищаємо вміст галереї перед новим пошуком
  params.page = 1; // Після кожного нового запиту номер сторінки має скидатися до 1
  params.query = form.elements.input.value.trim(); //Запит користувача

  //Якщо користувач залишив поле пустим
  if (!params.query) {
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

  //Якщо користувач щось ввів
  preloader.style.display = 'flex'; //Додавання прелоадера
  try {
    const picture = await getPicturesByQuery(params); //HTTP запит, результатом якого буде об'єкт, записаний в picture
    // Якщо масив об'єкту бекенду picture.hits пустий (користувач ввів щось невалідне) -> сповіщуємо про це
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
      // Якщо запит валідний
    } else {
      params.max_page = Math.ceil(picture.totalHits / params.per_page); //Визначаємо максимально можливу кількість сторінок
      //Якщо ця к-ть біль, ніж 1, то ...
      if (params.max_page > 1) {
        loadMoreBtn.style.display = 'block'; //Показуємо кнопку, бо ще є, куди гортати
        loadMoreBtn.addEventListener('click', handlerLoadMore); // Додаємоп прослуховувач на кнопку "Завантажити ще"
        //Якщо сторінка тільки одна
      } else {
        loadMoreBtn.style.display = 'none'; //Ховаємо кнопку
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
  params.page += 1; //При натисканні на кнопку завантажується наступла порція зображень, тобно наступна сторінка, тому номер сторінки має збільшуватись кожного разу, коли ми натискаємо на кнопку
  preloader.style.display = 'flex'; //Показуємо прелоадер
  loadMoreBtn.style.display = 'none'; // Приховуємо кнопку
  try {
    const picture = await getPicturesByQuery(params); //НТТР запит, отримуємо об'єкт у відповідь
    gallery.insertAdjacentHTML('beforeend', renderGalleryCard(picture.hits)); // Малюємо розмітку
    lightbox.refresh(); // Перезбираємо лайтбокс

    //! плавний скролл
    const card = document.querySelector('.gallery-item'); //Важливо ініціалізувати змінну тут, так як інформація в ній актуальна. А якщо оголосити її в глобальній області видимості, то кидає помилку, бо на момент ініціалізації елемет не існує.
    const cardHeight = card.getBoundingClientRect().height; // Метод для розрахунку розмірів і положення елемента відносно в'юпорта (повертає об'єкт розмірів) https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    //Метод, що скролить вміст сторінки за певними умовами https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    window.scrollBy({
      top: cardHeight * 2, //Скроллимо вгову на дві висоти картки
      behavior: 'smooth', //плавний скролл (опшн методу, див. документацію)
    });
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
    preloader.style.display = 'none'; //прибрали прелоадер
    //Якщо поточна сторінка = максимальній (останній), то...
    if (params.page === params.max_page) {
      loadMoreBtn.style.display = 'none'; //прибираємо кнопку
      loadMoreBtn.removeEventListener('click', handlerLoadMore); //прибираємо прослуховувач подій, так як досягли максимуму сторінок і кнопка більше не потрібна
      //Інформуємо користувача, що він досяг кінця списку зображень
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
      loadMoreBtn.style.display = 'block'; //показуємо кнопку
    }
  }
}
