import React from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const RichTextEditor = ({ body = null, setBody }) => {
    const handleChange = (content) => {
        setBody(content);
    }
    return (
        <div>
            <SunEditor
                height='400px'
                autoFocus
                defaultValue={body}
                onChange={handleChange}
                placeholder='Please Enter Body'
                setOptions={{
                    buttonList: [
                        ['undo', 'redo'],
                        ['font', 'fontSize', 'formatBlock'],
                        ['paragraphStyle', 'blockquote'],
                        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                        ['fontColor', 'hiliteColor', 'textStyle'],
                        ['removeFormat'],
                        '/',
                        ['outdent', 'indent'],
                        ['align', 'horizontalRule', 'list', 'lineHeight'],
                        ['table', 'link'],
                        ['image', 'video'],
                    ]
                }}
            />
        </div>
    );
};
export default RichTextEditor;