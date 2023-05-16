<template>
  <div
    class="modal fade"
    data-focus="false"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="articleModal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <v-form
          ref="form"
          class="col"
          v-slot="{ errors }"
          @submit="() => $emit('emit-update-article', tempArticle)"
        >
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="isNew">新增貼文</span>
              <span v-else>編輯貼文</span>
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
                <div class="mb-3">
                  <label for="title" class="form-label">標題*</label>
                  <v-field
                    id="title"
                    v-model="tempArticle.title"
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
                <div class="mb-3">
                  <label for="image" class="form-label">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    v-model="tempArticle.imageUrl"
                    placeholder="請輸入圖片連結"
                  />
                </div>
                <div class="mb-3">
                  <label for="author" class="form-label">作者*</label>
                  <v-field
                    id="author"
                    v-model="tempArticle.author"
                    name="作者"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors['作者'] }"
                    placeholder="請輸入作者"
                    rules="required"
                  ></v-field>
                  <error-message
                    name="作者"
                    class="invalid-feedback"
                  ></error-message>
                </div>
                <div class="mb-3">
                  <label for="create_at">文章建立日期</label>
                  <input
                    type="date"
                    class="form-control"
                    id="create_at"
                    v-model="create_at"
                  />
                </div>
              </div>
              <div class="col-sm-8">
                <label for="tag" class="form-label">標籤</label>
                <div class="row gx-1 mb-3">
                  <div
                    class="col-md-2 mb-1"
                    v-for="(label, key) in tempArticle.tag"
                    :key="key"
                  >
                    <div class="input-group input-group-sm">
                      <input
                        type="text"
                        class="form-control form-control"
                        id="tag"
                        v-model="tempArticle.tag[key]"
                        placeholder="請輸入標籤"
                      />
                      <button
                        type="button"
                        class="btn btn-outline-danger"
                        @click="() => tempArticle.tag.splice(key, 1)"
                      >
                        <i class="bi bi-x"></i>
                      </button>
                    </div>
                  </div>
                  <!-- 防呆 - 沒標籤或是最後一個標籤有內容時，顯示"新增標籤按鈕" -->
                  <div
                    class="col-md-2 mb-1"
                    v-if="
                      tempArticle.tag[tempArticle.tag.length - 1] ||
                      !tempArticle.tag.length
                    "
                  >
                    <button
                      class="btn btn-outline-primary btn-sm d-block w-100"
                      type="button"
                      @click="() => tempArticle.tag.push('')"
                    >
                      新增標籤
                    </button>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="description" class="form-label">文章描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="tempArticle.description"
                    placeholder="請輸入文章描述"
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label class="form-label">文章內容*</label>
                  <div class="ck-body-wrapper">
                    <ckeditor
                      :editor="editor"
                      v-model="tempArticle.content"
                      :config="editorConfig"
                    ></ckeditor>
                  </div>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="tempArticle.isPublic"
                      id="isPublic"
                    />
                    <label class="form-check-label" for="isPublic">
                      是否公開
                    </label>
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

export default {
  props: {
    article: {
      type: Object,
      default() {
        return {};
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
      tempArticle: {
        tag: [""],
      },
      create_at: 0,
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
  methods: {
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
  watch: {
    article() {
      this.tempArticle = {
        ...this.article,
        tag: this.article.tag || [],
        isPublic: this.article.isPublic || false,
      };
      [this.create_at] = new Date(this.tempArticle.create_at * 1000)
        .toISOString()
        .split("T");
    },
    create_at() {
      this.tempArticle.create_at = Math.floor(new Date(this.create_at) / 1000);
    },
  },
  components: {
    ErrorMessage,
  },
  mounted() {
    this.modal = new Modal(this.$refs.articleModal);
  },
};
</script>
