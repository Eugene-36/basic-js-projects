//todo: new version
import { initializeApp } from 'firebase/app';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
//===============================
// import { upload } from './upload.js';

//? Импорт классового компонента
import { Upload } from './rewriteToClass.js';

console.log('Upload', Upload);

import './style.scss';

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyAR_HjpX7-gwkdHPGuyrNlaCVvO1dU8v0w',
//   authDomain: 'upload-images-1e92d.firebaseapp.com',
//   projectId: 'upload-images-1e92d',
//   storageBucket: 'upload-images-1e92d.appspot.com',
//   messagingSenderId: '599919205852',
//   appId: '1:599919205852:web:8a2f5e7692dbf23b668319',
// };

// //todo:  Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);

// upload('#file', {
//   multi: true,
//   accept: ['.png', '.jpg', '.jpeg', '.gif'],
//   onUpload(files, blocks) {
//     files.forEach((file, index) => {
//       const storageRef = ref(storage, `images/${file.name}`);
//       const uploadTask = uploadBytesResumable(storageRef, file);

//       uploadTask.on(
//         'state_changed',
//         (snapshot) => {
//           const percentage =
//             ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(
//               0
//             ) + '%';

//           const block = blocks[index].querySelector('.preview-info-progress');
//           console.log('block', block);
//           block.textContent = percentage;
//           block.style.width = percentage;
//         },
//         (error) => {
//           console.log('error', error);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//             console.log('Download url', url);
//           });
//           console.log('Completed');
//         }
//       );
//     });
//   },
// });
// console.log('app.js');

//? ===============Переписываю на класс

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAR_HjpX7-gwkdHPGuyrNlaCVvO1dU8v0w',
  authDomain: 'upload-images-1e92d.firebaseapp.com',
  projectId: 'upload-images-1e92d',
  storageBucket: 'upload-images-1e92d.appspot.com',
  messagingSenderId: '599919205852',
  appId: '1:599919205852:web:8a2f5e7692dbf23b668319',
};

// //todo:  Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const uploads = new Upload('#file', {
  multi: true,
  accept: ['.png', '.jpg', '.jpeg', '.gif'],
  onUpload(files, blocks) {
    files.forEach((file, index) => {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const percentage =
            ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(
              0
            ) + '%';

          const block = blocks[index].querySelector('.preview-info-progress');
          console.log('block', block);
          block.textContent = percentage;
          block.style.width = percentage;
        },
        (error) => {
          console.log('error', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log('Download url', url);
          });
          console.log('Completed');
        }
      );
    });
  },
});

uploads.createBtn();

console.log(uploads.input);
