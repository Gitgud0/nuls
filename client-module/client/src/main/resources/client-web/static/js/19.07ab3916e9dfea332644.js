webpackJsonp([19],{"55WF":function(e,s){},ANj2:function(e,s,r){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var t=r("LPk9"),a=r("+1pJ"),o=r("FJop"),n=r("x47x"),i=r("YgNb");var c={data:function(){var e=this;return{selectAddress:localStorage.getItem("newAccountAddress"),submitId:"transferSubmit",usable:this.$route.query.balance,fee:0,maxAmount:0,maxlengths:"NULS"===this.$route.query.asset?17:78,transferForm:{address:this.selectAddress,joinAddress:"",joinNo:"",gas:"",price:"",remark:""},transferRules:{selectAddress:[{validator:function(s,r,t){r?t():t(new Error(e.$t("message.addressNull")))},trigger:"blur"}],joinAddress:[{validator:function(s,r,t){r?r.length<20||r.length>35?t(new Error(e.$t("message.c168"))):r===e.selectAddress?t(new Error(e.$t("message.addressOrTransfer"))):setTimeout(function(){e.isContractAddress&&"NULS"===e.$route.query.asset?e.isPayable?t():t(new Error(e.$t("message.c258"))):t()},500):t(new Error(e.$t("message.transferNull")))},trigger:"blur"}],joinNo:[{validator:function(s,r,t){if(r)if(r<e.fee)t(new Error(e.$t("message.transferNO3")));else if(parseFloat(r)>parseFloat(e.usable))t(new Error(e.$t("message.c107")));else if(e.seniorIf){var a=e.$route.query.decimals||8;new RegExp("^(([1-9]{1}\\d*)|(0{1}))(\\.\\d{0,"+a+"})?$").test(r)?t():t(new Error(e.$t("message.c1361")+a))}else setTimeout(function(){/^[+-]?\d+(?:\.\d{1,8})?$/.test(r)?Object(i.e)(e.transferForm.joinNo).toString()===Object(i.e)(e.usable).toString()?e.transferForm.joinNo=Object(i.b)(Object(i.c)(Object(i.e)(e.usable),Object(i.e)(e.fee))).toString():parseInt(Object(i.e)(r).toString())>e.maxAmount&&!e.seniorIf?t(new Error(e.$t("message.c202")+Object(i.b)(e.maxAmount).toString())):t():t(new Error(e.$t("message.c136")))},100);else t(new Error(e.$t("message.transferNO")))},trigger:"blur"}],gas:[{validator:function(s,r,t){r?r<1||r>1e7?t(new Error(e.$t("message.c204"))):t():t(new Error(e.$t("message.c204")))},trigger:"blur"}],price:[{validator:function(s,r,t){r?r<1?t(new Error(e.$t("message.c205"))):t():t(new Error(e.$t("message.c205")))},trigger:"blur"}]},outAddressIf:!0,seniorIf:!1,decimalsNo:0,systemGas:0,callSeniorValue:!1,isContractAddress:!1,isPayable:!1,userAddressList:[],dialogTableVisible:!1}},components:{Back:t.a,AccountAddressBar:a.a,Password:o.a},created:function(){this.decimalsNo=Object(i.d)(this.$route.query.decimals),this.$route.query.address&&(this.seniorIf=!0,this.outAddressIf=!1)},methods:{getBalanceAddress:function(e){var s=this;this.$fetch(e).then(function(e){e.success&&(s.usable=Object(i.b)(e.data.usable.value).toString())})},chenckAccountAddress:function(e){this.selectAddress=e,localStorage.setItem("newAccountAddress",this.selectAddress),this.getBalanceAddress("/accountledger/balance/"+e),this.$refs.transferForm.validateField("joinAddress"),this.$refs.transferForm.validateField("joinNo"),this.countFee()},accountCopy:function(){Object(i.h)(this.selectAddress),this.$message({message:this.$t("message.c129"),type:"success",duration:"800"})},toUsersAddressList:function(){var e=this;if(this.dialogTableVisible=!0,"indexedDB"in window){var s={dbName:"usersDB",dbVersion:1,dbInstance:{}},r=window.indexedDB.open(s.dbName,s.dbVersion);r.onupgradeneeded=function(e){var s=e.target.result;s.objectStoreNames.contains("addressList")||s.createObjectStore("addressList",{keyPath:"userAddress",autoIncrement:!1})},r.onsuccess=function(s){var r=[];event.target.result.transaction(["addressList"],"readonly").objectStore("addressList").openCursor().onsuccess=function(s){var t=s.target.result;t&&(r.push(t.value),t.continue()),setTimeout(function(){e.userAddressList=r},50)}},r.onerror=function(e){console.log("数据库打开失败..."),console.dir(e)}}else console.log("对不起，您的浏览器不支持indexedDB，建议您使用google浏览器")},checkedAddress:function(e){this.transferForm.joinAddress=e,this.$refs.transferForm.validateField("joinAddress"),this.dialogTableVisible=!1},dbcheckedAddress:function(e,s){this.transferForm.joinAddress=e.userAddress,this.dialogTableVisible=!1},ifContractAddres:function(){var e=this;this.$fetch("/contract/"+this.transferForm.joinAddress).then(function(s){console.log(s),s.success&&(s.data.isContractAddress?(e.isContractAddress=s.data.isContractAddress,e.isPayable=s.data.isPayable,e.transferForm.gas="",e.transferForm.price="",e.seniorIf=!0):(e.transferForm.gas="1",e.transferForm.price="1"))})},countFee:function(){var e=this,s=this;if(this.seniorIf){if(""!==this.transferForm.joinAddress&&this.transferForm.joinNo>0){var r=new n.BigNumber(this.transferForm.joinNo),t="";if(this.seniorIf&&this.outAddressIf)t='{"sender":"'+this.selectAddress+'","contractAddress":"'+this.transferForm.joinAddress+'","value":"'+r.times(this.decimalsNo).toString()+'","methodName":"_payable","methodDesc":"() return void","price":1}',setTimeout(function(){var s='{"address":"'+e.selectAddress+'","toAddress":"'+e.transferForm.joinAddress+'","gasLimit":"'+e.transferForm.gas+'","price":"'+e.transferForm.price+'","amount":"'+Object(i.e)(e.transferForm.joinNo).toString()+'","remark":"'+Object(i.k)(e.transferForm.remark)+'"}';e.$post("/contract/transfer/fee",s).then(function(s){s.success&&(e.fee=Object(i.b)(s.data.fee).toString(),e.maxAmount=s.data.maxAmount)})},500);else{var a=new n.BigNumber(r.times(this.decimalsNo).toString());t='{"sender":"'+this.selectAddress+'","contractAddress":"'+this.$route.query.address+'","value":0,"methodName":"transfer","methodDesc":"","price":1,"args":["'+this.transferForm.joinAddress+'","'+a.toFormat().replace(/[,]/g,"")+'"]}'}var o='{"sender":"'+localStorage.getItem("newAccountAddress")+'"}';this.$post("/contract/imputedgas/call",t).then(function(r){r.success?(e.systemGas=r.data.gasLimit,e.transferForm.gas=r.data.gasLimit,s.$post("/contract/imputedprice",o).then(function(s){s.success?e.transferForm.price=s.data:(e.systemGas="",e.transferForm.gas="",e.transferForm.price="",console.log("估算price失败"))})):(e.systemGas="",e.transferForm.gas="",e.transferForm.price="",console.log("估算gas失败"))})}}else if(""!==this.transferForm.joinAddress&&this.transferForm.joinNo>0){var c="address="+this.selectAddress+"&toAddress="+this.transferForm.joinAddress+"&amount="+Object(i.e)(this.transferForm.joinNo).toString()+"&remark="+Object(i.k)(this.transferForm.remark);this.$fetch("/accountledger/transfer/fee?"+c).then(function(s){s.success&&(e.fee=Object(i.b)(s.data.fee).toString(),e.maxAmount=s.data.maxAmount)})}},zeroToWhole:function(){this.$router.push({name:"zeroToWhole"})},transferSubmit:function(e){var s=this;this.$refs[e].validate(function(e){if(!e)return!1;"true"===localStorage.getItem("encrypted")?s.$refs.password.showPassword(!0):s.$confirm(s.$t("message.c172"),"",{confirmButtonText:s.$t("message.confirmButtonText"),cancelButtonText:s.$t("message.cancelButtonText")}).then(function(){s.toSubmit("")}).catch(function(){console.log("")})})},toSubmit:function(e){var s=this,r=new n.BigNumber(1e8),t="",a="";if(this.seniorIf){var o=new n.BigNumber(this.transferForm.joinNo);if(this.$route.query.address){var c=new n.BigNumber(o.times(this.decimalsNo).toString());t="/contract/call",a='{"sender":"'+this.selectAddress+'","gasLimit":'+this.transferForm.gas+',"price":'+this.transferForm.price+',"password":"'+e+'","remark":"'+Object(i.k)(this.transferForm.remark)+'","contractAddress":"'+this.$route.query.address+'","value":0,"methodName":"transfer","methodDesc":"","args":["'+this.transferForm.joinAddress+'","'+c.toFormat().replace(/[,]/g,"")+'"]}'}else t="/contract/transfer",a='{"address":"'+this.selectAddress+'","toAddress":"'+this.transferForm.joinAddress+'","gasLimit":'+this.transferForm.gas+',"price":'+this.transferForm.price+',"password":"'+e+'","amount":"'+r.times(this.transferForm.joinNo)+'","remark":"'+Object(i.k)(this.transferForm.remark)+'"}'}else t="/accountledger/transfer",a='{"address":"'+this.selectAddress+'","toAddress":"'+this.transferForm.joinAddress+'","amount":'+r.times(this.transferForm.joinNo)+',"password":"'+e+'","remark":"'+Object(i.k)(this.transferForm.remark)+'"}';this.$post(t,a).then(function(e){e.success?(s.$message({message:s.$t("message.passWordSuccess"),type:"success"}),s.transferForm.joinAddress="",s.transferForm.joinNo="",s.transferForm.remark="",s.getBalanceAddress("/accountledger/balance/"+s.transferForm.address),sessionStorage.setItem("walletActiveName","second"),s.$router.push({name:"/wallet"})):s.$message({message:s.$t("message.passWordFailed")+e.data.msg,type:"warning"})})}}},d={render:function(){var e=this,s=e.$createElement,r=e._self._c||s;return r("div",{staticClass:"transfer"},[r("Back",{attrs:{backTitle:this.$t("message.walletManagement")}}),e._v(" "),r("div",{staticClass:"transfer-info"},[r("h2",[e._v(e._s(this.$route.query.asset)+" "+e._s(e.$t("message.transfer")))]),e._v(" "),r("el-form",{ref:"transferForm",attrs:{model:e.transferForm,rules:e.transferRules}},[r("el-form-item",{staticClass:"out-address",attrs:{label:e.$t("message.sourceAddress")+"："}},[r("AccountAddressBar",{directives:[{name:"show",rawName:"v-show",value:e.outAddressIf,expression:"outAddressIf"}],on:{chenckAccountAddress:e.chenckAccountAddress}}),e._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:e.seniorIf&&!e.outAddressIf,expression:"seniorIf && !outAddressIf"}],staticClass:"contract-address"},[e._v(e._s(this.selectAddress))]),e._v(" "),r("i",{staticClass:"copy_icon copyBtn cursor-p",on:{click:e.accountCopy}})],1),e._v(" "),r("el-form-item",{attrs:{label:e.$t("message.destinationAddress")+"：",prop:"joinAddress"}},[r("el-input",{ref:"joinAddress",attrs:{type:"text"},on:{change:e.ifContractAddres},model:{value:e.transferForm.joinAddress,callback:function(s){e.$set(e.transferForm,"joinAddress","string"==typeof s?s.trim():s)},expression:"transferForm.joinAddress"}}),e._v(" "),r("i",{staticClass:"cursor-p icons",on:{click:e.toUsersAddressList}})],1),e._v(" "),r("el-form-item",{attrs:{label:e.$t("message.transferAmount")+"：",prop:"joinNo"}},[r("span",{staticClass:"allUsable"},[e._v(e._s(e.$t("message.currentBalance"))+": "+e._s(e.usable)+" "+e._s(this.$route.query.asset))]),e._v(" "),r("el-input",{attrs:{type:"text",maxlength:this.maxlengths},on:{change:e.countFee},model:{value:e.transferForm.joinNo,callback:function(s){e.$set(e.transferForm,"joinNo",s)},expression:"transferForm.joinNo"}})],1),e._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:e.seniorIf,expression:"seniorIf"}],staticClass:"contract-t"},[r("div",{staticClass:"call-senior"},[e._v("\n          "+e._s(e.$t("message.c203"))+"\n          "),r("el-switch",{attrs:{width:35},model:{value:e.callSeniorValue,callback:function(s){e.callSeniorValue=s},expression:"callSeniorValue"}})],1),e._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:this.callSeniorValue,expression:"this.callSeniorValue"}],staticClass:"seniorInfo"},[r("el-form-item",{attrs:{label:"Gas Limit",prop:"gas"}},[r("el-input",{attrs:{onkeyup:"value=value.replace(/[^\\d]/g,'')"},model:{value:e.transferForm.gas,callback:function(s){e.$set(e.transferForm,"gas",s)},expression:"transferForm.gas"}}),e._v(" "),r("p",{directives:[{name:"show",rawName:"v-show",value:this.transferForm.gas<this.systemGas&&this.transferForm.gas>1,expression:"this.transferForm.gas < this.systemGas && this.transferForm.gas > 1"}],staticClass:"price-min"},[e._v("\n              "+e._s(e.$t("message.c206")))])],1),e._v(" "),r("el-form-item",{attrs:{label:"Price",prop:"price"}},[r("el-input",{attrs:{onkeyup:"value=value.replace(/[^\\d]/g,'')"},model:{value:e.transferForm.price,callback:function(s){e.$set(e.transferForm,"price",s)},expression:"transferForm.price"}})],1)],1)]),e._v(" "),r("el-form-item",{attrs:{label:e.$t("message.remarks")+"："}},[r("el-input",{attrs:{type:"textarea",maxlength:30},on:{change:e.countFee},model:{value:e.transferForm.remark,callback:function(s){e.$set(e.transferForm,"remark","string"==typeof s?s.trim():s)},expression:"transferForm.remark"}})],1),e._v(" "),r("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.outAddressIf,expression:"outAddressIf"}],attrs:{label:e.$t("message.c28")+": "+this.fee+" NULS"}},[r("h5",[e._v(e._s(e.$t("message.zeroToWhole1"))+" "),r("span",{staticClass:"cursor-p text-ds",on:{click:e.zeroToWhole}},[e._v(e._s(e.$t("message.type51")))])])]),e._v(" "),r("el-form-item",{staticClass:"transfer-submit"},[r("el-button",{attrs:{type:"primary",id:"transferSubmit"},on:{click:function(s){e.transferSubmit("transferForm")}}},[e._v("\n          "+e._s(e.$t("message.c114"))+"\n        ")])],1)],1),e._v(" "),r("el-dialog",{staticClass:"transfer-dialog",attrs:{visible:e.dialogTableVisible},on:{"update:visible":function(s){e.dialogTableVisible=s}}},[r("el-table",{attrs:{data:e.userAddressList},on:{"row-dblclick":e.dbcheckedAddress}},[r("el-table-column",{attrs:{property:"userAddress",label:e.$t("message.tabName"),"min-width":"280",align:"center"}}),e._v(" "),r("el-table-column",{attrs:{property:"userHelp",label:e.$t("message.remarks"),width:"110",align:"center"}}),e._v(" "),r("el-table-column",{attrs:{label:e.$t("message.operation"),width:"100",align:"center"},scopedSlots:e._u([{key:"default",fn:function(s){return[r("span",{staticClass:"cursor-p text-d",on:{click:function(r){e.checkedAddress(s.row.userAddress)}}},[e._v(e._s(e.$t("message.select")))])]}}])})],1)],1),e._v(" "),r("Password",{ref:"password",attrs:{submitId:e.submitId},on:{toSubmit:e.toSubmit}})],1)],1)},staticRenderFns:[]};var l=r("vSla")(c,d,!1,function(e){r("55WF")},null,null);s.default=l.exports}});