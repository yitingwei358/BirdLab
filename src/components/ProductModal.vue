<template>
  <div
    id="productModal"
    ref="productModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <v-form
          ref="form"
          class="col"
          v-slot="{ errors }"
          @submit="() => $emit('emitUpdateItem', tempProduct)"
        >
          <div class="modal-header bg-dark text-white">
            <h5 id="productModalLabel" class="modal-title">
              <span v-if="isNew">新增產品</span>
              <span v-else>編輯產品</span>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <Loading-overlay :active="isLoading" :z-index="1000" />
            <div class="row">
              <div class="col-sm-4">
                <div class="mb-2">
                  <div class="mb-3">
                    <label class="form-label"
                      >主要圖片<br />新增網址或上傳圖片</label
                    >
                    <input
                      v-model="tempProduct.imageUrl"
                      type="text"
                      class="form-control"
                      placeholder="請輸入圖片連結"
                    />
                  </div>
                  <div class="input-group mb-3">
                    <input
                      type="file"
                      class="form-control"
                      id="customFile"
                      aria-describedby="inputGroupFileAddon04"
                      aria-label="Upload"
                      ref="fileInput"
                      @change="enableUpload"
                    />
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      id="customFileUploadBtn"
                      @click="uploadFile"
                      :disabled="!canUpload || isUpLoading"
                    >
                      <i class="fas fa-spinner fa-pulse" v-if="isUpLoading"></i>
                      上傳
                    </button>
                  </div>
                  <img
                    v-if="tempProduct.imageUrl"
                    class="img-fluid"
                    :src="tempProduct.imageUrl"
                    alt="主要圖片"
                  />
                </div>
                <hr />
                <!-- 多圖新增功能 -->
                <h3 class="mb-3 mt-4">多圖新增</h3>
                <template v-if="Array.isArray(tempProduct.imagesUrl)">
                  <div
                    class="mb-1"
                    v-for="(item, key) in tempProduct.imagesUrl"
                    :key="item"
                  >
                    <div class="mb-3 bg-light p-2">
                      <label for="imageUrl" class="form-label">圖片網址</label>
                      <input
                        v-model="tempProduct.imagesUrl[key]"
                        type="text"
                        class="form-control"
                        placeholder="請輸入圖片連結"
                      />
                      <div class="position-relative">
                        <img class="img-fluid" :src="item" />
                        <div class="position-absolute top-0 end-0">
                          <button
                            type="button"
                            class="btn btn-danger"
                            @click="() => tempProduct.imagesUrl.splice(key, 1)"
                          >
                            <i class="bi bi-x"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div
                      v-if="
                        !tempProduct.imagesUrl.length ||
                        tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]
                      "
                    >
                      <button
                        type="button"
                        class="btn btn-outline-primary btn-sm d-block w-100"
                        @click="() => tempProduct.imagesUrl.push('')"
                      >
                        新增圖片
                      </button>
                    </div>
                    <div v-else>
                      <button
                        type="button"
                        class="btn btn-outline-danger btn-sm d-block w-100"
                        @click="() => tempProduct.imagesUrl.pop()"
                      >
                        刪除圖片
                      </button>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="createImages"
                  >
                    新增圖片
                  </button>
                </template>
              </div>
              <div class="col-sm-8">
                <div class="mb-3">
                  <label for="title" class="form-label">標題*</label>
                  <v-field
                    id="title"
                    v-model="tempProduct.title"
                    name="標題"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors['標題'] }"
                    placeholder="請輸入標題"
                    rules="required"
                  ></v-field>
                  <error-message
                    name="標題"
                    class="invalid-feedback"
                  ></error-message>
                </div>
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="category" class="form-label">分類*</label>
                    <v-field
                      id="category"
                      v-model="tempProduct.category"
                      name="分類"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['分類'] }"
                      placeholder="請輸入分類"
                      rules="required"
                    ></v-field>
                    <error-message
                      name="分類"
                      class="invalid-feedback"
                    ></error-message>
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">單位*</label>
                    <v-field
                      id="unit"
                      v-model="tempProduct.unit"
                      name="單位"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['單位'] }"
                      placeholder="請輸入單位"
                      rules="required"
                    ></v-field>
                    <error-message
                      name="單位"
                      class="invalid-feedback"
                    ></error-message>
                  </div>
                </div>
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="origin_price" class="form-label">原價*</label>
                    <v-field
                      id="origin_price"
                      v-model.number="tempProduct.origin_price"
                      name="原價"
                      type="number"
                      class="form-control"
                      :class="{ 'is-invalid': errors['原價'] }"
                      placeholder="請輸入原價"
                      rules="required|min_value:0"
                    ></v-field>
                    <error-message
                      name="原價"
                      class="invalid-feedback"
                    ></error-message>
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">售價*</label>
                    <v-field
                      id="price"
                      v-model.number="tempProduct.price"
                      name="售價"
                      type="number"
                      class="form-control"
                      :class="{ 'is-invalid': errors['售價'] }"
                      placeholder="請輸入售價"
                      rules="required|min_value:0"
                    ></v-field>
                    <error-message
                      name="售價"
                      class="invalid-feedback"
                    ></error-message>
                  </div>
                </div>
                <hr />
                <div class="mb-3">
                  <label for="description" class="form-label">產品描述</label>
                  <!-- ckeditor -->
                  <div class="ck-body-wrapper">
                    <ckeditor
                      :editor="editor"
                      v-model="tempProduct.description"
                      :config="editorConfig"
                    ></ckeditor>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label">說明內容</label>
                  <div class="ck-body-wrapper">
                    <ckeditor
                      :editor="editor"
                      v-model="tempProduct.content"
                      :config="editorConfig"
                    ></ckeditor>
                  </div>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                      class="form-check-input"
                      type="checkbox"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled"
                      >是否啟用</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              取消
            </button>
            <button type="submit" class="btn btn-primary">確認</button>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "bootstrap/js/dist/modal";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ErrorMessage } from "vee-validate";
import Swal from "sweetalert2";
const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  props: {
    product: {
      type: Object,
      default() {
        return { imagesUrl: [] };
      },
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      modal: "",
      tempProduct: {},
      message: "",
      isUpLoading: false,
      canUpload: false,
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        toolbar: {
          items: [
            "link",
            "undo",
            "redo",
            "|",
            "heading",
            "|",
            "bold",
            "italic",
            "|",
            "uploadImage",
            "insertTable",
            "mediaEmbed",
            "|",
            "bulletedList",
            "numberedList",
            "outdent",
            "indent",
          ],
        },
      },
    };
  },
  watch: {
    product() {
      this.tempProduct = this.product;
      if (!this.tempProduct.imagesUrl) {
        this.tempProduct.imagesUrl = [];
      }
      if (!this.tempProduct.imageUrl) {
        this.tempProduct.imageUrl = "";
      }
    },
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push("");
    },
    enableUpload() {
      this.canUpload = true;
    },
    uploadFile() {
      this.isUpLoading = true;
      const uploadedFile = this.$refs.fileInput.files[0];
      const formData = new FormData();
      formData.append("file-to-upload", uploadedFile);
      const url = `${VITE_URL}v2/api/${VITE_PATH}/admin/upload`;
      this.$http
        .post(url, formData)
        .then((res) => {
          this.tempProduct.imageUrl = res.data.imageUrl;
          this.$refs.fileInput.value = "";
          this.isUpLoading = false;
        })
        .catch((err) => {
          this.isUpLoading = false;
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
          });
        });
    },
  },
  components: {
    ErrorMessage,
  },
  mounted() {
    this.modal = new Modal(this.$refs.productModal);
  },
};
</script>
