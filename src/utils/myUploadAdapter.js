// MyUploadAdapter.js
export default class MyUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }
    // Phương thức upload để xử lý tải lên hình ảnh
    upload() {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve({ default: reader.result }); // Trả về Base64
            };
            reader.onerror = error => {
                reject(error);
            };
            this.loader.file.then(file => {
                reader.readAsDataURL(file); // Chuyển đổi hình ảnh thành Base64
            });
        });
    }
    // Phương thức để hủy tải lên
    abort() {
        // Xử lý khi hủy tải lên nếu cần
        console.log("hủy tải ảnh lên")
    }
}
