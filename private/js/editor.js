window.onload=()=>{
    class MyUploadAdapter {
        constructor( loader ) {
            // The file loader instance to use during the upload.
            this.loader = loader;
        }
    
        // Starts the upload process.
        upload() {
            return this.loader.file
                .then( file => new Promise( ( resolve, reject ) => {
                    this._initRequest();
                    this._initListeners( resolve, reject, file );
                    this._sendRequest( file );
                } ) );
        }
    
        // Aborts the upload process.
        abort() {
            if ( this.xhr ) {
                this.xhr.abort();
            }
        }
    
        // Initializes the XMLHttpRequest object using the URL passed to the constructor.
        _initRequest() {
            const xhr = this.xhr = new XMLHttpRequest();
    
            xhr.open( 'POST', '/editor/upload', true );
            xhr.responseType = 'json';
        }
    
        // Initializes XMLHttpRequest listeners.
        _initListeners( resolve, reject, file ) {
            const xhr = this.xhr;
            const loader = this.loader;
            const genericErrorText = `Couldn't upload file: ${ file.name }.`;
    
            xhr.addEventListener( 'error', () => reject( genericErrorText ) );
            xhr.addEventListener( 'abort', () => reject() );
            xhr.addEventListener( 'load', () => {
                const response = xhr.response;
    
                if ( !response || response.error ) {
                    return reject( response && response.error ? response.error.message : genericErrorText );
                }
    
                resolve( {
                    default: response.url
                } );
            } );
    
            if ( xhr.upload ) {
                xhr.upload.addEventListener( 'progress', evt => {
                    if ( evt.lengthComputable ) {
                        loader.uploadTotal = evt.total;
                        loader.uploaded = evt.loaded;
                    }
                } );
            }
        }
    
        // Prepares the data and sends the request.
        _sendRequest( file ) {
            // Prepare the form data.
            const data = new FormData();
    
            data.append( 'upload', file );
    
            // Send the request.
            this.xhr.send( data );
        }
    }
    
    function MyCustomUploadAdapterPlugin( editor ) {
        editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
            // Configure the URL to the upload script in your back-end here!
            return new MyUploadAdapter( loader );
        };
    }
    
    let editor;


    
    BalloonEditor
    .create(document.querySelector('#editor'),{
        extraPlugins: [ MyCustomUploadAdapterPlugin ],
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
                "codeBlock",
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
    .then(newEditor=>{
        editor = newEditor;
        editor.model.document.on( 'change:data', () => {
            console.log( 'The data has changed!' );
        } );
        const wordCountPlugin = editor.plugins.get( 'WordCount' );
        const wordCountWrapper = document.querySelector('#word-count');
        wordCountWrapper.appendChild( wordCountPlugin.wordCountContainer );
    })
    .catch(error=>{
        console.error('There was a problem initializing the editor.',error);
    });

    document.querySelector('#submit-btn')
        .addEventListener('click',async (event)=>{
            const editorData = await editor.getData();
            let title;
            let content;
            if(editorData.match(/<h1>.*<\/h1>(.*)$/)=== null){
                alert("You haven't input content");
            }else if(editorData.match(/<h1>(.*)<\/h1>/)[1] === "&nbsp;"){
                alert("You haven't input title");
            }else{
                title = editorData.match(/<h1>(.*)<\/h1>/)[1]
                content = editorData.match(/<h1>.*<\/h1>(.*)$/)[1]
            }
            let photo = null
            if (editorData.match(/<img([^>]*)>/) !== null){
                photo = editorData.match(/<img([^>]*)>/)[0]
            }
            // console.log(title)
            // console.log(content)
            // console.log(photo)
                
            const res = await fetch ('/editor/create',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    title:title,
                    content:content,
                    photo:photo
                })
            });
            const result = await res.json();
            if (result.id) {
                window.location = `/m/viewArticle.html?articleId=${result.id}`;
            }
        })
}