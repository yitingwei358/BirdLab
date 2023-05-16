import{K as n,L as i}from"./index-4d0c22ad.js";import{S as a}from"./sweetalert2-fb1ab54e.js";const{VITE_URL:r,VITE_PATH:o}={VITE_URL:"https://vue3-course-api.hexschool.io/",VITE_PATH:"j437437",BASE_URL:"/BirdLab/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},u=n("CartStore",{state:()=>({carts:[],cartNum:0,total:0,final_total:0,isLoading:!0,buttonDisable:!1}),actions:{getCarts(){this.isLoading=!0,i.get(`${r}/v2/api/${o}/cart`).then(t=>{this.isLoading=!1,this.carts=t.data.data.carts,this.total=t.data.data.total,this.final_total=t.data.data.final_total}).catch(t=>{a.fire({icon:"error",title:t.response.data.message})})},updateCartItem(t){this.isLoading=!0;const e=`${r}v2/api/${o}/cart/${t.id}`,s={product_id:t.product.id,qty:t.qty};i.put(e,{data:s}).then(()=>{this.getCarts(),a.fire({icon:"success",title:"數量更改成功",confirmButtonColor:"#31523f"})}).catch(c=>{a.fire({icon:"error",title:c.response.data.message})})},addToCart(t,e=1){this.buttonDisable=!0;const s={data:{product_id:t,qty:e}};i.post(`${r}v2/api/${o}/cart`,s).then(()=>{a.fire({icon:"success",title:"已加入購物車",confirmButtonColor:"#31523f"}),this.buttonDisable=!1,this.getCarts()}).catch(c=>{a.fire({icon:"error",title:c.response.data.message})})},deleteCartItem(t){this.isLoading=!0;const e=`${r}v2/api/${o}/cart/${t.id}`;i.delete(e).then(()=>{this.getCarts(),a.fire({icon:"success",title:"刪除成功",confirmButtonColor:"#31523f"})}).catch(s=>{a.fire({icon:"error",title:s.response.data.message})})},deleteAllCart(){this.isLoading=!0;const t=`${r}v2/api/${o}/carts`;i.delete(t).then(()=>{a.fire({icon:"success",title:"購物車已清空",confirmButtonColor:"#31523f"}),this.getCarts()}).catch(e=>{a.fire({icon:"error",title:e.response.data.message})})}}});export{u as C};