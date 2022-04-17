import React, { useState, useEffect } from 'react';
import './style.css';
import { v4 as uuidv4 } from 'uuid';
//? Инициализация Firebase
import { initializeApp } from 'firebase/app';
import { bytesToSize } from './ConverterBytes.js';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAR_HjpX7-gwkdHPGuyrNlaCVvO1dU8v0w',
  authDomain: 'upload-images-1e92d.firebaseapp.com',
  projectId: 'upload-images-1e92d',
  storageBucket: 'upload-images-1e92d.appspot.com',
  messagingSenderId: '599919205852',
  appId: '1:599919205852:web:8a2f5e7692dbf23b668319',
};
//todo:  Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default function Firebase() {
  const [stringValue, setString] = useState('');
  const [array, setArray] = useState([]);
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);

  const triggerInput = () => document.querySelector('#file').click();

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

          setString(...images);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    array.forEach((file, index) => {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgresspercent(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUrl(downloadURL);
          });
        }
      );
    });
  };

  const removeHandler = (e) => {
    const { name } = e.target.dataset;
    if (progresspercent > 0) {
      return;
    } else {
      setArray(array.filter((file) => file.name !== name));
    }
  };
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
        <button
          className='btn primary'
          type='submit'
          onClick={(e) => handleSubmit(e)}
        >
          Загрузить
        </button>

        <div className='preview'>
          {array.map(({ name, size }) => (
            // console.log('str', str);
            <div className='previewImage' key={uuidv4()}>
              <div
                className='previewRemove'
                data-name={name}
                onClick={(e) => removeHandler(e)}
              >
                &times;
              </div>

              <img
                className='photo-uploaded'
                src={stringValue}
                alt='uploaded'
              />
              <div className='preview-info'>
                {progresspercent > 0 ? (
                  <div
                    className='innerbar'
                    style={{ width: `${progresspercent}%` }}
                  >
                    {progresspercent}%
                  </div>
                ) : (
                  <span>
                    {name}
                    <br />
                    {bytesToSize(size)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
