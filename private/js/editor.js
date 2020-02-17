window.onload=()=>{
    let editor;
    BalloonEditor
    .create(document.querySelector('#editor'),{
        toolbar: {
            items: [
                'heading',
                '|',
                'fontSize',
                'fontColor',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                '|',
                'alignment',
                'indent',
                'outdent',
                'highlight',
                '|',
                'imageUpload',
                'blockQuote',
                'undo',
                'redo'
            ]
        },
        language: 'en',
        image: {
            toolbar: [
                'imageTextAlternative'
            ]
        },        
    })
    .then(editor=>{
        window.editor = editor;
    })
    .catch(error=>{
        console.error('There was a problem initializing the editor.',error);
    });

    


}