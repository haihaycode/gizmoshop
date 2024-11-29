import dayjs from 'dayjs';


// currencyUtils.js
export const formatCurrencyVN = (amount) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};


// dateUtils.js
export const formatDay = (date) => {
    return dayjs(date).format('DD/MM/YYYY HH:mm');
};
export const formatBirthDay = (date) => {
    return dayjs(date).format('DD/MM/YYYY ');
};



export const getCurrentDate = () => {
    const day = dayjs().date();
    const month = dayjs().month() + 1; // Month is 0-based, so add 1
    const year = dayjs().year();
    const hour = dayjs().hour().toString().padStart(2, '0'); // Format to 2 digits
    const minute = dayjs().minute().toString().padStart(2, '0'); // Format to 2 digits
    const second = dayjs().second().toString().padStart(2, '0'); // Format to 2 digits

    return `${day}_${month}__${year}_${hour}_${minute}_${second}`;
};

export const translatedRoles = (roles) => {
    const roleMapping = {
        "ROLE_ADMIN": { description: "Quản trị viên", color: "#e3342f" }, // Red
        "ROLE_STAFF": { description: "Nhân viên quản lý cửa hàng", color: "#3490dc" }, // Blue
        "ROLE_CUSTOMER": { description: "Khách hàng", color: "#38c172" }, // Green
        "ROLE_SHIPPER": { description: "Nhân viên giao hàng", color: "#ffed4a" }, // Yellow
        "ROLE_SUPPLIER": { description: "Nhà cung cấp", color: "#6f42c1" } // Purple
    };

    return roles.map(role => {
        const mappedRole = roleMapping[role];
        return {
            name: mappedRole ? mappedRole.description : role,
            color: mappedRole ? mappedRole.color : "#000000" // Default color if not found
        };
    });
};


export const formatDateToISO = (date) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
}


export const formatDateToYYYYMMDD = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
}

export const convertBase64ToFile = (base64String) => {
    // Ensure the base64 string has both metadata and data
    if (!base64String.includes(',')) {
        throw new Error('Invalid Base64 string format.');
    }

    const [metadata, base64Data] = base64String.split(',');
    const mimeTypeMatch = metadata.match(/:(.*?);/);

    if (!mimeTypeMatch) {
        throw new Error('MIME type not found in Base64 string.');
    }

    const mimeType = mimeTypeMatch[1]; // Extract MIME type (e.g., "image/jpeg")
    const extension = mimeType.split('/')[1]; // Extract file extension (e.g., "jpeg")

    // Generate a unique file name
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const fileName = `file_${timestamp}_${randomString}.${extension}`;

    // Decode Base64 data
    const byteString = atob(base64Data); // Decode Base64 into a binary string
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
    }

    // Create and return a File object
    return new File([uint8Array], fileName, { type: mimeType });
};


/**
 * Converts a list of Base64 strings to a list of File objects with auto-generated names.
 * @param {string[]} base64List - An array of Base64 encoded strings.
 * @returns {File[]} - An array of File objects.
 */
export const convertBase64ListToFileList = (base64List) => {
    return base64List.map(base64String => {
        const [metadata, base64Data] = base64String.split(','); // Split metadata and Base64 data
        const mimeType = metadata.match(/:(.*?);/)[1]; // Extract MIME type
        const extension = mimeType.split('/')[1]; // Extract file extension (e.g., 'jpeg', 'png')

        // Generate a unique file name
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 8); // Generate a random 6-character string
        const fileName = `file_${timestamp}_${randomString}.${extension}`;

        // Decode Base64 data
        const byteString = atob(base64Data);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);

        // Fill array with decoded bytes
        for (let i = 0; i < byteString.length; i++) {
            uint8Array[i] = byteString.charCodeAt(i);
        }

        // Create and return a File object
        return new File([arrayBuffer], fileName, { type: mimeType });
    });
};