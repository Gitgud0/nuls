webpackJsonp([4],{"0R/d":function(t,e,s){"use strict";s("wPKN"),s("QOif");var a={data:function(){return{}},mounted:function(){},methods:{codeMaker:function(t){$(".qrcode").html(""),$(".qrcode").qrcode({render:"canvas",width:256,height:256,text:t,typeNumber:-1,correctLevel:2,background:"#ffffff",foreground:"#000000"})},hideShow:function(){this.$emit("codeShowOks","false")}}},r={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"modal-overlay",on:{click:this.hideShow}},[this._m(0)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-data"},[e("div",{staticClass:"qrcode"})])}]};var n=s("vSla")(a,r,!1,function(t){s("I2l+")},null,null);e.a=n.exports},"I2l+":function(t,e){},Oq5A:function(t,e){},QHtk:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("6ROu"),r=s.n(a),n=s("0R/d"),o=s("+1pJ"),i=s("YgNb"),u=s("2tLR"),l={data:function(){return{loading:!0,accountAddressValue:localStorage.getItem("newAccountAddress"),accountData:[],dealList:[],activeName:sessionStorage.getItem("walletActiveName"),totalAll:0,pages:1,types:"",walletSetInterval:null}},components:{CodeBar:n.a,AccountAddressBar:o.a},created:function(){var t=this;this.getAccountAssets(this.accountAddressValue),"second"===this.activeName&&this.getAccountTxList(this.accountAddressValue,{pageSize:20,pageNumber:1}),this.walletSetInterval=setInterval(function(){"first"===t.activeName?t.getAccountAssets(t.accountAddressValue):""!==t.types?t.getAccountTxList(t.accountAddressValue,{type:t.types,pageSize:20,pageNumber:t.pages}):t.getAccountTxList(t.accountAddressValue,{pageSize:20,pageNumber:t.pages})},5e3)},destroyed:function(){clearInterval(this.walletSetInterval)},methods:{getAccountAssets:function(t){var e=this;Object(u.a)(t).then(function(t){if(t.success){for(var s=0;s<t.data.list.length;s++)t.data.list[s].balance=Object(i.a)(t.data.list[s].balance).toString(),t.data.list[s].locked=Object(i.a)(t.data.list[s].locked).toString(),t.data.list[s].usable=Object(i.a)(t.data.list[s].usable).toString();e.accountData=t.data.list}})},getAccountTxList:function(t,e){var s=this;Object(u.c)(t,e).then(function(t){if(t.success){for(var e=0;e<t.data.list.length;e++)t.data.list[e].time=r()(t.data.list[e].time).format("YYYY-MM-DD HH:mm:ss");s.totalAll=t.data.total,s.dealList=t.data.list,s.loading=!1}})},txIdConsensusSize:function(t){this.pages=t,""!==this.types?this.getAccountTxList(this.accountAddressValue,{type:this.types,pageSize:20,pageNumber:this.pages}):this.getAccountTxList(this.accountAddressValue,{pageSize:20,pageNumber:this.pages})},chenckAccountAddress:function(t){this.accountAddressValue=t,"first"===this.activeName?this.getAccountAssets(t):(this.totalAll=0,this.types="",this.getAccountTxList(t,{pageSize:20,pageNumber:1}))},changeType:function(t){var e=0;if(t.type[0])switch(parseInt(t.type[0])){case 9:e="7";break;default:e=t.type[0]}for(var s=document.getElementsByClassName("el-table-filter__list")[0].getElementsByTagName("li"),a=0;a<s.length;a++)s[a].className="el-table-filter__list-item";s[e].className="el-table-filter__list-item is-active",this.types=t.type[0],this.getAccountTxList(this.accountAddressValue,{type:t.type[0],pageSize:20,pageNumber:1})},handleClick:function(t,e){if("first"!==t.name){this.activeName="second";this.getAccountTxList(this.accountAddressValue,{pageSize:20,pageNumber:1})}else sessionStorage.setItem("walletActiveName",t.name),this.types="",this.pages=1,this.walletHide=!0,this.getAccountAssets(this.accountAddressValue)},accountCopy:function(){Object(i.b)(this.accountAddressValue),this.$message({message:this.$t("message.c129"),type:"success",duration:"800"})},accountChoice:function(){this.$router.push({name:"/userInfo"})},toTxid:function(t){sessionStorage.setItem("walletActiveName","second"),this.$router.push({name:"/dealInfo",params:{hash:t}})},toLocked:function(t){this.$router.push({name:"/freezeList",params:{address:t}})},toTransfer:function(t){this.$store.getters.getNetWorkInfo.localBestHeight===this.$store.getters.getNetWorkInfo.netBestHeight&&"true"===sessionStorage.getItem("setNodeNumberOk")?this.$router.push({name:"/transfer",params:{address:t}}):this.$message({message:this.$t("message.c133"),duration:"800"})}}},c={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wallet"},[s("div",{staticClass:"search"},[s("div",{staticClass:"account-top"},[s("label",[t._v(t._s(t.$t("message.indexAccountAddress"))+"：")]),t._v(" "),s("AccountAddressBar",{on:{chenckAccountAddress:t.chenckAccountAddress}})],1),t._v(" "),s("div",{staticClass:"wallet-i"},[s("i",{staticClass:"copy_icon copyBtn cursor-p",attrs:{"data-clipboard-text":this.accountAddressValue,title:t.$t("message.c143")},on:{click:t.accountCopy}}),t._v(" "),s("i",{staticClass:"zhanghu_icon fr cursor-p",attrs:{title:t.$t("message.accountManagement")},on:{click:t.accountChoice}})])]),t._v(" "),s("div",{staticClass:"wallet-tab cl"},[s("el-tabs",{on:{"tab-click":t.handleClick,dblclick:function(e){t.tab,t.clicks}},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[s("el-tab-pane",{attrs:{label:t.$t("message.indexAccountHome"),name:"first"}},[s("el-table",{attrs:{data:t.accountData}},[s("el-table-column",{attrs:{label:t.$t("message.indexProperty"),width:"100",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(e.row.asset))])]}}])}),t._v(" "),s("el-table-column",{attrs:{label:t.$t("message.indexSum"),width:"180",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(e.row.balance))])]}}])}),t._v(" "),s("el-table-column",{attrs:{label:t.$t("message.indexUsable"),width:"280",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(e.row.usable))])]}}])}),t._v(" "),s("el-table-column",{attrs:{label:t.$t("message.indexLock"),width:"280",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",{staticClass:"cursor-p text-d",on:{click:function(e){t.toLocked(t.accountAddressValue)}}},[t._v(t._s(e.row.locked))])]}}])}),t._v(" "),s("el-table-column",{attrs:{label:t.$t("message.operation"),align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",{staticClass:"cursor-p text-d",on:{click:function(e){t.toTransfer(t.accountAddressValue)}}},[t._v(t._s(t.$t("message.transfer")))])]}}])})],1)],1),t._v(" "),s("el-tab-pane",{attrs:{label:t.$t("message.transactionRecord"),name:"second"}},[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.dealList},on:{"filter-change":t.changeType}},[s("el-table-column",{attrs:{prop:"txType",label:t.$t("message.transactionType"),width:"120",align:"center","column-key":"type",filters:[{text:this.$t("message.type1"),value:"1"},{text:this.$t("message.type2"),value:"2"},{text:this.$t("message.type3"),value:"3"},{text:this.$t("message.type4"),value:"4"},{text:this.$t("message.type5"),value:"5"},{text:this.$t("message.type6"),value:"6"},{text:this.$t("message.type9"),value:"9"}],"filter-multiple":!1},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                "+t._s(t.$t("message.type"+e.row.txType))+"\n              ")]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"txid","min-width":"195",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",{staticClass:"cursor-p text-d overflow",on:{click:function(s){t.toTxid(e.row.txHash)}}},[t._v("\n\t\t\t\t\t\t\t\t\t"+t._s(e.row.txHash)+"\n\t\t\t\t\t\t\t\t")])]}}])}),t._v(" "),s("el-table-column",{attrs:{label:t.$t("message.time"),width:"145",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(e.row.time))])]}}])}),t._v(" "),s("el-table-column",{attrs:{label:t.$t("message.assetChange"),width:"138",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",{class:e.row.info>0?"add":"minus"},[t._v(t._s(e.row.info))])]}}])}),t._v(" "),s("el-table-column",{attrs:{label:t.$t("message.state"),width:"85",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(t.$t("message.statusS"+e.row.status)))])]}}])})],1),t._v(" "),s("el-pagination",{directives:[{name:"show",rawName:"v-show",value:t.totalAllOk=this.totalAll>20,expression:"totalAllOk = this.totalAll>20 ?true:false"}],staticClass:"cb",attrs:{layout:"prev, pager, next","page-size":20,total:this.totalAll},on:{"current-change":t.txIdConsensusSize}})],1)],1)],1)])},staticRenderFns:[]};var h=s("vSla")(l,c,!1,function(t){s("Oq5A")},null,null);e.default=h.exports},QOif:function(t,e){var s;(s=jQuery).fn.qrcode=function(t){var e;function a(t){this.mode=e,this.data=t}function r(t,e){this.typeNumber=t,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}function n(t,e){if(void 0==t.length)throw Error(t.length+"/"+e);for(var s=0;s<t.length&&0==t[s];)s++;this.num=Array(t.length-s+e);for(var a=0;a<t.length-s;a++)this.num[a]=t[a+s]}function o(t,e){this.totalCount=t,this.dataCount=e}function i(){this.buffer=[],this.length=0}a.prototype={getLength:function(){return this.data.length},write:function(t){for(var e=0;e<this.data.length;e++)t.put(this.data.charCodeAt(e),8)}},r.prototype={addData:function(t){this.dataList.push(new a(t)),this.dataCache=null},isDark:function(t,e){if(0>t||this.moduleCount<=t||0>e||this.moduleCount<=e)throw Error(t+","+e);return this.modules[t][e]},getModuleCount:function(){return this.moduleCount},make:function(){if(1>this.typeNumber){var t=1;for(t=1;40>t;t++){for(var e=o.getRSBlocks(t,this.errorCorrectLevel),s=new i,a=0,r=0;r<e.length;r++)a+=e[r].dataCount;for(r=0;r<this.dataList.length;r++)e=this.dataList[r],s.put(e.mode,4),s.put(e.getLength(),u.getLengthInBits(e.mode,t)),e.write(s);if(s.getLengthInBits()<=8*a)break}this.typeNumber=t}this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(t,e){this.moduleCount=4*this.typeNumber+17,this.modules=Array(this.moduleCount);for(var s=0;s<this.moduleCount;s++){this.modules[s]=Array(this.moduleCount);for(var a=0;a<this.moduleCount;a++)this.modules[s][a]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(t,e),7<=this.typeNumber&&this.setupTypeNumber(t),null==this.dataCache&&(this.dataCache=r.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,e)},setupPositionProbePattern:function(t,e){for(var s=-1;7>=s;s++)if(!(-1>=t+s||this.moduleCount<=t+s))for(var a=-1;7>=a;a++)-1>=e+a||this.moduleCount<=e+a||(this.modules[t+s][e+a]=0<=s&&6>=s&&(0==a||6==a)||0<=a&&6>=a&&(0==s||6==s)||2<=s&&4>=s&&2<=a&&4>=a)},getBestMaskPattern:function(){for(var t=0,e=0,s=0;8>s;s++){this.makeImpl(!0,s);var a=u.getLostPoint(this);(0==s||t>a)&&(t=a,e=s)}return e},createMovieClip:function(t,e,s){for(t=t.createEmptyMovieClip(e,s),this.make(),e=0;e<this.modules.length;e++){s=1*e;for(var a=0;a<this.modules[e].length;a++){var r=1*a;this.modules[e][a]&&(t.beginFill(0,100),t.moveTo(r,s),t.lineTo(r+1,s),t.lineTo(r+1,s+1),t.lineTo(r,s+1),t.endFill())}}return t},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=0==t%2);for(t=8;t<this.moduleCount-8;t++)null==this.modules[6][t]&&(this.modules[6][t]=0==t%2)},setupPositionAdjustPattern:function(){for(var t=u.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var s=0;s<t.length;s++){var a=t[e],r=t[s];if(null==this.modules[a][r])for(var n=-2;2>=n;n++)for(var o=-2;2>=o;o++)this.modules[a+n][r+o]=-2==n||2==n||-2==o||2==o||0==n&&0==o}},setupTypeNumber:function(t){for(var e=u.getBCHTypeNumber(this.typeNumber),s=0;18>s;s++){var a=!t&&1==(e>>s&1);this.modules[Math.floor(s/3)][s%3+this.moduleCount-8-3]=a}for(s=0;18>s;s++)a=!t&&1==(e>>s&1),this.modules[s%3+this.moduleCount-8-3][Math.floor(s/3)]=a},setupTypeInfo:function(t,e){for(var s=u.getBCHTypeInfo(this.errorCorrectLevel<<3|e),a=0;15>a;a++){var r=!t&&1==(s>>a&1);6>a?this.modules[a][8]=r:8>a?this.modules[a+1][8]=r:this.modules[this.moduleCount-15+a][8]=r}for(a=0;15>a;a++)r=!t&&1==(s>>a&1),8>a?this.modules[8][this.moduleCount-a-1]=r:9>a?this.modules[8][15-a-1+1]=r:this.modules[8][15-a-1]=r;this.modules[this.moduleCount-8][8]=!t},mapData:function(t,e){for(var s=-1,a=this.moduleCount-1,r=7,n=0,o=this.moduleCount-1;0<o;o-=2)for(6==o&&o--;;){for(var i=0;2>i;i++)if(null==this.modules[a][o-i]){var l=!1;n<t.length&&(l=1==(t[n]>>>r&1)),u.getMask(e,a,o-i)&&(l=!l),this.modules[a][o-i]=l,-1==--r&&(n++,r=7)}if(0>(a+=s)||this.moduleCount<=a){a-=s,s=-s;break}}}},r.PAD0=236,r.PAD1=17,r.createData=function(t,e,s){e=o.getRSBlocks(t,e);for(var a=new i,n=0;n<s.length;n++){var l=s[n];a.put(l.mode,4),a.put(l.getLength(),u.getLengthInBits(l.mode,t)),l.write(a)}for(n=t=0;n<e.length;n++)t+=e[n].dataCount;if(a.getLengthInBits()>8*t)throw Error("code length overflow. ("+a.getLengthInBits()+">"+8*t+")");for(a.getLengthInBits()+4<=8*t&&a.put(0,4);0!=a.getLengthInBits()%8;)a.putBit(!1);for(;!(a.getLengthInBits()>=8*t||(a.put(r.PAD0,8),a.getLengthInBits()>=8*t));)a.put(r.PAD1,8);return r.createBytes(a,e)},r.createBytes=function(t,e){for(var s=0,a=0,r=0,o=Array(e.length),i=Array(e.length),l=0;l<e.length;l++){var c=e[l].dataCount,h=e[l].totalCount-c;a=Math.max(a,c),r=Math.max(r,h),o[l]=Array(c);for(var d=0;d<o[l].length;d++)o[l][d]=255&t.buffer[d+s];for(s+=c,d=u.getErrorCorrectPolynomial(h),c=new n(o[l],d.getLength()-1).mod(d),i[l]=Array(d.getLength()-1),d=0;d<i[l].length;d++)h=d+c.getLength()-i[l].length,i[l][d]=0<=h?c.get(h):0}for(d=l=0;d<e.length;d++)l+=e[d].totalCount;for(s=Array(l),d=c=0;d<a;d++)for(l=0;l<e.length;l++)d<o[l].length&&(s[c++]=o[l][d]);for(d=0;d<r;d++)for(l=0;l<e.length;l++)d<i[l].length&&(s[c++]=i[l][d]);return s},e=4;for(var u={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){for(var e=t<<10;0<=u.getBCHDigit(e)-u.getBCHDigit(u.G15);)e^=u.G15<<u.getBCHDigit(e)-u.getBCHDigit(u.G15);return(t<<10|e)^u.G15_MASK},getBCHTypeNumber:function(t){for(var e=t<<12;0<=u.getBCHDigit(e)-u.getBCHDigit(u.G18);)e^=u.G18<<u.getBCHDigit(e)-u.getBCHDigit(u.G18);return t<<12|e},getBCHDigit:function(t){for(var e=0;0!=t;)e++,t>>>=1;return e},getPatternPosition:function(t){return u.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,s){switch(t){case 0:return 0==(e+s)%2;case 1:return 0==e%2;case 2:return 0==s%3;case 3:return 0==(e+s)%3;case 4:return 0==(Math.floor(e/2)+Math.floor(s/3))%2;case 5:return 0==e*s%2+e*s%3;case 6:return 0==(e*s%2+e*s%3)%2;case 7:return 0==(e*s%3+(e+s)%2)%2;default:throw Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new n([1],0),s=0;s<t;s++)e=e.multiply(new n([1,l.gexp(s)],0));return e},getLengthInBits:function(t,s){if(1<=s&&10>s)switch(t){case 1:return 10;case 2:return 9;case e:case 8:return 8;default:throw Error("mode:"+t)}else if(27>s)switch(t){case 1:return 12;case 2:return 11;case e:return 16;case 8:return 10;default:throw Error("mode:"+t)}else{if(!(41>s))throw Error("type:"+s);switch(t){case 1:return 14;case 2:return 13;case e:return 16;case 8:return 12;default:throw Error("mode:"+t)}}},getLostPoint:function(t){for(var e=t.getModuleCount(),s=0,a=0;a<e;a++)for(var r=0;r<e;r++){for(var n=0,o=t.isDark(a,r),i=-1;1>=i;i++)if(!(0>a+i||e<=a+i))for(var u=-1;1>=u;u++)0>r+u||e<=r+u||0==i&&0==u||o==t.isDark(a+i,r+u)&&n++;5<n&&(s+=3+n-5)}for(a=0;a<e-1;a++)for(r=0;r<e-1;r++)n=0,t.isDark(a,r)&&n++,t.isDark(a+1,r)&&n++,t.isDark(a,r+1)&&n++,t.isDark(a+1,r+1)&&n++,(0==n||4==n)&&(s+=3);for(a=0;a<e;a++)for(r=0;r<e-6;r++)t.isDark(a,r)&&!t.isDark(a,r+1)&&t.isDark(a,r+2)&&t.isDark(a,r+3)&&t.isDark(a,r+4)&&!t.isDark(a,r+5)&&t.isDark(a,r+6)&&(s+=40);for(r=0;r<e;r++)for(a=0;a<e-6;a++)t.isDark(a,r)&&!t.isDark(a+1,r)&&t.isDark(a+2,r)&&t.isDark(a+3,r)&&t.isDark(a+4,r)&&!t.isDark(a+5,r)&&t.isDark(a+6,r)&&(s+=40);for(r=n=0;r<e;r++)for(a=0;a<e;a++)t.isDark(a,r)&&n++;return s+10*(t=Math.abs(100*n/e/e-50)/5)}},l={glog:function(t){if(1>t)throw Error("glog("+t+")");return l.LOG_TABLE[t]},gexp:function(t){for(;0>t;)t+=255;for(;256<=t;)t-=255;return l.EXP_TABLE[t]},EXP_TABLE:Array(256),LOG_TABLE:Array(256)},c=0;8>c;c++)l.EXP_TABLE[c]=1<<c;for(c=8;256>c;c++)l.EXP_TABLE[c]=l.EXP_TABLE[c-4]^l.EXP_TABLE[c-5]^l.EXP_TABLE[c-6]^l.EXP_TABLE[c-8];for(c=0;255>c;c++)l.LOG_TABLE[l.EXP_TABLE[c]]=c;return n.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=Array(this.getLength()+t.getLength()-1),s=0;s<this.getLength();s++)for(var a=0;a<t.getLength();a++)e[s+a]^=l.gexp(l.glog(this.get(s))+l.glog(t.get(a)));return new n(e,0)},mod:function(t){if(0>this.getLength()-t.getLength())return this;for(var e=l.glog(this.get(0))-l.glog(t.get(0)),s=Array(this.getLength()),a=0;a<this.getLength();a++)s[a]=this.get(a);for(a=0;a<t.getLength();a++)s[a]^=l.gexp(l.glog(t.get(a))+e);return new n(s,0).mod(t)}},o.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],o.getRSBlocks=function(t,e){var s=o.getRsBlockTable(t,e);if(void 0==s)throw Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+e);for(var a=s.length/3,r=[],n=0;n<a;n++)for(var i=s[3*n+0],u=s[3*n+1],l=s[3*n+2],c=0;c<i;c++)r.push(new o(u,l));return r},o.getRsBlockTable=function(t,e){switch(e){case 1:return o.RS_BLOCK_TABLE[4*(t-1)+0];case 0:return o.RS_BLOCK_TABLE[4*(t-1)+1];case 3:return o.RS_BLOCK_TABLE[4*(t-1)+2];case 2:return o.RS_BLOCK_TABLE[4*(t-1)+3]}},i.prototype={get:function(t){return 1==(this.buffer[Math.floor(t/8)]>>>7-t%8&1)},put:function(t,e){for(var s=0;s<e;s++)this.putBit(1==(t>>>e-s-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},"string"==typeof t&&(t={text:t}),t=s.extend({},{render:"canvas",width:256,height:256,typeNumber:-1,correctLevel:2,background:"#ffffff",foreground:"#000000"},t),this.each(function(){var e;if("canvas"==t.render){(e=new r(t.typeNumber,t.correctLevel)).addData(t.text),e.make();var a=document.createElement("canvas");a.width=t.width,a.height=t.height;for(var n=a.getContext("2d"),o=t.width/e.getModuleCount(),i=t.height/e.getModuleCount(),u=0;u<e.getModuleCount();u++)for(var l=0;l<e.getModuleCount();l++){n.fillStyle=e.isDark(u,l)?t.foreground:t.background;var c=Math.ceil((l+1)*o)-Math.floor(l*o),h=Math.ceil((u+1)*o)-Math.floor(u*o);n.fillRect(Math.round(l*o),Math.round(u*i),c,h)}}else for((e=new r(t.typeNumber,t.correctLevel)).addData(t.text),e.make(),a=s("<table></table>").css("width",t.width+"px").css("height",t.height+"px").css("border","0px").css("border-collapse","collapse").css("background-color",t.background),n=t.width/e.getModuleCount(),o=t.height/e.getModuleCount(),i=0;i<e.getModuleCount();i++)for(u=s("<tr></tr>").css("height",o+"px").appendTo(a),l=0;l<e.getModuleCount();l++)s("<td></td>").css("width",n+"px").css("background-color",e.isDark(i,l)?t.foreground:t.background).appendTo(u);e=a,jQuery(e).appendTo(this)})}}});