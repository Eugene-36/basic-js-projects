import React from 'react';
import s from './style.css';
import { bytesToSize } from './ConverterBytes.js';

//?: Функция helper что бы динамически создавать теги с классами и текстом
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

//?: Пустая функция которая в случае чего будет помещена в значение onUpload.
//?: И получается не будет ошибок если мы ничего не передали в options
function noop() {}

export default function Upload({ selector, options = {} }) {
  console.log('file', selector);
  console.log('accept', options);
  let files = [];
  let src;
  const onUpload = options.onUpload ?? noop;

  const input = document.querySelector(selector);
  const preview = element('div', ['preview']);

  console.log('input', document.getElementById('#file'));
  preview.classList.add('preview');

  //?: Тут динамически создаю кнопку и добавляю на неё класс со стилями
  //?: И добавляю её после инпута
  const open = element('button', ['btn'], 'Открыть');
  const upload = element('button', ['btn', 'primary'], 'Загрузить');

  upload.style.display = 'none';

  input.insertAdjacentElement('afterend', preview);
  input.insertAdjacentElement('afterend', upload);
  input.insertAdjacentElement('afterend', open);

  //?: Проверя объект на true. И появляется возможность добавлять несколько картинок
  if (options.multi) {
    input.setAttribute('multiple', true);
  }

  //?: Обрабатываем варинт какие типы файлов можем принимать
  if (options.accept && Array.isArray(options.accept)) {
    input.setAttribute('accept', options.accept.join(','));
  }

  //?: Вешаю обработчик на кнопку, и чтобы по килку на её триггирилась загрузка файла
  const triggerInput = () => input.click();

  const changeHandler = (e) => {
    if (!e.target.files.length) {
      return;
    }

    //?: Создаём массив чтобы по нему можно было итерироваться
    files = Array.from(e.target.files);

    //?: очищает предыдущий запрос картинок
    preview.innerHTML = '';
    upload.style.display = 'inline';

    files.forEach((file) => {
      if (!file.type.match('image')) {
        return;
      }

      //?: вызываем к браузерному методу для считывания файла
      const reader = new FileReader();

      //?: по событию onload создаём img и вставляем строку
      reader.onload = (ev) => {
        src = ev.target.result;

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

      //?: сюда передаём файл чтобы его считывать. главное добавлять его в конце
      //?: так как это асинхронная операция
      reader.readAsDataURL(file);
    });
  };

  const removeHandler = (e) => {
    if (!e.target.dataset.name) {
      return;
    }

    const { name } = e.target.dataset;

    files = files.filter((file) => file.name !== name);

    //?: удаляем кнопку загрузки если у нас пустой массив
    //?: и нет картинок
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

  //?: Функция для отчистки информации чтобы отсавить одну картинку,
  //?: на которой мы потом будем показывать прогрузку
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

  return (
    <>
      <div className={s.previewImage}>
        <div className={s.previewRemove} data-name='${file.name}'>
          &times;
        </div>
        {files.map((file) => {
          <>
            <img src={src} alt={file.name} />
            <div className={s.previewInfo}>
              <spna>${file.name}</spna>${bytesToSize(file.size)}
            </div>
          </>;
        })}
      </div>
    </>
  );
}
