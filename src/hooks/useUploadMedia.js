import { useState } from 'react';
import cloudinary from '../libs/cloudiary';
import axios from 'axios';
import { CLOUDINARY_URL } from '../environments/variables';

const useUploadMedia = () => {
  const [state, setState] = useState({
    uploadedMediaUrls: [],
    isLoading: false,
    error: null,
  });

  const setLoading = (isLoading) => setState((prevState) => ({ ...prevState, isLoading }));
  const setError = (error) => setState((prevState) => ({ ...prevState, error }));
  const setUploadedMediaUrls = (urls) => setState((prevState) => ({ ...prevState, uploadedMediaUrls: urls }));

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file.originFileObj || file);
    formData.append('upload_preset', 'uid_preset');

    const response = await axios.post(`${CLOUDINARY_URL}/${cloudinary.config().cloud_name}/upload`, formData);

    return response.data.secure_url;
  };

  const uploadMedia = async (mediaFiles) => {
    setLoading(true);
    setError(null);
    const urls = [];

    try {
      for (const file of mediaFiles) {
        if (typeof file === 'string') {
          urls.push(file);
        } else {
          const url = await uploadFile(file);
          urls.push(url);
        }
      }
      setUploadedMediaUrls(urls);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const uploadSingleMedia = async (file) => {
    setLoading(true);
    setError(null);

    try {
      const url = await uploadFile(file);
      return url;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { ...state, uploadMedia, uploadSingleMedia };
};

export default useUploadMedia;