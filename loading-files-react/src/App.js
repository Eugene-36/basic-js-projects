import React, { useState, useId } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Upload from './components/Upload.js';

//?: new version
import './components/style.css';
import { bytesToSize } from './components/ConverterBytes';
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

function App() {
  const [stringValue, setString] = useState('');
  const [array, setArray] = useState([]);
  const id = useId();

  // const options = ['.png', '.jpg', '.jpeg', '.gif'];
  // const input = document.getElementById('#file');

  let files = [];

  //?: Вешаю обработчик на кнопку, и чтобы по килку на её триггирилась загрузка файла
  const triggerInput = () => document.querySelector('#file').click();

  // const changeHandler = (e) => {
  //   // if (!e.target.array.length) {
  //   //   return;
  //   // }
  //   console.log('e', e.target.files);
  //   //?: Создаём массив чтобы по нему можно было итерироваться
  //   // files = ;
  //   setArray(Array.from(e.target.files));
  //   //?: очищает предыдущий запрос картинок
  //   // preview.innerHTML = '';
  //   // upload.style.display = 'inline';

  //   array.forEach((file) => {
  //     console.log('file', file);
  //     console.log('files', files);

  //     if (!file.type.match('image')) {
  //       return;
  //     }

  //     //?: вызываем к браузерному методу для считывания файла
  //     const reader = new FileReader();

  //     //?: по событию onload создаём img и вставляем строку
  //     console.log('stringValue', stringValue);
  //     reader.onload = (ev) => {
  //       console.log('ev.target.result', ev.target.result);

  //       setString(ev.target.result);
  //     };

  //     //?: сюда передаём файл чтобы его считывать. главное добавлять его в конце
  //     //?: так как это асинхронная операция
  //     reader.readAsDataURL(file);
  //   });

  // };
  const changeHandler = (e) => {
    if (e.target.files) {
      /* Get files in array form */
      const files = Array.from(e.target.files);

      /* Map each file to a promise that resolves to an array of image URI */
      Promise.all(
        files.map((file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener('load', (ev) => {
              resolve(ev.target.result);
            });
            reader.addEventListener('error', reject);
            reader.readAsDataURL(file);
          });
        })
      ).then(
        (images) => {
          /* Once all promises are resolved, update state with image URI array */
          setArray(files);
          console.log('files', (files[0]['str'] = images));
          //files['three'] = images;

          setString(images);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };

  // console.log('stringValue', stringValue);
  console.log('array', array);

  return (
    <div className='container'>
      <div className='card'>
        <input
          type='file'
          id='file'
          accept='.png,.jpg,.jpeg,.gif'
          onChange={changeHandler}
          multiple
        />
        <button className='btn' onClick={triggerInput}>
          Открыть
        </button>
        <button className='btn primary'>Загрузить</button>

        <div className='preview'>
          {array !== undefined &&
            array.map(
              ({ str, name, size }) =>
                str !== undefined &&
                str.map((el) => (
                  <div className='previewImage' key={uuidv4()}>
                    <div className='previewRemove' data-name={name}>
                      &times;
                    </div>

                    <img
                      key={uuidv4()}
                      className='photo-uploaded'
                      src={el}
                      alt='#'
                    />

                    <div className='preview-info'>
                      <span>{array[0].name}</span>
                      {bytesToSize(size)}
                    </div>
                  </div>
                ))
            )}
        </div>
      </div>
    </div>
  );
}

export default App;
