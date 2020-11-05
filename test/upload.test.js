//Tests will be written in files such as these
//In the format: *file to be tested*.test.js
import upload from '@/util/upload'

describe('File Uploader', () => {
    test('Upload one file', () => {
        upload.handleFiles(new File([""], "filename"));
        expect(upload.setFiles()).toHaveBeenCalled();
    });

    test('Deny two files', () => {
        var files = [new File([""], "filename"), new File([""], "filename2")];
        upload.handleFiles(files);
        expect(upload.setFiles()).not.toHaveBeenCalled();
    });
});