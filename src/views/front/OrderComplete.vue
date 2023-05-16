<template>
  <div class="container" style="min-height: 80vh">
    <div class="row py-5 justify-content-center">
      <div class="col-lg-6 bg-white">
        <div class="text-center mb-3" style="height: 200px">
          <h3>訂購完成!</h3>
          <p class="fs-4">感謝您的訂購，我們將在3個工作天內出貨</p>
          <p>
            若有任何問題歡迎聯繫我們，將由專人為您服務<br />
            免費客服電話：0800-520-9999 <br />
            服務時間：週一至週五 9:00-12:30 / 14:00-18:00
          </p>
        </div>
        <div class="row justify-content-center">
          <div class="col-6">
            <RouterLink
              to="/faq"
              type="button"
              class="btn btn-primary w-100 btn-lg p-5"
              >常見問答</RouterLink
            >
          </div>
          <div class="col-6">
            <RouterLink
              to="/products"
              type="button"
              class="btn btn-primary w-100 btn-lg p-5"
              >再去逛逛</RouterLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
