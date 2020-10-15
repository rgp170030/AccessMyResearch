//************************ Drag and drop *****************//
//Prevents default drag behaviors on drag

// ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
//     dropArea.addEventListener(eventName, preventDefaults, false)   
//     document.body.addEventListener(eventName, preventDefaults, false)
// })
// //Highlight drop area when item is dragged over it
// ;['dragenter', 'dragover'].forEach(eventName => {
//     dropArea.addEventListener(eventName, highlight, false)
// })
// //Unhighlight drop area when item is no longer over it
// ;['dragleave', 'drop'].forEach(eventName => { //TODO: Fix this
//     dropArea.addEventListener(eventName, unhighlight, false)
// })
// //Handle dropped files
//dropArea.addEventListener('drop', handleDrop, false)

//Prevents default drag behaviors as event
function preventDefaults (e) {
    e.preventDefault();
    e.stopPropagation();
}

//Highlights drop area
function highlight(e) {
    this.classList.add('highlight')
}

//Unhighlights drop area
function unhighlight(e) {
    this.classList.remove('highlight')
}

//Sets up progress bar
function initializeProgress(numFiles) {
    progressBar.value = 0
    uploadProgress = []
    for(let i = numFiles; i > 0; i--) {
        uploadProgress.push(0)
    }
}

//Updated the progress bar as files upload
function updateProgress(fileNumber, percent) {
    uploadProgress[fileNumber] = percent
    let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
    console.debug('update', fileNumber, percent, total)
    progressBar.value = total
}

//Shows file previews (useful for article cover uploads)
function previewFile(file) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function() {
        let img = document.createElement('img')
        img.src = reader.result
        document.getElementById('gallery').appendChild(img)
    }
}

//Uploads the file to the URL and completes progress bar
function uploadFile(file, i) {
    var xhr = new XMLHttpRequest()
    var formData = new FormData()
    xhr.open('POST', 'UPLOAD URL GOES HERE', true); //TODO: Put upload URL here
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    //Update progress (can be used to show progress indicator)
    xhr.upload.addEventListener("progress", function(e) {
        updateProgress(i, (e.loaded * 100.0 / e.total) || 100)
    });
    //Set progress bar to complete or there is an error
    xhr.addEventListener('readystatechange', function(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            updateProgress(i, 100) // <- Add this
        }
        else if (xhr.readyState == 4 && xhr.status != 200) {
            //TODO: Make it report an error
        }
    });
    formData.append('upload_preset', 'ujpu6gyk');
    formData.append('file', file);
    xhr.send(formData);

    var url = '';
    fetch(url, {

    })
    .then(() => {})
    .catch(() => {});
}

export default {
    init: function(element, opts){
        
        var self = this;

        //Handles a file drop, calling handleFiles()
        function handleDrop(e) {
            handleFiles(e.dataTransfer.files)
        }

        //Handles files for upload
        function handleFiles(files) {
            if(files.length > 1){
                alert("Can only add a signle file. Please only drop 1 file.");
                return;
            }

            self.setFiles(files);
            //     files = [...files]
            //initializeProgress(files.length)
            //     files.forEach(uploadFile)
            //     files.forEach(previewFile)
        }

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            element.addEventListener(eventName, preventDefaults, false)   
            document.body.addEventListener(eventName, preventDefaults, false)
        });
    
        //Highlight drop area when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            element.addEventListener(eventName, highlight, false)
        });
    
        //Unhighlight drop area when item is no longer over it
        ['dragleave', 'drop'].forEach(eventName => {
            element.addEventListener(eventName, unhighlight, false)
        });
    
        //Handle dropped files
        element.addEventListener('drop', handleDrop, false);

        this.opts = opts;
    },
    setFiles: function(files) {
        this.opts.files.length = 0;
        this.addFiles(...files);
    },
    addFiles: function(...files){
        files.forEach(file => {
            this.opts.files.push(file);
        });
    },
    upload: function(data){

        var files = this.opts.files;
        if(files.length === 0){
            alert("Please select a publication to upload.");
            return;
        }
        
        if(files.length > 1){
            alert("Cannot upload more than 1 publication at a time.");
            return;
        }

        var file = files[0];

        const xhr = new XMLHttpRequest();
        
        xhr.upload.addEventListener("progress", function(e) {
            if (e.lengthComputable) {
                const percentage = Math.round((e.loaded * 100) / e.total);
                console.log('Upload percentage: ' + percentage);
            }
        }, false);
        
        xhr.upload.addEventListener("load", function(e){
            console.log('Upload complete');
        }, false);

        xhr.open("POST", this.opts.urls.uploadEndpoint);
        xhr.overrideMimeType('multipart/form-data');
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('data', JSON.stringify(data));

        xhr.send(formData);
    }
};