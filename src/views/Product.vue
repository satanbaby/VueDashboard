<template>
  <div>
    <div class="loading"
      v-if="loadingStatus.loading">
      <div>
        <div class="spinner-border text-danger loading-icon" role="status">
        <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">產品管理介面</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal" @click="openModal()">
          新增產品
        </button>
      </div>
    </div>
      <table class="table table-striped table-sm">
        <thead>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120" class="text-center">原價</th>
          <th width="120" class="text-center">售價</th>
          <th width="100">是否啟用</th>
          <th width="180" class="text-center">編輯</th>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td>{{item.category}}</td>
            <td>{{item.title}}</td>
            <td class="text-right">{{item.origin_price}}</td>
            <td class="text-right">{{item.price}}</td>
            <td>未啟用</td>
            <td class="text-center">
              <div class="btn-group" role="group" aria-label="Basic example">
                <button class="btn btn-primary btn-sm"
                @click="openModal(item)"
                >編輯</button>
                <button class="btn btn-danger btn-sm"
                @click="openDelModal(item)"
                >刪除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- CreateModal -->
      <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title" id="exampleModalLabel">
                <span>新增產品</span>
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-4">
                  <div class="form-group">
                    <label for="image">輸入圖片網址</label>
                    <input type="text" class="form-control" id="image"
                      placeholder="請輸入圖片連結"
                      v-model="tempProduct.imageUrl"
                      >
                  </div>
                  <div class="form-group">
                    <label for="customFile">或 上傳圖片
                    </label>
                    <input type="file" id="customFile" class="form-control"
                      @change="uploadImg"
                      value="">
                      <!-- 進度條 -->
                    <div class="progress" style="height: 3px;"
                      v-if="loadingStatus.upload">
                      <div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100"
                      ref="progress"></div>
                    </div>
                  </div>
                  <img :src="tempProduct.imageUrl"
                    class="img-fluid" alt="">
                </div>
                <div class="col-sm-8">
                  <div class="form-group">
                    <label for="title">標題</label>
                    <input type="text" class="form-control" id="title"
                      placeholder="請輸入標題"
                      v-model="tempProduct.title"
                      >
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="category">分類</label>
                      <input type="text" class="form-control" id="category"
                        placeholder="請輸入分類"
                        v-model="tempProduct.category"
                        >
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">單位</label>
                      <input type="unit" class="form-control" id="unit"
                        placeholder="請輸入單位"
                        v-model="tempProduct.unit"
                        >
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                      <input type="number" class="form-control" id="origin_price"
                        placeholder="請輸入原價"
                        v-model="tempProduct.price"
                        >
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">售價</label>
                      <input type="number" class="form-control" id="price"
                        placeholder="請輸入售價"
                        v-model="tempProduct.origin_price"
                        >
                    </div>
                  </div>
                  <hr>

                  <div class="form-group">
                    <label for="description">產品描述</label>
                    <textarea type="text" class="form-control" id="description"
                      placeholder="請輸入產品描述"
                      v-model="tempProduct.description"
                      ></textarea>
                  </div>
                  <div class="form-group">
                    <label for="content">說明內容</label>
                    <textarea type="text" class="form-control" id="content"
                      placeholder="請輸入產品說明內容"
                      v-model="tempProduct.content"
                      ></textarea>
                  </div>
                  <div class="form-group">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox"
                        id="is_enabled"
                        v-model="tempProduct.is_enabled"
                        :true-value= 1
                        :false-value= 0
                        >
                      <label class="form-check-label" for="is_enabled">
                        是否啟用
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary"
              @click="createProduct"
              >
              <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"
                v-show="loadingStatus.submit"
              ></span>
              確認</button>
            </div>
          </div>
        </div>
      </div>

      <!-- DeleteModal -->
      <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
              <h5 class="modal-title" id="exampleModalLabel">
                <span>刪除產品</span>
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              是否刪除
              <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-danger"
                @click="deleteProduct(tempProduct.id)"
                >
                <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"
                v-show="loadingStatus.submit"
                ></span>
                確認刪除</button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import $ from 'jquery'
