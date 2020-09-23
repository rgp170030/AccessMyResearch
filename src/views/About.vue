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
                        <div class="form-group">
                            <label for="chooseFileInput">Choose a file</label>
                            <input type="file" class="form-control-file" aria-describedby="fileWarning">
                            <small id="fileWarning" class="form-text text-muted">PDF only</small>
                            <button type="submit" class="float-right btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </card>
    </div>
</template>