import React from "react";
// Bootstrap
import { Editor } from "@tinymce/tinymce-react";
const TextEditor = ({ value, setvalue }) => {
  return (
    <Editor
      apiKey="q549ywruwdl6qnt9a51th8mivzqgrgwzqe5ksscoek9adild"
      value={value}
      init={{
        height: 400,
        menubar: true,
        plugins: [
          "advlist lists image",
          "searchreplace",
          "insertdatetime table paste help wordcount",
        ],
        toolbar:
          "undo redo | formatselect | " +
          "bold italic backcolor | image | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",

        image_title: false,
        automatic_uploads: true,
        file_picker_types: "image",
        /* and here's our custom image picker*/
        file_picker_callback: function (cb, value, meta) {
          var input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.onchange = function () {
            var file = this.files[0];

            var reader = new FileReader();
            reader.onload = function () {
              var id = "blobid" + new Date().getTime();
              var blobCache =
                window.tinymce.activeEditor.editorUpload.blobCache;
              var base64 = reader.result.split(",")[1];
              var blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);
              cb(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
          };

          input.click();
        },
      }}
      onEditorChange={(newValue, editor) => {
        setvalue(newValue);
      }}
    />
  );
};
export default TextEditor;