import 'bootstrap'
import { ArrayPropsDefinition } from 'vue/types/options'
import { progress } from '@/assets/service'
import eventBus from '@/assets/bus'

export default Vue.extend({
  data () {
    return {
      // 取得產品模型
      products: [],
      // 新產品模型
      tempProduct: {
        category: '',
        content: '',
        description: '',
        id: '',
        image: '',
        is_enabled: 0,
        origin_price: 0,
        price: 0,
        title: '',
        unit: '',
        num: 0,
        imageUrl: ''
      },
      isNews: false,
      loadingStatus: {
        upload: false,
        loading: false,
        submit: false
      },
      progressLoading: 0
    }
  },
  methods: {
    getProducts () {
      const api = `${process.env.VUE_APP_Path}/api/${process.env.VUE_APP_CUSTOMPATH}/products`
      const vm = this
      vm.loadingStatus.loading = true
      this.$http.get(api).then(response => {
        if (response.data.success) {
          vm.loadingStatus.loading = false
          this.products = response.data.products
        }
      })
    },
    openModal (item: any) {
      if (item) {
        this.isNews = false
        this.tempProduct = Object.assign({}, item)
      } else {
        this.isNews = true
        this.tempProduct = {
          category: '',
          content: '',
          description: '',
          id: '',
          image: '',
          is_enabled: 0,
          origin_price: 0,
          price: 0,
          title: '',
          unit: '',
          num: 0,
          imageUrl: ''
        }
      }
      $('#productModal').modal('show')
    },
    createProduct () {
      const vm = this
      let api = `${process.env.VUE_APP_Path}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`
      vm.loadingStatus.submit = true
      if (vm.isNews) {
        this.$http.post(api, { data: vm.tempProduct })
          .then(response => {
            if (response.data.success) {
              vm.getProducts()
              vm.loadingStatus.submit = false
              $('#productModal').modal('hide')
            }
          })
      } else {
        api = `${process.env.VUE_APP_Path}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
        this.$http.put(api, { data: vm.tempProduct })
          .then(response => {
            if (response.data.success) {
              vm.getProducts()
              vm.loadingStatus.submit = false
              $('#productModal').modal('hide')
            }
          })
      }
    },
    openDelModal (item: any) {
      $('#delProductModal').modal('toggle')
      const vm = this
      vm.tempProduct = item
    },
    deleteProduct (item: string) {
      const api = `${process.env.VUE_APP_Path}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${item}`
      console.log(api)
      const vm = this

      vm.loadingStatus.submit = true
      this.$http.delete(api)
        .then(response => {
          if (response.data.success) {
            vm.getProducts()
            vm.loadingStatus.submit = false
            $('#delProductModal').modal('hide')
          }
        })
    },
    uploadImg (event: any) {
      const api = `${process.env.VUE_APP_Path}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`
      const vm = this
      console.log(event)
      let selectImg = event.target.files[0]

      vm.loadingStatus.upload = true

      const formData = new FormData()
      formData.append('file-to-upload', selectImg)
      //                             v-config
      this.$http.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        // import from assets service
        onUploadProgress: function (progressEvent: any) {
          // console.log(progress(progressEvent))
          let progressValue = Math.floor(progress(progressEvent))
          let el = document.getElementsByClassName('progress-bar')[0]
          el.classList.add('bg-danger')
          el.setAttribute('style', `width:${progressValue}%`)
          if (progressValue === 100) {
            el.classList.remove('bg-danger')
          }
        }
      }).then((response) => {
        console.log(response.data)
        if (response.data.success) {
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl)
          vm.loadingStatus.upload = false
        } else {
          eventBus.$emit('messsage:push', response.data.message, 'danger')
        }
      })
    }
  },
  created () {
    this.getProducts()
  }
})
</script>

<style lang="scss" scoped>
$iconSize: 9em;
/* Absolute Center Spinner */
.loading {
  position: fixed;
  z-index: 999;
  height: 1em;
  width: 1em;
  overflow: show;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  >div{
    display: inline-block;
    transform: translate(-50%, -50%);
    .loading-icon{
      width: $iconSize;
      height: $iconSize;
    }
  };
/* Transparent Overlay */
  &:before{
    content: '';
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
  }
}

</style>
