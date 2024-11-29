<template>
    <div class="relative mb-4">

        <label v-if="label" class="block text-gray-600 mb-1" :for="inputId">
            <slot name="label">{{ label }}</slot>
        </label>


        <div class="relative">
            <input :id="inputId" :type="type" :value="modelValue" @input="updateValue" :class="['w-full py-2 pr-8 px-3 transition-colors duration-300', 'border-b-2 focus:outline-none',
                error ? 'border-red-500' : success ? 'border-green-500' : 'border-gray-300',
                error ? 'bg-red-50' : success ? 'bg-green-50' : 'bg-white',
                'rounded-t-none rounded-bl-none rounded-br-none']" :aria-invalid="error"
                :aria-describedby="message ? messageId : null" />


            <button v-if="modelValue" @click="clearInput"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                :aria-label="'Clear ' + label">
                ✕
            </button>
        </div>

        <!-- Message or Error below input -->
        <p v-if="message" :id="messageId"
            :class="['mt-1 text-sm', error ? 'text-red-500' : success ? 'text-green-500' : 'text-gray-500']">
            {{ message }}
        </p>
    </div>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        error: {
            type: Boolean,
            default: false
        },
        success: {
            type: Boolean,
            default: false
        },
        message: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        }
    },
    data() {
        return {
            inputId: `input-${Math.random().toString(36).substr(2, 9)}`,
            messageId: `message-${Math.random().toString(36).substr(2, 9)}`
        };
    },
    methods: {
        updateValue(event) {
            this.$emit('update:modelValue', event.target.value);
        },
        clearInput() {
            this.$emit('update:modelValue', '');
        }
    }
};
</script>

<style scoped>
/* Styling adjustments for input appearance */
input {
    border-radius: 0;
}
</style>
