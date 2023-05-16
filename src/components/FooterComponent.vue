<template>
  <footer class="footer">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-12">
          <div class="row mb-3">
            <div class="d-flex align-items-center mb-3">
              <p class="fs-3 d-inline-block mb-0 me-3">Bird Lab 鳥博士</p>
              <a
                href="https://www.facebook.com/people/Bird-Lab-%E9%B3%A5%E5%8D%9A%E5%A3%AB-%E9%B3%A5%E5%AF%B6%E6%89%80%E9%9C%80%E7%9A%84%E9%83%BD%E5%9C%A8%E9%80%99/100091568307739/"
                target="_blank"
                aria-label="前往BirdLab鳥博士的Facebook粉絲專頁"
              >
                <i
                  class="fa-brands fa-facebook fa-2xl align-cneter fb_icon"
                ></i>
              </a>
            </div>
            <div>
              <ul class="footer_list list-unstyled">
                <li class="footer_item">
                  <RouterLink to="/products" class="link"
                    >全系列產品</RouterLink
                  >
                </li>
                <li class="footer_item">
                  <RouterLink to="/blog" class="link">鳥博士研究所</RouterLink>
                </li>
                <li class="footer_item">
                  <RouterLink to="/faq" class="link">常見問答</RouterLink>
                </li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-8">
              <p>
                &copy; 2023 JudyWei 版權所有<span class="ms-3"
                  >此作品僅做為程式練習使用</span
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
