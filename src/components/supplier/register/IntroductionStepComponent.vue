<template>
    <div class="bg-white p-2 rounded-sm ">
        <h2 class="text-2xl font-bold mb-4">Quyền lợi & Điều kiện khi trở thành nhà cung cấp</h2>
        <p class="mb-4">
            Chào mừng bạn đến với chương trình đăng ký nhà cung cấp sản phẩm của chúng tôi! Khi tham gia, bạn sẽ nhận
            được nhiều quyền lợi hấp dẫn và cùng chúng tôi xây dựng một hệ sinh thái kinh doanh chuyên nghiệp và hiệu
            quả.
        </p>
        <ul class="list-disc pl-5 space-y-4">
            <li>
                <b class="text-lg text-blue-500">Lợi ích:</b>
                <ul class="list-disc pl-5 space-y-2">
                    <li>**Tiếp cận hàng ngàn khách hàng tiềm năng** trên toàn quốc và quốc tế.</li>
                    <li>**Tăng trưởng doanh thu** nhờ lượng truy cập lớn và tối ưu hóa kênh bán hàng.</li>
                    <li>**Hỗ trợ quảng bá sản phẩm** thông qua các chiến dịch khuyến mãi và quảng cáo của nền tảng.</li>
                    <li>**Hệ thống quản lý bán hàng thông minh**, giúp bạn dễ dàng theo dõi doanh thu, đơn hàng và hiệu
                        suất kinh doanh.</li>
                    <li>**Thanh toán minh bạch**, lịch sử giao dịch rõ ràng, và hỗ trợ giải quyết khiếu nại nhanh chóng.
                    </li>
                    <li>**Đào tạo và hỗ trợ kỹ thuật 24/7**, đảm bảo bạn luôn sẵn sàng trong quá trình kinh doanh.</li>
                </ul>
            </li>
            <li>
                <b class="text-lg text-blue-500">Điều kiện:</b>
                <ul class="list-disc pl-5 space-y-2">
                    <li>
                        <b>Cung cấp sản phẩm chất lượng:</b> Sản phẩm phải đạt tiêu chuẩn chất lượng, an toàn và tuân
                        thủ quy định pháp luật.
                    </li>
                    <li>
                        <b>Cung cấp chứng từ hợp lệ:</b> Nhà cung cấp cần có các tài liệu như hóa đơn, chứng nhận kiểm
                        định, hoặc giấy phép kinh doanh để chứng minh nguồn gốc sản phẩm.
                    </li>
                    <li>
                        <b>Phí xác minh:</b> Để đảm bảo tính uy tín, nhà cung cấp cần đóng khoản phí <b>200.000 VND</b>
                        để nền tảng xác minh thông tin và hỗ trợ khởi đầu kinh doanh.
                    </li>
                </ul>
            </li>
            <li>
                <b class="text-lg text-blue-500">Quyền lợi:</b>
                <ul class="list-disc pl-5 space-y-2">
                    <li>Được hỗ trợ tối đa trong việc quảng bá và vận hành sản phẩm.</li>
                    <li>Cơ hội tiếp cận hàng triệu khách hàng tiềm năng và tăng cường uy tín thương hiệu.</li>
                    <li>Tham gia các chương trình khuyến mãi và chiến dịch quảng cáo lớn của nền tảng.</li>
                </ul>
            </li>
        </ul>
        <div class="flex justify-end mt-6">
            <button @click="$emit('next')" class="bg-red-500 text-white py-2 px-6 rounded-sm hover:bg-red-600">
                Tiếp tục
            </button>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
/* Optional additional styles */
</style>
