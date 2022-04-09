// import { storage } from '../../firebase';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

import firebase from 'firebase/compat/app';
// import 'firebase/storage';
import { upload } from './upload.js';
import './style.scss';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAR_HjpX7-gwkdHPGuyrNlaCVvO1dU8v0w',
  authDomain: 'upload-images-1e92d.firebaseapp.com',
  projectId: 'upload-images-1e92d',
  storageBucket: 'upload-images-1e92d.appspot.com',
  messagingSenderId: '599919205852',
  appId: '1:599919205852:web:8a2f5e7692dbf23b668319',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

upload('#file', {
  multi: true,
  accept: ['.png', '.jpg', '.jpeg', '.gif'],
  onUpload(files) {
    files.forEach((file) => {
      const ref = ref(`images/${file.name}`);
      const task = ref.put(file);

      task.on(
        'state_changed',
        (snapshot) => {
          const percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log('percentage', percentage);
        },
        (error) => {
          console.log('error', error);
        },
        () => {
          console.log('Completed');
        }
      );
    });
  },
});
console.log('app.js');
