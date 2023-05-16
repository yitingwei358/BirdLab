<template>
  <header class="container-fiuld">
    <router-link to="products">
      <div style="width: 100%; position: relative; overflow: hidden">
        <img
          src="@/assets/img/和尚.png"
          alt="站在樹枝上的和尚鸚鵡"
          style="width: 60%; position: absolute; transform: translate(80%, 10%)"
        />
        <img
          src="@/assets/img/home-banner.jpg"
          alt="夏季布窩新貨到，購買就送滋養完試吃包"
          class="w-100"
        />
      </div>
    </router-link>
  </header>
  <section class="newEvents overflow-hidden" style="position: relative">
    <img
      src="@/assets/img/section-article-header.png"
      alt="叢林背景圖"
      style="position: absolute; top: 0"
    />
    <div class="container">
      <div class="row justify-content-center newEvents_main">
        <div class="col-lg-9">
          <div
            class="row align-items-center"
            data-aos="flip-left"
            data-aos-duration="900"
          >
            <div class="col-md-8">
              <img
                src="@/assets/img/section-article-birdpro.png"
                alt="鳥類專家與金剛鸚鵡合照"
                class="img-fluid"
              />
            </div>
            <div class="col-md-4">
              <div class="px-3 py-5 rounded text-center bg-white">
                <h3 class="fs-1 fw-bold mb-3">大神來解惑</h3>
                <h4 class="fs-3 fw-bold mb-4">
                  鳥寶能吃什麼蔬果<br />一次報給你知！
                </h4>
                <RouterLink
                  to="article/-NQufV6R7eV7v8Wn4Rxe"
                  type="button"
                  class="btn btn-lg btn-primary"
                  >閱讀全文</RouterLink
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center newEvents_blog">
        <div class="col-lg-9">
          <h3 class="fs-1 fw-bold">鳥博士研究所</h3>
          <hr />
          <p class="fs-3 fw-bold mb-5">
            養鳥必知大小事，關注鳥博士就對了！ <br />
            新開章節【世界鳥類篇】，帶你了解全球各地可愛的鳥類！
          </p>
          <ul class="row g-3 gy-4 list-unstyled text-center article_list">
            <li class="col-md-6 col-xl-3 article_item">
              <RouterLink to="/article/-NQuvhrvPuuqGVjql_Li" class="link">
                <div class="article_card bg-white shadow">
                  <div
                    class="article_card_img border border-bottom-0 border-5 border-white"
                  >
                    <img
                      src="@/assets/img/article-1.jpg"
                      alt="虎皮鸚鵡站在樹枝上"
                      class="img_cover"
                    />
                  </div>
                  <h4 class="article_card_title fs-5 p-2">
                    白鐵? 塑膠? <br />鳥籠大小與材質選擇
                  </h4>
                </div>
              </RouterLink>
            </li>
            <li class="col-md-6 col-xl-3 article_item">
              <RouterLink to="/article/-NQuo5rpxtgpjUfdLTDE" class="link">
                <div class="article_card bg-white shadow">
                  <div
                    class="article_card_img border border-bottom-0 border-5 border-white"
                  >
                    <img
                      src="@/assets/img/article-2.jpg"
                      alt="非洲灰鸚鵡站在盪鞦韆玩具上"
                      class="img_cover"
                    />
                  </div>
                  <h4 class="article_card_title fs-5 p-2">
                    為什麼鸚鵡需要玩具? <br />是必需品嗎
                  </h4>
                </div>
              </RouterLink>
            </li>
            <li class="col-md-6 col-xl-3 article_item">
              <RouterLink to="/article/-NQufV6R7eV7v8Wn4Rxe" class="link">
                <div class="article_card bg-white shadow">
                  <div
                    class="article_card_img border border-bottom-0 border-5 border-white"
                  >
                    <img
                      src="@/assets/img/article-3.jpg"
                      alt="和尚鸚鵡正臉照"
                      class="img_cover"
                    />
                  </div>
                  <h4 class="article_card_title fs-5 p-2">
                    不是所有蔬果都能吃！ <br />讓專家告訴你
                  </h4>
                </div>
              </RouterLink>
            </li>
            <li class="col-md-6 col-xl-3 article_item">
              <RouterLink to="/article/-NQqsZM8Ntz0wekZ1xB-" class="link">
                <div class="article_card bg-white shadow">
                  <div
                    class="article_card_img border border-bottom-0 border-5 border-white"
                  >
                    <img
                      src="@/assets/img/article-4.jpg"
                      alt="愛情鳥站在主人手上，張開嘴巴吃飼料"
                      class="img_cover"
                    />
                  </div>
                  <h4 class="article_card_title fs-5 p-2">
                    說到專情沒人比得過他 <br />一起來認識愛情鳥
                  </h4>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
export default {
  mounted() {
    AOS.init({
      offset: 120,
      duration: 600,
      easing: "ease-in-out",
      delay: 100,
      once: false,
      mirror: false,
      anchorPlacement: "top-bottom",
    });
  },
};
</script>
