import{P as I}from"./PaginationEffect-2e0fd878.js";import{M as T,D as B}from"./DeleteModal-e2c44c9b.js";import{C as N}from"./ckeditor-f9b0134a.js";import{_ as x,H as A,r as m,o as n,c as d,d as e,b as l,w as R,u as V,I as C,f as L,e as w,F as U,j as E,n as h,N as F,t as v}from"./index-4d0c22ad.js";import{S as b}from"./sweetalert2-fb1ab54e.js";const{VITE_URL:S,VITE_PATH:j}={VITE_URL:"https://vue3-course-api.hexschool.io/",VITE_PATH:"j437437",BASE_URL:"/BirdLab/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},H={props:{product:{type:Object,default(){return{imagesUrl:[]}}},isNew:{type:Boolean,default:!1},isLoading:{type:Boolean,default:!1}},data(){return{modal:"",tempProduct:{},message:"",isUpLoading:!1,canUpload:!1,editor:N,editorData:"<p>Content of the editor.</p>",editorConfig:{toolbar:{items:["link","undo","redo","|","heading","|","bold","italic","|","uploadImage","insertTable","mediaEmbed","|","bulletedList","numberedList","outdent","indent"]}}}},watch:{product(){this.tempProduct=this.product,this.tempProduct.imagesUrl||(this.tempProduct.imagesUrl=[]),this.tempProduct.imageUrl||(this.tempProduct.imageUrl="")}},methods:{openModal(){this.modal.show()},hideModal(){this.modal.hide()},createImages(){this.tempProduct.imagesUrl=[],this.tempProduct.imagesUrl.push("")},enableUpload(){this.canUpload=!0},uploadFile(){this.isUpLoading=!0;const i=this.$refs.fileInput.files[0],o=new FormData;o.append("file-to-upload",i);const a=`${S}v2/api/${j}/admin/upload`;this.$http.post(a,o).then(u=>{this.tempProduct.imageUrl=u.data.imageUrl,this.$refs.fileInput.value="",this.isUpLoading=!1}).catch(u=>{this.isUpLoading=!1,b.fire({icon:"error",title:u.response.data.message})})}},components:{ErrorMessage:A},mounted(){this.modal=new T(this.$refs.productModal)}},q={id:"productModal",ref:"productModal",class:"modal fade",tabindex:"-1","aria-labelledby":"productModalLabel","aria-hidden":"true"},O={class:"modal-dialog modal-xl"},z={class:"modal-content border-0"},G={class:"modal-header bg-dark text-white"},J={id:"productModalLabel",class:"modal-title"},K={key:0},Q={key:1},W=e("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),X={class:"modal-body"},Y={class:"row"},Z={class:"col-sm-4"},$={class:"mb-2"},ee={class:"mb-3"},te=e("label",{class:"form-label"},[w("主要圖片"),e("br"),w("新增網址或上傳圖片")],-1),oe={class:"input-group mb-3"},se=["disabled"],le={key:0,class:"fas fa-spinner fa-pulse"},ie=["src"],ne=e("hr",null,null,-1),de=e("h3",{class:"mb-3 mt-4"},"多圖新增",-1),ae={class:"mb-3 bg-light p-2"},re=e("label",{for:"imageUrl",class:"form-label"},"圖片網址",-1),ce=["onUpdate:modelValue"],ue={class:"position-relative"},me=["src"],pe={class:"position-absolute top-0 end-0"},_e=["onClick"],he=e("i",{class:"bi bi-x"},null,-1),be=[he],fe={key:0},ge={key:1},ve={class:"col-sm-8"},Pe={class:"mb-3"},ye=e("label",{for:"title",class:"form-label"},"標題*",-1),Ue={class:"row"},ke={class:"mb-3 col-md-6"},Me=e("label",{for:"category",class:"form-label"},"分類*",-1),Ve={class:"mb-3 col-md-6"},Le=e("label",{for:"price",class:"form-label"},"單位*",-1),we={class:"row"},Ce={class:"mb-3 col-md-6"},xe=e("label",{for:"origin_price",class:"form-label"},"原價*",-1),Ee={class:"mb-3 col-md-6"},De=e("label",{for:"price",class:"form-label"},"售價*",-1),Ie=e("hr",null,null,-1),Te={class:"mb-3"},Be=e("label",{for:"description",class:"form-label"},"產品描述",-1),Ne={class:"ck-body-wrapper"},Ae={class:"mb-3"},Re=e("label",{for:"content",class:"form-label"},"說明內容",-1),Fe={class:"ck-body-wrapper"},Se={class:"mb-3"},je={class:"form-check"},He=e("label",{class:"form-check-label",for:"is_enabled"},"是否啟用",-1),qe=e("div",{class:"modal-footer"},[e("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 "),e("button",{type:"submit",class:"btn btn-primary"},"確認")],-1);function Oe(i,o,a,u,t,r){const k=m("Loading-overlay"),p=m("v-field"),_=m("error-message"),g=m("ckeditor"),c=m("v-form");return n(),d("div",q,[e("div",O,[e("div",z,[l(c,{ref:"form",class:"col",onSubmit:o[14]||(o[14]=()=>i.$emit("emitUpdateItem",t.tempProduct))},{default:R(({errors:f})=>[e("div",G,[e("h5",J,[a.isNew?(n(),d("span",K,"新增產品")):(n(),d("span",Q,"編輯產品"))]),W]),e("div",X,[l(k,{active:a.isLoading,"z-index":1e3},null,8,["active"]),e("div",Y,[e("div",Z,[e("div",$,[e("div",ee,[te,V(e("input",{"onUpdate:modelValue":o[0]||(o[0]=s=>t.tempProduct.imageUrl=s),type:"text",class:"form-control",placeholder:"請輸入圖片連結"},null,512),[[C,t.tempProduct.imageUrl]])]),e("div",oe,[e("input",{type:"file",class:"form-control",id:"customFile","aria-describedby":"inputGroupFileAddon04","aria-label":"Upload",ref:"fileInput",onChange:o[1]||(o[1]=(...s)=>r.enableUpload&&r.enableUpload(...s))},null,544),e("button",{class:"btn btn-outline-secondary",type:"button",id:"customFileUploadBtn",onClick:o[2]||(o[2]=(...s)=>r.uploadFile&&r.uploadFile(...s)),disabled:!t.canUpload||t.isUpLoading},[t.isUpLoading?(n(),d("i",le)):L("",!0),w(" 上傳 ")],8,se)]),t.tempProduct.imageUrl?(n(),d("img",{key:0,class:"img-fluid",src:t.tempProduct.imageUrl,alt:"主要圖片"},null,8,ie)):L("",!0)]),ne,de,Array.isArray(t.tempProduct.imagesUrl)?(n(),d(U,{key:0},[(n(!0),d(U,null,E(t.tempProduct.imagesUrl,(s,M)=>(n(),d("div",{class:"mb-1",key:s},[e("div",ae,[re,V(e("input",{"onUpdate:modelValue":D=>t.tempProduct.imagesUrl[M]=D,type:"text",class:"form-control",placeholder:"請輸入圖片連結"},null,8,ce),[[C,t.tempProduct.imagesUrl[M]]]),e("div",ue,[e("img",{class:"img-fluid",src:s},null,8,me),e("div",pe,[e("button",{type:"button",class:"btn btn-danger",onClick:()=>t.tempProduct.imagesUrl.splice(M,1)},be,8,_e)])])])]))),128)),e("div",null,[!t.tempProduct.imagesUrl.length||t.tempProduct.imagesUrl[t.tempProduct.imagesUrl.length-1]?(n(),d("div",fe,[e("button",{type:"button",class:"btn btn-outline-primary btn-sm d-block w-100",onClick:o[3]||(o[3]=()=>t.tempProduct.imagesUrl.push(""))}," 新增圖片 ")])):(n(),d("div",ge,[e("button",{type:"button",class:"btn btn-outline-danger btn-sm d-block w-100",onClick:o[4]||(o[4]=()=>t.tempProduct.imagesUrl.pop())}," 刪除圖片 ")]))])],64)):(n(),d("button",{key:1,type:"button",class:"btn btn-outline-primary btn-sm d-block w-100",onClick:o[5]||(o[5]=(...s)=>r.createImages&&r.createImages(...s))}," 新增圖片 "))]),e("div",ve,[e("div",Pe,[ye,l(p,{id:"title",modelValue:t.tempProduct.title,"onUpdate:modelValue":o[6]||(o[6]=s=>t.tempProduct.title=s),name:"標題",type:"text",class:h(["form-control",{"is-invalid":f.標題}]),placeholder:"請輸入標題",rules:"required"},null,8,["modelValue","class"]),l(_,{name:"標題",class:"invalid-feedback"})]),e("div",Ue,[e("div",ke,[Me,l(p,{id:"category",modelValue:t.tempProduct.category,"onUpdate:modelValue":o[7]||(o[7]=s=>t.tempProduct.category=s),name:"分類",type:"text",class:h(["form-control",{"is-invalid":f.分類}]),placeholder:"請輸入分類",rules:"required"},null,8,["modelValue","class"]),l(_,{name:"分類",class:"invalid-feedback"})]),e("div",Ve,[Le,l(p,{id:"unit",modelValue:t.tempProduct.unit,"onUpdate:modelValue":o[8]||(o[8]=s=>t.tempProduct.unit=s),name:"單位",type:"text",class:h(["form-control",{"is-invalid":f.單位}]),placeholder:"請輸入單位",rules:"required"},null,8,["modelValue","class"]),l(_,{name:"單位",class:"invalid-feedback"})])]),e("div",we,[e("div",Ce,[xe,l(p,{id:"origin_price",modelValue:t.tempProduct.origin_price,"onUpdate:modelValue":o[9]||(o[9]=s=>t.tempProduct.origin_price=s),modelModifiers:{number:!0},name:"原價",type:"number",class:h(["form-control",{"is-invalid":f.原價}]),placeholder:"請輸入原價",rules:"required|min_value:0"},null,8,["modelValue","class"]),l(_,{name:"原價",class:"invalid-feedback"})]),e("div",Ee,[De,l(p,{id:"price",modelValue:t.tempProduct.price,"onUpdate:modelValue":o[10]||(o[10]=s=>t.tempProduct.price=s),modelModifiers:{number:!0},name:"售價",type:"number",class:h(["form-control",{"is-invalid":f.售價}]),placeholder:"請輸入售價",rules:"required|min_value:0"},null,8,["modelValue","class"]),l(_,{name:"售價",class:"invalid-feedback"})])]),Ie,e("div",Te,[Be,e("div",Ne,[l(g,{editor:t.editor,modelValue:t.tempProduct.description,"onUpdate:modelValue":o[11]||(o[11]=s=>t.tempProduct.description=s),config:t.editorConfig},null,8,["editor","modelValue","config"])])]),e("div",Ae,[Re,e("div",Fe,[l(g,{editor:t.editor,modelValue:t.tempProduct.content,"onUpdate:modelValue":o[12]||(o[12]=s=>t.tempProduct.content=s),config:t.editorConfig},null,8,["editor","modelValue","config"])])]),e("div",Se,[e("div",je,[V(e("input",{id:"is_enabled","onUpdate:modelValue":o[13]||(o[13]=s=>t.tempProduct.is_enabled=s),class:"form-check-input",type:"checkbox","true-value":1,"false-value":0},null,512),[[F,t.tempProduct.is_enabled]]),He])])])])]),qe]),_:1},512)])])],512)}const ze=x(H,[["render",Oe]]),{VITE_URL:P,VITE_PATH:y}={VITE_URL:"https://vue3-course-api.hexschool.io/",VITE_PATH:"j437437",BASE_URL:"/BirdLab/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},Ge={data(){return{products:[],pagination:{},isNew:!1,tempProduct:{imagesUrl:[]},currentPage:1,isLoading:!1}},methods:{getData(i=1){this.isLoading=!0,this.currentPage=i;const o=`${P}v2/api/${y}/admin/products/?page=${i}`;this.$http.get(o).then(a=>{const{products:u,pagination:t}=a.data;this.products=u,this.pagination=t,this.isLoading=!1}).catch(a=>{this.isLoading=!1,b.fire({icon:"error",title:a.response.data.message})})},openProductModal(i,o){i?(this.tempProduct={},this.isNew=!0):(this.tempProduct={...o},this.isNew=!1),this.$refs.openModal.openModal()},updateItem(i){this.isLoading=!0,this.tempProduct=i;let o=`${P}v2/api/${y}/admin/product`,a="post";this.isNew||(a="put",o=`${P}v2/api/${y}/admin/product/${this.tempProduct.id}`),this.$http[a](o,{data:this.tempProduct}).then(()=>{this.isLoading=!1,b.fire({icon:"success",title:"產品更新成功",confirmButtonColor:"#31523f"}),this.getData(this.currentPage),this.$refs.openModal.hideModal()}).catch(u=>{this.isLoading=!1,b.fire({icon:"error",title:u.response.data.message})})},openDelProductModel(i){this.tempProduct={...i},this.$refs.deleteModal.openModal()},deleteItem(i){this.isLoading=!0;const o=`${P}v2/api/${y}/admin/product/${i.id}`;this.$http.delete(o).then(()=>{this.isLoading=!1,b.fire({icon:"success",title:"產品刪除成功",confirmButtonColor:"#31523f"}),this.$refs.deleteModal.hideModal(),this.getData(this.currentPage)}).catch(a=>{this.isLoading=!1,b.fire({icon:"error",title:a.response.data.message})})}},components:{PaginationEffect:I,ProductModal:ze,DeleteModal:B},mounted(){this.getData()}},Je={class:"container-fluid"},Ke={class:"row mb-3"},Qe={class:"d-flex justify-content-between align-items-center"},We=e("h3",{class:"mb-0"},"產品頁面",-1),Xe={class:"row"},Ye={class:"table-responsive table-scroll"},Ze={class:"table my-4 text-nowrap"},$e=e("thead",{class:"table-light"},[e("tr",null,[e("th",{scope:"col",width:"30%"},"產品名稱"),e("th",{scope:"col",width:"15%"},"分類"),e("th",{scope:"col",width:"10%",class:"text-end pe-5"},"原價"),e("th",{scope:"col",width:"10%",class:"text-end pe-5"},"售價"),e("th",{scope:"col",width:"15%"},"是否啟用"),e("th",{scope:"col",width:"20%",class:"text-end"},"編輯")])],-1),et={class:"text-end pe-5"},tt={class:"text-end pe-5"},ot={key:0,class:"text-success"},st={key:1},lt={class:"d-flex justify-content-end"},it=["onClick"],nt=["onClick"];function dt(i,o,a,u,t,r){const k=m("Loading-overlay"),p=m("PaginationEffect"),_=m("ProductModal"),g=m("DeleteModal");return n(),d(U,null,[e("div",Je,[l(k,{active:t.isLoading,"z-index":1e3},null,8,["active"]),e("div",Ke,[e("div",Qe,[We,e("div",null,[e("button",{type:"button",class:"btn btn-primary",onClick:o[0]||(o[0]=()=>r.openProductModal(!0))}," 建立新的產品 ")])])]),e("div",Xe,[e("div",Ye,[e("table",Ze,[$e,(n(!0),d(U,null,E(t.products,c=>(n(),d("tbody",{key:c.id},[t.products.length?(n(),d("tr",{key:0,class:h({"text-secondary":!c.is_enabled})},[e("td",null,v(c.title),1),e("td",null,v(c.category),1),e("td",et,v(i.$filters.currency(c.origin_price)),1),e("td",tt,v(i.$filters.currency(c.price)),1),e("td",null,[c.is_enabled?(n(),d("span",ot,"啟用")):(n(),d("span",st,"未啟用"))]),e("td",null,[e("div",lt,[e("button",{type:"button",class:"btn btn-outline-primary btn-sm",onClick:()=>r.openProductModal(!1,c)}," 編輯 ",8,it),e("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:()=>r.openDelProductModel(c)}," 刪除 ",8,nt)])])],2)):L("",!0)]))),128))]),l(p,{pages:t.pagination,onEmitPages:r.getData},null,8,["pages","onEmitPages"])])])]),l(_,{product:t.tempProduct,"is-new":t.isNew,"is-loading":t.isLoading,onEmitUpdateItem:r.updateItem,ref:"openModal"},null,8,["product","is-new","is-loading","onEmitUpdateItem"]),l(g,{item:t.tempProduct,"is-loading":t.isLoading,onUpdate:r.getData,onEmitDelete:r.deleteItem,ref:"deleteModal"},null,8,["item","is-loading","onUpdate","onEmitDelete"])],64)}const pt=x(Ge,[["render",dt]]);export{pt as default};
