<template>
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-40 z-10">
        <div class="loader">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "LoadingSpinner",
    props: {
        loading: {
            type: Boolean,
            required: true,
        },
    },
};
</script>

<style scoped>
.loader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60px;
    /* Width of the loader */
}

.dot {
    width: 15px;
    /* Size of each dot */
    height: 15px;
    border-radius: 50%;
    background-color: #1026349d;
    /* Color of the dots */
    animation: bounce 0.6s infinite alternate;
}

/* Animation for bouncing effect */
@keyframes bounce {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-15px);
        /* How high the dots bounce */
    }
}

/* Animation delay for each dot to create a sequential bounce effect */
.dot:nth-child(1) {
    animation-delay: 0s;
}

.dot:nth-child(2) {
    animation-delay: 0.2s;
}

.dot:nth-child(3) {
    animation-delay: 0.4s;
}
</style>
