<template>
    <div class="container mx-auto p-6">
        <h1 class="text-3xl font-bold mb-6">Liên hệ</h1>
        <p class="mb-4 text-gray-600">
            Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ, vui lòng liên hệ với chúng tôi qua biểu mẫu dưới đây.
        </p>
        <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
                <label for="name" class="block text-gray-700 font-medium">Họ và tên:</label>
                <input id="name" type="text" v-model="form.name"
                    class="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập họ và tên" required />
            </div>
            <div>
                <label for="email" class="block text-gray-700 font-medium">Email:</label>
                <input id="email" type="email" v-model="form.email"
                    class="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập email" required />
            </div>
            <div>
                <label for="message" class="block text-gray-700 font-medium">Nội dung:</label>
                <textarea id="message" v-model="form.message"
                    class="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="5" placeholder="Nhập nội dung" required></textarea>
            </div>
            <button type="submit"
                class="px-6 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 focus:outline-none">
                Gửi liên hệ
            </button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'ContactForm',
    data() {
        return {
            form: {
                name: "",
                email: "",
                message: "",
            },
        };
    },
    methods: {
        handleSubmit() {
            // Example: Handle form submission (e.g., API call)
            console.log("Form submitted", this.form);
            alert("Liên hệ của bạn đã được gửi thành công!");
            this.form = { name: "", email: "", message: "" }; // Reset the form
        },
    },
};
</script>

<style scoped>
.container {
    max-width: 600px;
}
</style>