window.onload=()=>{
    let editor;
    BalloonEditor
    .create(document.querySelector('#editor'),{
        // autosave: {
        //     waitingTime: 5000, // in ms
        //     save( editor ) {
        //         return saveData(editor.getData());
        //     }
        // },
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
            upload:{},
            toolbar: [
                'imageTextAlternative'
            ]
        },
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

            const res = await fetch ('/editor',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(editorData)
            });
            console.log(res);
        })

    

}