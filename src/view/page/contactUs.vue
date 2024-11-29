<template>
    <div class=" min-h-screen flex items-center justify-center py-10">
        <div class="max-w-6xl w-full rounded-lg px-6">

            <div class="min-h-screen flex items-center justify-center py-10">
                <div class="max-w-6xl w-full rounded-lg px--2">

                    <!-- Welcome Section -->
                    <div class="text-center mb-10">
                        <h1 class="text-4xl font-bold text-gray-800 mb-4">Chào Mừng đến với Gizmo<span
                                class="text-red-500 underline">Shop</span></h1>
                        <p class="text-lg text-gray-600">Thiết Bị Công Nghệ Đỉnh Cao - Nâng cao trải nghiệm công nghệ
                            của bạn.</p>
                    </div>

                    <!-- Introduction Section -->
                    <div class="mb-12">
                        <p class="text-gray-600 text-xl mb-4">Chúng tôi cung cấp các sản phẩm công nghệ tiên tiến nhất
                            để nâng cao trải nghiệm của bạn. Từ các bộ máy tính (PC), phụ kiện công nghệ, đến các sản
                            phẩm từ những thương hiệu nổi tiếng nhất, Gizmo Shop là nơi bạn tìm thấy tất cả. Hãy khám
                            phá các sản phẩm mới nhất và chọn cho mình những thiết bị công nghệ tốt nhất để tối ưu hóa
                            công việc, học tập và giải trí.</p>
                    </div>

                    <!-- Product Categories -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <!-- PC Desktop -->
                        <div class="bg-gray-100 p-6 rounded-lg shadow-md">
                            <h2 class="text-2xl font-semibold text-gray-800 mb-3">Máy Tính - PC (Desktop)</h2>
                            <p class="text-gray-600">Khám Phá Bộ Máy Tính Mạnh Mẽ</p>
                            <p class="text-gray-500 mt-4">Gizmo Shop cung cấp các bộ máy tính (PC) với cấu hình mạnh mẽ,
                                đáp ứng nhu cầu đa dạng từ làm việc văn phòng, chơi game đến thiết kế đồ họa. Chúng tôi
                                hợp tác với những thương hiệu lớn như Dell, HP, Lenovo, và Acer để mang đến cho bạn
                                những sản phẩm tốt nhất.</p>
                            <ul class="mt-4 text-gray-600 list-disc pl-5">
                                <li>PC Gaming: Chạy các game yêu thích với hiệu suất vượt trội.</li>
                                <li>PC Văn Phòng: Máy tính để bàn cho công việc văn phòng với hiệu năng ổn định.</li>
                                <li>PC Thiết Kế Đồ Họa: Trang bị card đồ họa chuyên nghiệp để đáp ứng nhu cầu chỉnh sửa
                                    ảnh, video, đồ họa 3D.</li>
                            </ul>
                        </div>

                        <!-- Computer Accessories -->
                        <div class="bg-gray-100 p-6 rounded-lg shadow-md">
                            <h2 class="text-2xl font-semibold text-gray-800 mb-3">Phụ Kiện Máy Tính</h2>
                            <p class="text-gray-600">Phụ Kiện Máy Tính Chất Lượng Cao</p>
                            <p class="text-gray-500 mt-4">Để nâng cao trải nghiệm sử dụng máy tính của bạn, Gizmo Shop
                                cung cấp một loạt các phụ kiện máy tính từ bàn phím, chuột, tai nghe, đến màn hình chất
                                lượng cao. Những phụ kiện này sẽ giúp bạn làm việc hiệu quả hơn và tận hưởng giải trí
                                một cách tối ưu.</p>
                            <ul class="mt-4 text-gray-600 list-disc pl-5">
                                <li>Bàn Phím Cơ: Tối ưu hiệu suất gõ phím và chơi game.</li>
                                <li>Chuột Gaming: Chính xác và phản hồi nhanh cho các game thủ.</li>
                                <li>Màn Hình Full HD và 4K: Cho trải nghiệm hình ảnh sắc nét và sống động.</li>
                            </ul>
                        </div>

                        <!-- Other Tech Products -->
                        <div class="bg-gray-100 p-6 rounded-lg shadow-md">
                            <h2 class="text-2xl font-semibold text-gray-800 mb-3">Sản Phẩm Công Nghệ Khác</h2>
                            <p class="text-gray-600">Khám Phá Các Sản Phẩm Công Nghệ Mới Nhất</p>
                            <p class="text-gray-500 mt-4">Ngoài máy tính và phụ kiện, Gizmo Shop còn cung cấp nhiều sản
                                phẩm công nghệ khác như smartphone, tablet, laptop và các thiết bị thông minh. Chúng tôi
                                luôn cập nhật các sản phẩm mới từ các thương hiệu hàng đầu để phục vụ bạn.</p>
                            <ul class="mt-4 text-gray-600 list-disc pl-5">
                                <li>Điện Thoại Smartphone: Các mẫu điện thoại mới nhất từ Apple, Samsung, Xiaomi, và
                                    nhiều hãng khác.</li>
                                <li>Tablet & Laptop: Đáp ứng nhu cầu công việc và giải trí của bạn với các dòng tablet
                                    và laptop cao cấp.</li>
                                <li>Thiết Bị Thông Minh: Các sản phẩm như smartwatch, thiết bị nhà thông minh và nhiều
                                    loại thiết bị IoT khác.</li>
                            </ul>
                        </div>
                    </div>

                    <!-- Call to Action Section -->
                    <div class="mt-10 text-center">
                        <h2 class="text-3xl font-semibold text-gray-800">Khám Phá Ngay Hôm Nay</h2>
                        <p class="text-gray-600 mb-4">Truy cập cửa hàng và mua ngay những sản phẩm công nghệ yêu thích
                            của bạn.</p>
                        <a href="/"
                            class="inline-block px-8 py-3 bg-red-500 text-white font-semibold rounded-sm hover:bg-red-600">Khám
                            Phá Sản Phẩm</a>
                    </div>
                </div>
            </div>
            <!-- Row Layout -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                <!-- Left: Contact Form -->
                <div>
                    <h2 class="text-3xl font-bold text-gray-800 mb-4">Liên hệ với chúng tôi</h2>
                    <p class="text-lg text-gray-600 mb-6">Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy để lại thông tin và
                        câu hỏi của bạn dưới đây, chúng tôi sẽ phản hồi sớm nhất có thể.</p>

                    <form @submit.prevent="submitForm" class="space-y-6">
                        <div>
                            <label for="name" class="block text-gray-700">Tên của bạn</label>
                            <input type="text" id="name" v-model="form.name"
                                class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required />
                        </div>

                        <div>
                            <label for="email" class="block text-gray-700">Email</label>
                            <input type="email" id="email" v-model="form.email"
                                class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required />
                        </div>

                        <div>
                            <label for="message" class="block text-gray-700">Tin nhắn của bạn</label>
                            <textarea id="message" v-model="form.message" rows="5"
                                class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required></textarea>
                        </div>

                        <button type="submit"
                            class="w-full bg-red-500 text-white py-3 rounded-sm hover:bg-red-600 focus:outline-none">Gửi
                            Tin Nhắn</button>
                    </form>
                </div>

                <!-- Right: Image Section -->
                <div class="hidden md:block">
                    <img src="https://static-xf1.vietnix.vn/wp-content/uploads/2022/08/Account-Marketing-la-gi.webp"
                        alt="Contact Us" class="w-full h-full object-cover rounded-lg shadow-xl" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'contactUs',
    data() {
        return {
            form: {
                name: '',
                email: '',
                message: ''
            }
        };
    },
    methods: {
        submitForm() {
            // Handle form submission here (e.g., API call)
            console.log(this.form);
            alert('Tin nhắn của bạn đã được gửi!');
        }
    }
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
