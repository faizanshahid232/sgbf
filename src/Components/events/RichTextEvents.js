import React from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const RichTextEvents = ({ body = null, handleChangeDetail, index }) => {
  //   const handleChange = (content) => {
  //     setBody(content);
  //   };
  return (
    <div>
      <SunEditor
        height="400px"
        autoFocus
        defaultValue={body}
        onChange={(content) => handleChangeDetail(content, index)}
        placeholder="Please Enter Body"
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
          ],
        }}
      />
    </div>
  );
};
export default RichTextEvents;
