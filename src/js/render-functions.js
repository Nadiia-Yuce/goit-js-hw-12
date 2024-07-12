export function renderGalleryCard(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
      <img class="gallery-img" src="${webformatURL}" alt="${tags}" />
      <ul class="card-info">
        <li class="card-info-item">
          Likes<span class="accent">${likes}</span>
        </li>
        <li class="card-info-item">
          Views<span class="accent">${views}</span>
        </li>
        <li class="card-info-item">
          Comments<span class="accent">${comments}</span>
        </li>
        <li class="card-info-item">
          Downloads<span class="accent">${downloads}</span>
        </li>
      </ul>
      </a>
    </li>`
    )
    .join('');
}
