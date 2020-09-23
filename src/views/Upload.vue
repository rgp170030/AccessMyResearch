<template>
    <div>
        <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-primary"></base-header>
        <card class="min-vh-100 main_body center">
            <div class="row card text-black">
                <div class="col-lg mx-auto form p-4">
                    <form>
                        <div class="form-group">
                            <label class="h2" for="title_of_publication">Title</label>
                            <input type="text" class="form-control" placeholder="Title">
                        </div>
                        <div class="form-group">
                            <label class="h2" for="Authors">Author(s)</label>
                            <input type="text" class="form-control" placeholder="Author(s)">
                        </div>
                        <div class="form-group">
                            <label class="h2" for="Abstract">Abstract</label>
                            <textarea type="text" class="form-control" placeholder="Abstract" rows="5"></textarea>
                        </div>
                        <div id="drop-area">
                            <form class="my-form">
                                <p>Upload a PDF version of the article and any images that should be attached</p>
                                <input type="file" id="fileElem" multiple accept="image/*" onchange="handleFiles(this.files)">
                                <label class="btn btn-secondary" for="fileElem">Choose File(s)</label>
                                <small id="fileWarning" class="form-text text-muted">PDF/PNG/JPEG</small>
                            </form>
                            <progress id="progress-bar" max=100 value=0></progress>
                            <div id="gallery" ></div>
                            <button type="submit" class="float-right btn btn-primary">Upload Article</button>
                        </div>
                    </form>
                </div>
            </div>
        </card>
    </div>
</template>
<style scoped>
#drop-area {
    border: 3px dashed #CCCCCC;
    border-radius: 20px;
    width: 60%;
    margin: auto;
    padding: 20px;
}
#progress-bar {
    width: 100%;
}
#drop-area.highlight {
    border-color: purple;
}
.my-form {
    margin-bottom: 10px;
}
#gallery {
    margin-top: 10px;
}
#gallery img {
    width: 15%;
    margin-bottom: 10px;
    margin-right: 10px;
    vertical-align: middle;
}
#fileElem {
    display: none;
}
</style>