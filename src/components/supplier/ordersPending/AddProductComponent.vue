<template>
    <form @submit.prevent="submitProduct" class="space-y-4">
        <!-- Tên sản phẩm -->
        <CustomInputComponent v-model="form.productName" label="Tên Sản Phẩm" :error="!!errors.productName"
            :message="errors.productName" />

        <!-- Giá sản phẩm -->
        <CustomInputComponent v-model="form.productPrice" label="Giá Sản Phẩm" type="number"
            :error="!!errors.productPrice" :message="errors.productPrice" />

        <!-- Giảm giá -->
        <CustomInputComponent v-model="form.discountProduct" label="Giảm Giá (%)" type="number"
            :error="!!errors.discountProduct" :message="errors.discountProduct" />


        <CustomInputComponent v-model="form.quantity" label="Số lượng" type="number" :error="!!errors.quantity"
            :message="errors.quantity" />

        <!-- Chọn danh mục -->
        <div>
            <label class="block text-gray-700 font-medium mb-2">Danh Mục Sản Phẩm</label>
            <el-select v-model="form.productCategory" placeholder="Chọn danh mục sản phẩm" class="w-full"
                :class="{ 'border-red-500': !!errors.productCategory }" clearable>
                <el-option v-for="category in categories.filter(category => category.active)" :key="category.id"
                    :label="category.name" :value="category.id"></el-option>
            </el-select>

            <p v-if="errors.productCategory" class="text-red-500 text-sm">{{ errors.productCategory }}</p>
        </div>
        <!-- Chọn thương hiệu -->
        <div>
            <label class="block text-gray-700 font-medium mb-2">Thương Hiệu</label>
            <el-select v-model="form.productBrand" placeholder="Chọn thương hiệu sản phẩm" class="w-full"
                :class="{ 'border-red-500': !!errors.productBrand }" clearable>
                <el-option v-for="brand in brands" :key="brand.id" :label="brand.name" :value="brand.id"></el-option>
            </el-select>
            <p v-if="errors.productBrand" class="text-red-500 text-sm">{{ errors.productBrand }}</p>
        </div>
        <!-- Mô tả ngắn -->
        <CustomInputComponent v-model="form.productShortDescription" label="Mô Tả Ngắn"
            :error="!!errors.productShortDescription" :message="errors.productShortDescription" />
        <!-- Mô tả dài -->
        <ckeditor v-model="form.productLongDescription" :editor="editor" @ready="onEditorReady"
            @change="onEditorChange">
        </ckeditor>
        <p v-if="errors.productLongDescription" class="text-red-500 text-sm">{{ errors.productLongDescription }}</p>
        <!-- Kích thước và cân nặng -->
        <div class="grid grid-cols-3 gap-4">
            <CustomInputComponent v-model="form.productWidth" label="Chiều Rộng (cm)" type="number"
                :error="!!errors.productWidth" :message="errors.productWidth" />
            <CustomInputComponent v-model="form.productHeight" label="Chiều Cao (cm)" type="number"
                :error="!!errors.productHeight" :message="errors.productHeight" />
            <CustomInputComponent v-model="form.productLength" label="Chiều Dài (cm)" type="number"
                :error="!!errors.productLength" :message="errors.productLength" />
        </div>
        <CustomInputComponent v-model="form.productWeight" label="Cân Nặng (kg)" type="number"
            :error="!!errors.productWeight" :message="errors.productWeight" />

        <!-- Thông số kỹ thuật -->
        <div>
            <label class="block text-gray-700 font-medium mb-2">Thông Số Kỹ Thuật</label>
            <div v-for="(spec, index) in form.specifications" :key="index" class="flex space-x-4 mb-2 items-center">
                <CustomInputComponent v-model="spec.key" label="Tên thông số" placeholder="Tên thông số"
                    class="flex-1" />
                <CustomInputComponent v-model="spec.value" label="Giá trị" placeholder="Giá trị" class="flex-1" />
                <!-- Nút xóa dòng -->
                <button type="button" @click="removeSpecification(index)" class="text-red-500">
                    ✕
                </button>
            </div>
            <!-- Nút thêm dòng -->
            <button type="button" @click="addSpecification"
                class="bg-green-600 text-white px-4 py-2 rounded-sm hover:bg-green-700">
                + Thêm Thông Số
            </button>
        </div>

        <!-- Hình ảnh -->
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="">Chọn hình cho sản phẩm</label>
            <uploadImageComponent @update-images="handleSelectImages"
                :listImages="form?.selectedImages ? form.selectedImages : []">
            </uploadImageComponent>
        </div>


        <!-- Nút hành động -->
        <div class="flex justify-end space-x-4">
            <button type="button" @click="$emit('close')" class="text-gray-700 px-4 py-2 rounded-sm hover:bg-gray-400">
                Hủy
            </button>
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-700">
                Lưu sản phẩm
            </button>
        </div>
    </form>
</template>

<script>
import { v4 as uuidv4 } from "uuid"; // Sử dụng UUID
import CustomInputComponent from "@/components/containers/input/CustomInputComponent.vue";
import * as yup from "yup";
import { ElSelect, ElOption } from "element-plus";
import 'element-plus/dist/index.css';
import uploadImageComponent from '@/components/containers/image/uploadImageComponent.vue';


