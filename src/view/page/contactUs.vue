<template>
    <div class=" min-h-screen flex items-center justify-center mt-3">
        <div class="max-w-6xl w-full rounded-lg px-6">

            <div class="min-h-screen flex items-center justify-center">
                <div class="max-w-6xl w-full rounded-lg px--2">

                    <!-- Welcome Section -->
                    <div class="text-center mb-10">
                        <h1 class="text-4xl font-bold text-gray-800 mb-4">Chào Mừng đến với Gizmo<span
                                class="text-red-500 underline">Shop</span></h1>
                        <p class="text-lg text-gray-600">Thiết Bị Công Nghệ Đỉnh Cao - Nâng cao trải nghiệm công nghệ
                            của bạn.</p>
                    </div>

                    <div class="mt-10 text-center mb-3">
                        <h2 class="text-3xl font-semibold text-gray-800">Khám Phá Ngay Hôm Nay</h2>
                        <p class="text-gray-600 mb-4">Truy cập cửa hàng và mua ngay những sản phẩm công nghệ yêu thích
                            của bạn.</p>
                        <a href="/"
                            class="inline-block px-8 py-3 bg-red-500 text-white font-semibold rounded-sm hover:bg-red-600">Khám
                            Phá Sản Phẩm</a>
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
                        <div class="bg-gray-100 p-6 rounded-sm shadow-md">
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
                        <div class="bg-gray-100 p-6 rounded-sm shadow-md">
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
                        <div class="bg-gray-100 p-6 rounded-sm shadow-md">
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



                </div>
            </div>
            <!-- đội ngũ  -->
            <div class="p-6">
                <h3 class="text-3xl text-center font-semibold text-gray-800">Đội ngũ sản xuất</h3>
                <p class="text-gray-600 mb-4 text-center">Liên hệ với các thành viên sản xuất .</p>
                <div class="flex justify-center gap-4 flex-wrap">
                    <img class="w-16 h-16 border-4 border-white rounded-full shadow-lg transform transition duration-200 hover:scale-110 dark:border-gray-800"
                        src="https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-6/461051885_1251436466280211_2071630786163388505_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFLWFA0b2OIkbm5iKKZ0F71iNh1s9sh2SyI2HWz2yHZLNRdoCmSL3BsbdTdg3VQCl5lPLv3NvYilsFMq2CAXCnL&_nc_ohc=M0Ptjobj5I8Q7kNvgFEIwLf&_nc_zt=23&_nc_ht=scontent.fdad1-3.fna&_nc_gid=AbyzjFVA_F4oqaJW_LFUoZT&oh=00_AYDy5T6C4QOEYUfeq09_BZwGDRTyxCz9CbySxFIY8v_fnw&oe=6761BE78"
                        alt="Profile Picture 1">
                    <img class="w-16 h-16 border-4 border-white rounded-full shadow-lg transform transition duration-200 hover:scale-110 dark:border-gray-800"
                        src="https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-6/464188774_1671331593429945_2129722094719717851_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFrx2ko5hMrCe9FqKEydwZnJsbWkKSoQPwmxtaQpKhA_MFGQJN-GWoCKa8H7cZVK8OcxUi_JJovaJl3QEWp7MjY&_nc_ohc=3xPIAMtlWYoQ7kNvgFpgZKS&_nc_zt=23&_nc_ht=scontent.fdad1-3.fna&_nc_gid=A1PFwALKuwCQu4MnYyFhnki&oh=00_AYA3H_aJ4MT3mRLdGg3KDJZD7Ti3glHrB39_JcpGMuvXRA&oe=6761A76A"
                        alt="Profile Picture 2">
                    <img class="w-16 h-16 border-4 border-white rounded-full shadow-lg transform transition duration-200 hover:scale-110 dark:border-gray-800"
                        src="https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-1/466784668_1894390901054494_7053788083353675502_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=102&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeF6zD8aFkfW2Z7eHBu8iCR5AEZ7jJ14vvkARnuMnXi--S7kAuj7dfXlkanyDm_Ax2vMlNQ0gPKLc2AswJEQUrOQ&_nc_ohc=sUDdPMGNs9wQ7kNvgHma9DT&_nc_zt=24&_nc_ht=scontent.fdad1-2.fna&_nc_gid=ABMRN6Pz69HQVKYZLGu5g75&oh=00_AYAOiQwqGF8o62J3Voe_DmvWTJiCRSnf9BRPYXUtRm6GBg&oe=6761B364"
                        alt="Profile Picture 3">
                    <img class="w-16 h-16 border-4 border-white rounded-full shadow-lg transform transition duration-200 hover:scale-110 dark:border-gray-800"
                        src="https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-1/428225038_122106157376210101_490807658435131454_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=111&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGuwTT9Eks6M49tiTr6RlQXABT7RghSF_EAFPtGCFIX8awCxZzcwmvJ4WwkC1rtieSUUI8iUMEqnWg9Jheh3FZG&_nc_ohc=fm7I36sJcOwQ7kNvgHFAfHZ&_nc_zt=24&_nc_ht=scontent.fdad1-3.fna&_nc_gid=AZFNv0ZTlk-g98EKQH-yBvX&oh=00_AYBL4MYz5u1GZSMXNlf6ogV0-f3ykStt_CZV5coA3anuaA&oe=6761C33D"
                        alt="Profile Picture 4">
                    <img class="w-16 h-16 border-4 border-white rounded-full shadow-lg transform transition duration-200 hover:scale-110 dark:border-gray-800"
                        src="https://scontent.fdad1-1.fna.fbcdn.net/v/t39.30808-6/465605740_1407885090170552_8271996109391657431_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFU2IaxJiPZ3BHSk-AcqFdlHx-1VX817mcfH7VVfzXuZ2SxVOQ9ImT51zIbZXKELXSCUvQ3Iok4amF2PIm3jc-U&_nc_ohc=VLwesW0ASOMQ7kNvgGzx7OT&_nc_zt=23&_nc_ht=scontent.fdad1-1.fna&_nc_gid=ADPdZugkeKFqDGYcLrrSzKx&oh=00_AYArDWCGU-e7ZE_FE2vl1Phjd3WFR38Ki6A-MKabW4TOVg&oe=6761BF5A"
                        alt="Profile Picture 4">
                    <img class="w-16 h-16 border-4 border-white rounded-full shadow-lg transform transition duration-200 hover:scale-110 dark:border-gray-800"
                        src="https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-1/458173134_1962738140851189_834364046689719591_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=106&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeFPb7GLmb0MJtBUr3tWuG_kJG4IV7LKZOokbghXsspk6p8JGrWwhLySTnNG6VTIhQ3OlOj-JDQlhGodXv0Vcb-m&_nc_ohc=Rl0TCbQGvsgQ7kNvgGe5GeJ&_nc_zt=24&_nc_ht=scontent.fdad1-2.fna&_nc_gid=A1ygyef-KU8XByfRoVDVdvS&oh=00_AYC_vkFzO5eJD0mr_n6SPgWA1CQR3Darr29zv4T0T0Jtjw&oe=6761BA07"
                        alt="Profile Picture 4">
                    <img class="w-16 h-16 border-4 border-white rounded-full shadow-lg transform transition duration-200 hover:scale-110 dark:border-gray-800"
                        src="https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-1/449468194_1649038025892118_7530529501738932805_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=103&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeHsMKKvDQNusjInDcVvwkbU6v-T80kZUZrq_5PzSRlRml5VxGMhHytTkxgwGaGNlHqKceLbTLWgGXam1_9RTAzb&_nc_ohc=F3HmJXJjJvEQ7kNvgGgUpr2&_nc_zt=24&_nc_ht=scontent.fdad1-4.fna&_nc_gid=AZLpRNjPtHmDAnL7EcD-VF-&oh=00_AYBarg4Uh06vOmV4Wze5UOH8SsYaUzhKVczjsxynV4Jv9A&oe=67619B4E"
                        alt="Profile Picture 4">
                </div>
            </div>

            <!-- liên hệ  -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">

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
                <div class="block">
                    <img src="https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-6/469618374_1304704917620032_7513417754469387342_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEsImcmbYx8vXBCbUL-0wTdfnOrMz6O-AZ-c6szPo74BnP1IwPkXmKtQfnkPe3QfnTZf9HeM43e4VK8Xc20E1pp&_nc_ohc=psHR9CSphkcQ7kNvgFqiln-&_nc_zt=23&_nc_ht=scontent.fdad1-2.fna&_nc_gid=AiMoIKdqdvCbHKw07BhGxpa&oh=00_AYB5BpYr6zH4iNHUKCvpKYOu5XhSeXTpMzz30qClO4N7mQ&oe=67619D37"
                        alt="DIF"
                        class="w-full h-full object-cover ring-2 ring-gray-300 dark:ring-gray-500 rounded-md shadow-xl" />
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
