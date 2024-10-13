import { message } from "antd";

export const validatePrice = (_, value) => {
    if (value === undefined || value === null) {
      return Promise.reject(new Error('Please input the product price!'));
    }
    if (typeof value !== 'number' || value < 0) {
      return Promise.reject(new Error('Price must be a positive number!'));
    }
    return Promise.resolve();
};

export const validateUploadImage = (file, Upload) => {
  const isImage = file.type.startsWith('image/');
  if (!isImage) {
    message.error('You can only upload image files!');
  }
  return isImage || Upload.LIST_IGNORE;
};