import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyUploadAdapter from '@/utils/myUploadAdapter';
import { Ckeditor } from '@ckeditor/ckeditor5-vue';
export default {
    components: {
        uploadImageComponent,
        CustomInputComponent,
        ElSelect,
        ElOption,
        ckeditor: Ckeditor,
    },
    props: {
        categories: {
            type: Array,
            required: true,
        },
        brands: {
            type: Array,
            required: true,
        },
        product: {
            type: Object,
            default: () => ({
                productName: "",
                quantity: 0,
                productPrice: 0,
                discountProduct: 0,
                productShortDescription: "",
                productLongDescription: "",
                productWidth: 0,
                productHeight: 0,
                productLength: 0,
                productWeight: 0,
                selectedImages: [],
                productCategory: null,
                productBrand: null,
                specifications: [],
            }),
        },
    },
    data() {
        return {
            editor: ClassicEditor,
            form: { ...this.product },
            localFiles: [],
            errors: {},
        };
    },

    methods: {
        onEditorChange(event, editor) {
            this.form.productLongDescription = editor.getData();
        },
        onEditorReady(editor) {
            editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                return new MyUploadAdapter(loader);
            };
            editor.ui.view.editable.element.style.height = '300px';
            editor.ui.view.editable.element.style.minHeight = '200px';
            editor.ui.view.editable.element.style.overflowY = 'auto';

        },
        async handleSelectImages(images) {
            const imageLinks = [];
            const promises = await images.map((file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve({ file, base64: reader.result });
                    reader.onerror = (error) => reject(error);
                    reader.readAsDataURL(file); // Converts file to Base64
                });
            });

            await Promise.all(promises)
                .then((results) => {
                    results.forEach((result) => {
                        imageLinks.push({
                            file: result.file,
                            base64: result.base64,
                        });
                    });
                    this.form.selectedImages = imageLinks;
                })
                .catch((error) => {
                    console.error("Error reading files:", error);
                });
        },
        async validateProduct() {
            const schema = yup.object().shape({
                productName: yup.string().required("Tên sản phẩm là bắt buộc"),
                quantity: yup
                    .number()
                    .required("Số lượng sản phẩm là bắt buộc")
                    .min(1, "Giá phải lớn hơn 0"),
                productPrice: yup
                    .number()
                    .min(5000, "Số tiền phải lớn hơn >=5.000VND")
                    .transform((value) => parseFloat(value))
                    .required("Giá sản phẩm là bắt buộc")
                    .min(1, "Giá phải lớn hơn 0"),
                discountProduct: yup
                    .number()
                    .required("Số lượng sản phẩm là bắt buộc")
                    .min(0, "Giảm giá không hợp lệ")
                    .max(100, "Giảm giá không được vượt quá 100%"),
                productCategory: yup
                    .number()
                    .required("Danh mục sản phẩm là bắt buộc")
                    .typeError("Danh mục sản phẩm là bắt buộc"),
                productBrand: yup
                    .number()
                    .required("Thương hiệu sản phẩm là bắt buộc")
                    .typeError("Thương hiệu sản phẩm là bắt buộc"),
                productShortDescription: yup
                    .string()
                    .required("Mô tả ngắn là bắt buộc")
                    .max(200, "Mô tả ngắn không được vượt quá 200 ký tự"),
                productLongDescription: yup
                    .string()
                    .required("Mô tả dài là bắt buộc")
                    .min(50, "Mô tả dài phải có ít nhất 50 ký tự"),
                productWidth: yup
                    .number()
                    .required("Chiều rộng là bắt buộc")
                    .min(1, "Chiều rộng phải lớn hơn 0"),
                productHeight: yup
                    .number()
                    .required("Chiều cao là bắt buộc")
                    .min(1, "Chiều cao phải lớn hơn 0"),
                productLength: yup
                    .number()
                    .required("Chiều dài là bắt buộc")
                    .min(1, "Chiều dài phải lớn hơn 0"),
                productWeight: yup
                    .number()
                    .required("Cân nặng là bắt buộc")
                    .min(0.1, "Cân nặng phải lớn hơn 0"),
            });

            try {
                await schema.validate(this.form, { abortEarly: false });
                this.errors = {};
                return true;
            } catch (error) {
                this.errors = {};
                error.inner.forEach((e) => {
                    this.errors[e.path] = e.message;
                    console.log(this.errors)
                });
                return false;
            }
        },
        addSpecification() {
            if (!this.form.specifications) {
                this.form.specifications = [];
            }
            this.form.specifications.push({ key: "", value: "" });
        },
        removeSpecification(index) {
            if (this.form.specifications) {
                this.form.specifications.splice(index, 1);
            }
        },
        async submitProduct() {
            if (!(await this.validateProduct())) return;
            const product = {
                id: uuidv4(),
                ...this.form,
            };
            this.$emit("add-product", product);
            this.resetForm();
        },
        resetForm() {
            this.form = {
                quantity: 0,
                productName: "",
                productPrice: 0,
                discountProduct: 0,
                productShortDescription: "",
                productLongDescription: "",
                productWidth: 0,
                productHeight: 0,
                productLength: 0,
                productWeight: 0,
                selectedImages: [],
                productCategory: null,
                productBrand: null,
                specifications: [],
            };
        },
    },
};
</script>
