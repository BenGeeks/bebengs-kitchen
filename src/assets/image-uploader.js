import React, { useState } from 'react';
import { useEdgeStore } from '../lib/edgestore';

import styles from './image-uploader.module.css';

const ImageUploader = ({ item, setUrls, uploading, setUploading }) => {
  const { edgestore } = useEdgeStore();
  const [file, setFile] = useState();

  return (
    <div className={styles.container}>
      <div className={styles.btn_container}>
        {!file && (
          <>
            <label for="file-upload" class="custom-file-upload" className={styles.custom_file_upload}>
              Choose Image
            </label>
            <input
              id="file-upload"
              type="file"
              className={styles.file_input}
              accept="image/png, image/jpeg"
              onChange={(e) => {
                setFile(e.target.files?.[0]);
              }}
            />
          </>
        )}
        {file && (
          <button
            className={styles.button_choose}
            onClick={async () => {
              if (file) {
                setUploading(true);
                const res = await edgestore.publicImages.upload({ file });
                setUrls({ imageUrl: res.url, thumbnailUrl: res.thumbnailUrl });
                setUploading(false);
                console.log(res);
              }
            }}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        )}
      </div>
      <div className={styles.image_container}>
        {file && <img src={window.URL.createObjectURL(file)} className={styles.img} alt={item} />}
      </div>
    </div>
  );
};

export default ImageUploader;
