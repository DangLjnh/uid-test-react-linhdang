import { useState, useMemo, useEffect, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import ImageUploader from "quill-image-uploader";
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';
import useUploadMedia from '../hooks/useUploadMedia';

Quill.register("modules/imageUploader", ImageUploader);

const RichTextArea = ({ onChange, value }) => {
    const [editorContent, setEditorContent] = useState('');
    const { uploadSingleMedia } = useUploadMedia();
    const quillRef = useRef(null);

    const modules = useMemo(
        () => ({
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote"],
            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["link", "image", "video"],
          ],
          imageUploader: {
            upload: async (file) => {
                const data = await uploadSingleMedia(file);
                return data;
            },
          },
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
    }, [value, editorContent]);

    return (
        <ReactQuill
            ref={quillRef}
            value={editorContent}
            onChange={handleChange}
            modules={modules}
        />
    );
};

RichTextArea.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string
};

export default RichTextArea;