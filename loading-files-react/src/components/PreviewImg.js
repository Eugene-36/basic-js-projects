import React from 'react';
import { bytesToSize } from '../components/ConverterBytes.js';
export default function PreviewImg({ file, src }) {
  let files = [];
  
  const changeHandler = (e) => {
    if (!e.target.files.length) {
      return;
    }
    console.log('e', e.target.files);
    //?: Создаём массив чтобы по нему можно было итерироваться
    files = Array.from(e.target.files);

    //?: очищает предыдущий запрос картинок
    // preview.innerHTML = '';
    // upload.style.display = 'inline';

    files.forEach((file) => {
      if (!file.type.match('image')) {
        return;
      }

      //?: вызываем к браузерному методу для считывания файла
      const reader = new FileReader();

      //?: по событию onload создаём img и вставляем строку
      reader.onload = (ev) => {
        src = ev.target.result;
        <>
          <div class='preview-image'>
            <div class='preview-remove' data-name={file.name}>
              &times;
            </div>
            <img src={src} alt={file.name} />
            <div class='preview-info'>
              <spna>${file.name}</spna>${bytesToSize(file.size)}
            </div>
          </div>
        </>;
      };

      //?: сюда передаём файл чтобы его считывать. главное добавлять его в конце
      //?: так как это асинхронная операция
      reader.readAsDataURL(file);
    });
  };

  return (
    <div class='preview-image'>
      <div class='preview-remove' data-name={file.name}>
        &times;
      </div>
      <img src={src} alt={file.name} />
      <div class='preview-info'>
        <spna>${file.name}</spna>${bytesToSize(file.size)}
      </div>
    </div>
  );
}
