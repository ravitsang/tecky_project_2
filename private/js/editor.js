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
    
            // Note that your request may look different. It is up to you and your editor
            // integration to choose the right communication channel. This example uses
            // a POST request with JSON as a data structure but your configuration
            // could be different.
            xhr.open( 'POST', 'http://localhost:8080/editor/create', true );
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
    
                // This example assumes the XHR server's "response" object will come with
                // an "error" which has its own "message" that can be passed to reject()
                // in the upload promise.
                //
                // Your integration may handle upload errors in a different way so make sure
                // it is done properly. The reject() function must be called when the upload fails.
                if ( !response || response.error ) {
                    return reject( response && response.error ? response.error.message : genericErrorText );
                }
    
                // If the upload is successful, resolve the upload promise with an object containing
                // at least the "default" URL, pointing to the image on the server.
                // This URL will be used to display the image in the content. Learn more in the
                // UploadAdapter#upload documentation.
                resolve( {
                    default: response.url
                } );
            } );
    
            // Upload progress when it is supported. The file loader has the #uploadTotal and #uploaded
            // properties which are used e.g. to display the upload progress bar in the editor
            // user interface.
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
    
            // Important note: This is the right place to implement security mechanisms
            // like authentication and CSRF protection. For instance, you can use
            // XMLHttpRequest.setRequestHeader() to set the request headers containing
            // the CSRF token generated earlier by your application.
    
            // Send the request.
            this.xhr.send( data );
        }
    }
    
    // ...
    
    function MyCustomUploadAdapterPlugin( editor ) {
        editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
            // Configure the URL to the upload script in your back-end here!
            
            return new MyUploadAdapter( loader );
        };
    }
    
    let editor;
    BalloonEditor
    .create(document.querySelector('#editor'),{
        // autosave: {
        //     waitingTime: 5000, // in ms
        //     save( editor ) {
        //         return saveData(editor.getData());
        //     }
        // },
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
                "mediaEmbed",
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
        mediaEmbed:{

        }
    })
    .then(newEditor=>{
        editor = newEditor;
        const wordCountPlugin = editor.plugins.get( 'WordCount' );
        const wordCountWrapper = document.querySelector('#word-count');



        wordCountWrapper.appendChild( wordCountPlugin.wordCountContainer );
        // displayStatus(editor);
    })
    .catch(error=>{
        console.error('There was a problem initializing the editor.',error);
    });

    // function saveData( data ) {
    //     return new Promise( resolve => {
    //         setTimeout( () => {
    //             console.log( 'Saved', data );
    
    //             resolve();
    //         }, HTTP_SERVER_LAG );
    //     } );
    // }

    // function displayStatus( editor ) {
    //     const pendingActions = editor.plugins.get( 'PendingActions' );
    //     const statusIndicator = document.querySelector( '#editor-status' );
    
    //     pendingActions.on( 'change:hasAny', ( evt, propertyName, newValue ) => {
    //         if ( newValue ) {
    //             statusIndicator.classList.add( 'busy' );
    //         } else {
    //             statusIndicator.classList.remove( 'busy' );
    //         }
    //     } );
    // }

    document.querySelector('#submit-btn')
        .addEventListener('click',async (event)=>{
            const editorData = await editor.getData();
            console.log(editorData)

            let domParser = new DOMParser();
            let doc = domParser.parseFromString(editorData,'text/html')
            const title = doc.querySelector('h1').outerHTML
            console.log(title)
            
            const res = await fetch ('/editor/create',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    title:title,
                    content:editorData
                })
            });
            console.log(res);
        })

    

}