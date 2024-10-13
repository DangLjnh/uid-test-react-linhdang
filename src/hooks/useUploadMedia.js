import { useState } from 'react';
import cloudinary from '../libs/cloudiary';

const useUploadMedia = () => {
  const [uploadedMediaUrls, setUploadedMediaUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadMedia = async (mediaFiles) => {
    setIsLoading(true);
    setError(null);
    const urls = [];

    try {
      for (const file of mediaFiles) {
        if(typeof file === 'string') {
            urls.push(file);
        } else {
            const formData = new FormData();
            formData.append('file', file.originFileObj);
            formData.append('upload_preset', 'uid_preset');
    
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinary.config().cloud_name}/upload`, {
              method: 'POST',
              body: formData
            });
    
            const data = await response.json();
            urls.push(data.secure_url);
        }
      }
      setUploadedMediaUrls(urls);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { uploadedMediaUrls, isLoading, error, uploadMedia };
};

export default useUploadMedia;