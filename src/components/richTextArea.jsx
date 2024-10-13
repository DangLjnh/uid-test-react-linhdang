import { useState, useMemo, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import ImageUploader from "quill-image-uploader";
import cloudinary from '../libs/cloudiary';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';

Quill.register("modules/imageUploader", ImageUploader);

const RichTextArea = ({ onChange, value }) => {
    const [editorContent, setEditorContent] = useState('');

    const modules = useMemo(
        () => ({
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote"],
            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["link", "image"],
          ],
          imageUploader: {
            upload: async (file) => {
              const bodyFormData = new FormData();
              bodyFormData.append("file", file);
              bodyFormData.append('upload_preset', 'uid_preset');
              const response = await axios({
                method: "post",
                url: `https://api.cloudinary.com/v1_1/${cloudinary.config().cloud_name}/upload`,
                data: bodyFormData,
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });
              return response.data.secure_url;
            },
          },
        }),
        []
    );

    const handleChange = (content) => {
        setEditorContent(content);
        if (onChange) {
            onChange(content);
        }
    };

    useEffect(() => {
        if (value !== editorContent) {
            setEditorContent(value);
        }
    }
    , [value, editorContent]);

    return (
        <>
            <ReactQuill theme="snow" modules={modules} value={editorContent} onChange={handleChange} />
        </>
    );
};
RichTextArea.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
};

export default RichTextArea;