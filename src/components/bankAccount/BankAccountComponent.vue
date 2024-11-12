<template>
    <div class="card p-4 sm:p-6 rounded-lg shadow-lg transition-shadow duration-200 relative mx-auto">
        <!-- Bank Logo and Name -->
        <div class="flex justify-between items-center mb-6">
            <h3 class="text-white text-sm md:text-lg font-semibold flex items-center">
                <span class="mr-2"><i class="bx bx-bank text-lg md:text-xl"></i></span>
                {{ account.bank_name }}
            </h3>
            <button @click="$emit('edit', account)"
                class="text-white text-xs sm:text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded">
                <i class="bx bx-edit mr-1"></i> Chỉnh sửa
            </button>
        </div>

        <!-- Card Number -->
        <div class="text-white text-sm md:text-lg tracking-widest mb-4">
            <span v-for="(num, index) in formattedAccountNumber" :key="index" class="inline-block mr-2">
                {{ num }}
            </span>
        </div>

        <!-- Card Holder Name and Expiry Date -->
        <div class="flex justify-between items-center text-white text-xs sm:text-sm">
            <div>
                <p class="uppercase tracking-wide text-xs opacity-75">TÊN CHỦ THẺ</p>
                <p>{{ account.holder_name || 'JAME DOE' }}</p>
            </div>
            <div>
                <p class="uppercase tracking-wide text-xs opacity-75">HẾT HẠN</p>
                <p>{{ account.expiry || 'MM/YY' }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BankAccountComponent',
    props: {
        account: {
            type: Object,
            required: true
        }
    },
    computed: {
        formattedAccountNumber() {
            // Format the account number to appear like a credit card number
            return this.account.account_number ? this.account.account_number.match(/.{1,4}/g) : ['0000', '0000', '0000', '0000'];
        }
    }
};
</script>

<style scoped>
.card {
    background: linear-gradient(135deg, #ff7e5f, #feb47b);
    /* Gradient from orange to pink */
    width: 100%;
    max-width: 340px;
    height: auto;
    padding: 1.5rem;
    border-radius: 16px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    color: white;
    font-family: Arial, sans-serif;
    transition: transform 0.3s;
}

.card:hover {
    transform: scale(1.03);
}

@media (min-width: 640px) {
    .card {
        max-width: 380px;
        padding: 2rem;
    }
}

.card h3 {
    font-size: 1.125rem;
    /* Slightly smaller font for better fit */
}

.card .bx-bank,
.card .bx-edit {
    font-size: 1.25rem;
    /* Responsive icon size */
}

.card-number {
    letter-spacing: 4px;
}

.card .tracking-widest {
    letter-spacing: 2px;
}
</style>
