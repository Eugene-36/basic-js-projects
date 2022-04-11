import { bytesToSize } from './converterBytes.js';

//? Функция helper что бы динамически создавать теги с классами и текстом
const element = (tag, classes = [], content) => {
  const node = document.createElement(tag);

  if (classes.length) {
    node.classList.add(...classes);
  }

  if (content) {
    node.textContent = content;
  }

  return node;
};

//? Пустая функция которая в случае чего будет помещена в значение onUpload.
//? И получается не будет ошибок если мы ничего не передали в options
function noop() {}

export class Upload {
  #options;
  #input;
  constructor(selector, options = {}, files = []) {
    this.selector = selector;
    this.#options = options;
    this.files = files;
    this.#input = document.querySelector(selector);
    this.open = element('button', ['btn'], 'Открыть');
    this.upload = element('button', ['btn', 'primary'], 'Загрузить');
    this.preview = element('div', ['preview']);
    this.onUpload = options.onUpload ?? noop;
  }

  //? Тут динамически создаю кнопку и добавляю на неё класс со стилями
  //? И добавляю её после инпута
  createBtn() {
    this.preview.classList.add('preview');

    this.upload.style.display = 'none';
    this.#input.insertAdjacentElement('afterend', this.preview);
    this.#input.insertAdjacentElement('afterend', this.upload);
    this.#input.insertAdjacentElement('afterend', this.open);

    //?: Проверя объект на true. И появляется возможность добавлять несколько картинок
    if (this.#options.multi) {
      this.#input.setAttribute('multiple', true);
    }

    //?: Обрабатываем варинт какие типы файлов можем принимать
    if (this.#options.accept && Array.isArray(this.#options.accept)) {
      this.#input.setAttribute('accept', this.#options.accept.join(','));
    }

    console.log('this.input', this.input);
    //?: Вешаю обработчик на кнопку, и чтобы по килку на её триггирилась загрузка файла
    const triggerInput = () => this.#input.click();

    this.handleListeners(triggerInput, this.open);
  }

  changeHandler = (e) => {
    if (!e.target.files.length) {
      return;
    }

    //?: Создаём массив чтобы по нему можно было итерироваться
    this.files = Array.from(e.target.files);

    //?: очищает предыдущий запрос картинок
    this.preview.innerHTML = '';
    this.upload.style.display = 'inline';

    this.files.forEach((file) => {
      if (!file.type.match('image')) {
        return;
      }

      //?: вызываем к браузерному методу для считывания файла
      const reader = new FileReader();

      //?: по событию onload создаём img и вставляем строку
      reader.onload = (ev) => {
        const src = ev.target.result;

        this.preview.insertAdjacentHTML(
          'afterbegin',
          `
        <div class="preview-image">
          <div class="preview-remove" data-name="${file.name}">&times;</div>
          <img src="${src}" alt="${file.name}">
           <div class="preview-info">
            <spna>${file.name}</spna>
           ${bytesToSize(file.size)}
           </div>
        </div>
        
        `
        );
      };

      //?: сюда передаём файл чтобы его считывать. главное добавлять его в конце
      //?: так как это асинхронная операция
      reader.readAsDataURL(file);
    });
  };

  removeHandler = (e) => {
    if (!e.target.dataset.name) {
      return;
    }

    const { name } = e.target.dataset;

    console.log('name', name);

    this.files = this.files.filter((file) => file.name !== name);

    //?: удаляем кнопку загрузки если у нас пустой массив
    //?: и нет картинок

    if (!this.files.length) {
      this.upload.style.display = 'none';
    }

    const block = this.preview
      .querySelector(`[data-name="${name}"]`)
      .closest('.preview-image');

    block.classList.add('removing');
    setTimeout(() => block.remove(), 300);
    // block.remove();
    console.log('block', block);
  };

  clearPreview = (el) => {
    el.style.bottom = '4px';
    el.innerHTML = '<div class="preview-info-progress"></div>';
  };

  uploadHandler = () => {
    this.preview.querySelectorAll('.preview-remove').forEach((e) => e.remove());

    const previewInfo = this.preview.querySelectorAll('.preview-info');
    console.log('previewInfo', previewInfo);

    previewInfo.forEach(this.clearPreview);
    console.log('previewInfo', previewInfo);
    this.onUpload(this.files, previewInfo);
  };

  handleListeners(triggerInput, open) {
    open.addEventListener('click', triggerInput);
    this.#input.addEventListener('change', this.changeHandler);
    this.preview.addEventListener('click', this.removeHandler);
    this.upload.addEventListener('click', this.uploadHandler);
  }
}
