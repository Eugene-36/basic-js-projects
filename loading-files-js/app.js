import firebase from 'firebase/app';
import 'firebase/storage';

//===============================
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
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

upload('#file', {
  multi: true,
  accept: ['.png', '.jpg', '.jpeg', '.gif'],
  onUpload(files, blocks) {
    files.forEach((file, index) => {
      const ref = storage.ref(`images/${file.name}`);

      const task = ref.put(file);

      task.on(
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
          task.snapshot.ref.getDownloadURL().then((url) => {
            console.log('Download url', url);
          });
          console.log('Completed');
        }
      );
    });
  },
});
console.log('app.js');
