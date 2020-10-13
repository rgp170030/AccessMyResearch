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
    pageData: {},
    init: function(element, pageData){
        
        var self = this;

        //Handles a file drop, calling handleFiles()
        function handleDrop(e) {
            handleFiles(e.dataTransfer.files)
        }

        //Handles files for upload
        function handleFiles(files) {
            self.addFiles(...files);
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

        this.pageData = pageData;
    },
    getFiles: function(){
        return this.pageData.files;
    },
    setFiles: function(files) {
        this.pageData.files = [...files];
    },
    addFiles: function(...files){
        files.forEach(file => {
            this.pageData.files.push(file);
        });
    },
    upload: function(){
        var files = this.pageData.files;
        if(files.length === 0){
            console.error("NO FILES SILLY");
            return;
        }

        console.log("Well, you have files but the developer hasn't done anything with them.");
    }
};