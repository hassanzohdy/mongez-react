const initConfig = {
  height: 500,
  contextmenu: 'copy cut paste | link image table |align italic bold underline strikethrough forecolor backcolor lineheight blockformats codeformat fontformats fontsizes subscript superscript formats | undo redo removeformat selectall',
  fontsize_formats: "6px 8px 10px 12px 14px 16px 18px 20px 22px 24px 28px 36px",
  menubar: "insert edit format",
  font_formats: 
  "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Oswald=oswald; Cairo=cairo; Open Sans=Open Sans Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
  plugins: [
    "advlist autolink link lists link directionality image charmap print preview anchor",
    "searchreplace visualblocks code fullscreen",
    "insertdatetime media table paste code help wordcount charmap code emoticons",
  ],
  toolbar:
    "formatselect | fontselect | fontsizeselect | " +
    "bold italic forecolor backcolor | alignleft aligncenter " +
    "alignright alignjustify ltr rtl| bullist numlist outdent indent | link charmap code emoticons fullscreen image" +
    "removeformat | help | undo redo",
    
  content_style:
  `
  // @import url('https://fonts.googleapis.com/css2?family=Oswald&display=swap');
  // @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
  // @import url('https://fonts.googleapis.com/css2?family=Cairo&display=swap');
  `,
};

export default initConfig;
