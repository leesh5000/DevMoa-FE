import ReactQuill, {Quill} from "react-quill";
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.snow.css';
import 'highlight.js';
import hljs from "highlight.js";
import 'highlight.js/styles/stackoverflow-light.css';

const icons = Quill.import('ui/icons');
icons['code-block'] = '<svg viewbox="0 -2 15 18">\n' + '\t<polyline class="ql-even ql-stroke" points="2.48 2.48 1 3.96 2.48 5.45"/>\n' + '\t<polyline class="ql-even ql-stroke" points="8.41 2.48 9.9 3.96 8.41 5.45"/>\n' + '\t<line class="ql-stroke" x1="6.19" y1="1" x2="4.71" y2="6.93"/>\n' + '\t<polyline class="ql-stroke" points="12.84 3 14 3 14 13 2 13 2 8.43"/>\n' + '</svg>';

const modules = {
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value,
  },
  toolbar: [
    [{size: []}],
    ['code', 'bold', 'italic', 'blockquote', 'code-block'],
    [{'list': 'ordered'}, {'list': 'bullet'},
      {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
  ],
}

const Editor = ({contents, onContentsHandler}) => {

  return (
    <>
      <ReactQuill value={contents || ""}
                  modules={modules}
                  onChange={onContentsHandler}
                  theme={"snow"}/>
    </>
  );
}

export default Editor;
