console.log('upload js');
import { bytesToSize } from './converterBytes.js';

//todo: Функция helper что бы динамически создавать теги с классами и текстом
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

//todo: Пустая функция которая в случае чего будет помещена в значение onUpload.
//todo: И получается не будет ошибок если мы ничего не передали в options
function noop() {}

export function upload(selector, options = {}) {
  let files = [];
  const onUpload = options.onUpload ?? noop;

  const input = document.querySelector(selector);
  const preview = element('div', ['preview']);

  preview.classList.add('preview');

  //todo: Тут динамически создаю кнопку и добавляю на неё класс со стилями
  //todod: И добавляю её после инпута
  const open = element('button', ['btn'], 'Открыть');
  const upload = element('button', ['btn', 'primary'], 'Загрузить');

  upload.style.display = 'none';

  input.insertAdjacentElement('afterend', preview);
  input.insertAdjacentElement('afterend', upload);
  input.insertAdjacentElement('afterend', open);

  //todo: Проверя объект на true. И появляется возможность добавлять несколько картинок
  if (options.multi) {
    input.setAttribute('multiple', true);
  }

  //todo: Обрабатываем варинт какие типы файлов можем принимать
  if (options.accept && Array.isArray(options.accept)) {
    input.setAttribute('accept', options.accept.join(','));
  }

  //todo: Вешаю обработчик на кнопку, и чтобы по килку на её триггирилась загрузка файла
  const triggerInput = () => input.click();

  const changeHandler = (e) => {
    if (!e.target.files.length) {
      return;
    }

    //todo: Создаём массив чтобы по нему можно было итерироваться
    files = Array.from(e.target.files);

    //todo: очищает предыдущий запрос картинок
    preview.innerHTML = '';
    upload.style.display = 'inline';

    files.forEach((file) => {
      if (!file.type.match('image')) {
        return;
      }

      //todo: вызываем к браузерному методу для считывания файла
      const reader = new FileReader();

      //todo: по событию onload создаём img и вставляем строку
      reader.onload = (ev) => {
        const src = ev.target.result;

        preview.insertAdjacentHTML(
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

      //todo: сюда передаём файл чтобы его считывать. главное добавлять его в конце
      //todo: так как это асинхронная операция
      reader.readAsDataURL(file);
    });
  };

  const removeHandler = (e) => {
    if (!e.target.dataset.name) {
      return;
    }

    const { name } = e.target.dataset;

    files = files.filter((file) => file.name !== name);

    //todo: удаляем кнопку загрузки если у нас пустой массив
    //todo: и нет картинок
    if (!files.length) {
      upload.style.display = 'none';
    }

    const block = preview
      .querySelector(`[data-name="${name}"]`)
      .closest('.preview-image');

    block.classList.add('removing');
    setTimeout(() => block.remove(), 300);
    // block.remove();
    console.log('block', block);
  };

  //todo: Функция для отчистки информации чтобы отсавить одну картинку,
  //todo: на которой мы потом будем показывать прогрузку
  const clearPreview = (el) => {
    el.style.bottom = '4px';
    el.innerHTML = '<div class="preview-info-progress"></div>';
  };

  const uploadHandler = () => {
    preview.querySelectorAll('.preview-remove').forEach((e) => e.remove());

    const previewInfo = preview.querySelectorAll('.preview-info');
    previewInfo.forEach(clearPreview);
    console.log('previewInfo', previewInfo);
    onUpload(files, previewInfo);
  };

  open.addEventListener('click', triggerInput);
  input.addEventListener('change', changeHandler);
  preview.addEventListener('click', removeHandler);
  upload.addEventListener('click', uploadHandler);
}
