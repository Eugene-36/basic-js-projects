import React, { useState } from 'react';
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
  const options = ['.png', '.jpg', '.jpeg', '.gif'];
  const input = document.getElementById('#file');

  // console.log('input', input);
  // console.log('work fine ');
  let files = [];
  let src = '';

  //?: Вешаю обработчик на кнопку, и чтобы по килку на её триггирилась загрузка файла
  const triggerInput = () => document.querySelector('#file').click();

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
        setString(ev.target.result);
        console.log('ev.target.result');
      };

      //?: сюда передаём файл чтобы его считывать. главное добавлять его в конце
      //?: так как это асинхронная операция
      reader.readAsDataURL(file);
    });

    console.log('files', files);
    console.log('src', stringValue);
  };

  return (
    <div className='container'>
      <div className='card'>
        <input
          type='file'
          id='file'
          multiple
          accept='.png,.jpg,.jpeg,.gif'
          onChange={changeHandler}
        />
        <button className='btn' onClick={triggerInput}>
          Открыть
        </button>
        <button className='btn primary'>Загрузить</button>
        <div className='preview'>
          {files.length !== 0
            ? files.map((file) => (
                <>
                  <div class='preview-image'>
                    <div class='preview-remove' data-name={file.name}>
                      &times;
                    </div>
                    <img src={stringValue} alt={file.name} />
                    <div class='preview-info'>
                      <spna>${file.name}</spna>${bytesToSize(file.size)}
                    </div>
                  </div>
                </>
              ))
            : null}
        </div>
        {/* <Upload selector={'#file'} options={options} multi={true} /> */}
      </div>
    </div>
  );
}

export default App;
