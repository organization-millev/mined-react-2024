var jwLiveChannelSetup=function(){
var e,t,n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)};function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}function i(e,t,n,r){return new(n||(n=Promise))((function(i,o){function a(e){try{s(r.next(e))}catch(e){o(e)}}function l(e){try{s(r.throw(e))}catch(e){o(e)}}function s(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,l)}s((r=r.apply(e,t||[])).next())}))}function o(e,t){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function l(o){return function(l){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,r=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(i=a.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=t.call(e,a)}catch(e){o=[6,e],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,l])}}}!function(e){e.TEXT="text",e.IMAGE="image",e.MEDIA="media"}(e||(e={})),function(e){e.FALSE="false",e.TRUE="true",e.VIEWABLE="true"}(t||(t={}));var a=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),t}(Error);var l=function(e){function t(n,r,i){var o=e.call(this,i)||this;return o.url=n,o.status=r,o.statusText=i,Object.setPrototypeOf(o,t.prototype),o}return r(t,e),t}(Error);function s(e,t){return i(this,void 0,void 0,(function(){var n;return o(this,(function(r){switch(r.label){case 0:return[4,fetch(e,t)];case 1:if(!(n=r.sent()).ok)throw new l(e,n.status,n.statusText);return[2,n.json()]}}))}))}function c(){try{var e=window.crypto||window.msCrypto;if(e&&e.getRandomValues)return e.getRandomValues(new Uint32Array(1))[0].toString(36)}catch(e){}return Math.random().toString(36).slice(2,9)}function d(){return"undefined"!=typeof jwplayer}var h,u=function(){function e(e){this.baseUrl=e||"https://cdn.jwplayer.com"}return e.prototype.getChannelStatus=function(e){return s(this.baseUrl+"/live/channels/"+e+".json")},e.prototype.getPlaylist=function(e,t){var n=this.baseUrl+"/v2/media/"+e;return t&&(n+="?ssai=true"),s(n,{cache:"no-cache"})},e.prototype.getLiveManifestUrl=function(e){return this.baseUrl+"/live/events/"+e+".m3u8"},e}();!function(e){e.IDLE="idle",e.PLAYING="playing",e.ERROR="error"}(h||(h={}));var p=function(){function t(t,n){this.type=e.TEXT,this.config=t,this.placeholderContainer=n,this.contentContainer=document.createElement("div"),this.contentContainer.classList.add("jw-live-placeholder-content"),this.placeholderContainer.appendChild(this.contentContainer),this.placeholderContainer.classList.add("jw-embed-text-placeholder"),this.liveIcon=document.createElement("div"),this.liveIcon.classList.add("jw-live-icon");var r=document.createElement("div");r.classList.add("jw-live-icon-text"),r.textContent="LIVE",this.liveIcon.appendChild(r),this.contentContainer.appendChild(this.liveIcon),this.captionElement=document.createElement("div"),this.captionElement.classList.add("jw-status-message"),this.contentContainer.appendChild(this.captionElement),t.caption?this.setCaption(t.caption):this.setCaption("Waiting for live event to start...")}return t.prototype.setState=function(){},t.prototype.setCaption=function(e){this.captionElement.textContent=e},t}(),m=function(){function e(e,t,n){this.config=e,this.element=n,t.appendChild(this.element)}return e.prototype.setState=function(e){},e.prototype.destroy=function(){},e}(),f=function(t){function n(n,r,i){var o=t.call(this,n,r,document.createElement("img"))||this;return o.type=e.IMAGE,o.onError=i,o}return r(n,t),n.prototype.setState=function(e){e===h.IDLE&&this.setup()},n.prototype.setup=function(){var e=this,t=this.config,n=t.mediaId,r=t.url,i=this.element;n?fetch("https://cdn.jwplayer.com/v2/media/"+n).then((function(e){return e.json()})).then((function(t){var n=t.playlist,r=n&&n.length&&n[0].image;if(!r)throw new Error("Fallback image not found");e.element.setAttribute("src",r)})).catch(this.onError):r&&i.setAttribute("src",r),i.classList.add("jw-embed-image-placeholder")},n.prototype.destroy=function(){var e;null===(e=this.element.parentElement)||void 0===e||e.removeChild(this.element)},n}(m),w=function(t){function n(n,r,i){var o=t.call(this,n,r,document.createElement("div"))||this;o.type=e.MEDIA,o.onError=i;for(var a=0;document.getElementById("jw-embed-placeholder-media-"+a);)a++;return o.element.id="jw-embed-placeholder-media-"+a,o.element.classList.add("jw-embed-placeholder-media"),o}return r(n,t),n.prototype.setState=function(e){e===h.IDLE?this.setupPlayer():this.removePlayer()},n.prototype.setupPlayer=function(){var e=this;if(!this.player){var t=this.config,n=t.mediaId,r=t.url;n?fetch("https://cdn.jwplayer.com/v2/media/"+n).then((function(e){return e.json()})).then((function(t){e.player=jwplayer(e.element.id).setup(t).on("setupError",e.onError).on("error",e.onError)})).catch(this.onError):r&&(this.player=jwplayer(this.element.id).setup({file:r}))}},n.prototype.removePlayer=function(){this.player&&(this.player.remove(),this.player=null)},n.prototype.destroy=function(){var e;this.removePlayer(),null===(e=this.element.parentElement)||void 0===e||e.removeChild(this.element)},n}(m),y=function(){function e(e){var t;this.errorContainer=e,this.contentContainer=document.createElement("div"),this.contentContainer.classList.add("jw-live-error-content"),this.errorContainer.appendChild(this.contentContainer),this.errorIcon=document.createElement("div"),this.errorIcon.classList.add("jw-error-icon"),this.errorIcon.appendChild((t='\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" id="ds-icon-player-playback-error">\n<path d="M34.6 20.2L10 33.2 27.6 16l7 3.7a.4.4 0 0 1 .2.5.4.4 0 0 1-.2.2zM33.3 0L21 12.2 9 6c-.2-.3-.6 0-.6.5V25L0 33.6 2.5 36 36 2.7z"/>\n</svg>',(new DOMParser).parseFromString(t,"image/svg+xml").documentElement)),this.contentContainer.appendChild(this.errorIcon),this.captionElement=document.createElement("div"),this.captionElement.classList.add("jw-status-message"),this.contentContainer.appendChild(this.captionElement),this.subtextElement=document.createElement("div"),this.subtextElement.classList.add("jw-status-subtext"),this.contentContainer.appendChild(this.subtextElement),this.setError()}return e.prototype.setError=function(e,t){this.captionElement.textContent=e||"An error occurred. Please try again later.",this.subtextElement.textContent=t||""},e}(),v={width:"100%",height:"auto",aspectratio:"16:9"};var b=function(){function e(e,t,n,r,i,o){this._embedContainer=e,this._embedDimensions=Object.assign(v,t),this._errorView=n,this._playerContainer=r,this._placeholderContainer=i,this.placeholderView=o,this.injectStyles()}return e.prototype.setState=function(e){var t=this;this._state!==e&&(this._state=e,this.placeholderView&&this.placeholderView.setState(e),Array.prototype.slice.call(this._embedContainer.classList).filter((function(e){return 0===e.indexOf("jw-embed-state-")})).forEach((function(e){t._embedContainer.classList.remove(e)})),e===h.IDLE?this._embedContainer.classList.add("jw-embed-state-idle"):e===h.PLAYING?this._embedContainer.classList.add("jw-embed-state-playing"):e===h.ERROR&&this._embedContainer.classList.add("jw-embed-state-error"))},e.prototype.injectStyles=function(){var e=document.getElementById("jw-channel-embed-styles");e||((e=document.createElement("style")).innerHTML='\n        \n.jw-live-placeholder,\n.jw-live-error {\n  font-family: Arial, sans-serif;\n}\n\n.jw-embed-text-placeholder,\n.jw-embed-image-placeholder,\n.jw-live-error {\n  background-color: #000;\n  display: flex;\n  justify-content: center;\n}\n\n.jw-live-placeholder-content,\n.jw-live-error-content,\n.jw-error-icon {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n}\n\n.jw-embed-text-placeholder .jw-status-message,\n.jw-embed-image-placeholder .jw-status-message,\n.jw-live-error .jw-status-message {\n  color: #fff;\n  font-size: 1.0em;\n}\n\n.jw-live-error .jw-status-subtext {\n  color: #fff;\n  opacity: 0.8;\n  font-size: 0.8em;\n  margin: 1em;\n}\n\n.jw-error-icon {\n  color: #fff;\n  fill: currentColor;\n  width: 36px;\n  height: 36px;\n  margin: 2em;\n}\n\n.jw-live-placeholder .jw-live-icon {\n  display: flex;\n  align-items: center;\n  color: #fff;\n  border: solid 2px #fff;\n  font-size: 0.8em;\n  font-weight: 600;\n  padding-left: 1em;\n  padding-right: 1em;\n  height: 2em;\n  margin-left: 1em;\n  margin-right: 1em;\n  margin-bottom: 2em;\n}\n\n.jw-live-placeholder .jw-live-icon .jw-live-icon-text {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.jw-live-placeholder .jw-live-icon-text::before {\n  background-color: #eb0343;\n  margin-right: 6px;\n  content: "";\n  width: 0.8em;\n  height: 0.8em;\n  border-radius: 50%;\n  animation-duration: 3s;\n  animation-name: blink;\n  animation-direction: alternate;\n  animation-iteration-count: infinite;\n}\n\n@keyframes blink {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0.5;\n  }\n}\n\n.jw-embed-image-placeholder {\n  object-fit: contain;\n}\n\n/* Hide image placeholders when playing and hide the player when the embed is in the idle state. */\n.jw-embed-state-playing > .jw-live-placeholder,\n.jw-embed-state-idle > .jw-live-error,\n.jw-embed-state-playing > .jw-live-error,\n.jw-embed-state-idle > .jwplayer,\n.jw-embed-state-idle > .jwplayer.jw-state-error,\n.jw-embed-state-error > .jwplayer,\n.jw-embed-state-error > .jw-live-placeholder {\n  display: none;\n}\n\n        '+this.getPlaceholderDimensionStyles()+"\n        ",document.head.appendChild(e))},e.prototype.getPlaceholderDimensionStyles=function(){var e=!("number"==typeof this._embedDimensions.height&&"number"==typeof this._embedDimensions.width),t="";if(e){var n=void 0;try{n=function(e){var t=/([0-9]+(?:\.?[0-9]+)*):([0-9]+(?:\.?[0-9]+)*)/.exec(e);if(!t)throw new Error("'"+e+"' is not a parseable aspect ratio.");return{width:Number(t[1]),height:Number(t[2])}}(this._embedDimensions.aspectratio||"16:9")}catch(e){console.warn("Could not determine desired aspect ratio for the channel embed. Defaulting to 16:9."),n={width:16,height:9}}t='\n            .jw-embed-text-placeholder:before,\n            .jw-embed-image-placeholder:before,\n            .jw-live-error:before {\n              content: "";\n              padding-top: '+n.height/n.width*100+"%;\n            }"}return"\n        "+t+"\n        .jw-embed-text-placeholder,\n        .jw-embed-image-placeholder,\n        .jw-live-error {\n          width: "+("string"==typeof this._embedDimensions.width?this._embedDimensions.width:(this._embedDimensions.width||"0")+"px")+";\n          height: "+(e?"auto":(this._embedDimensions.height||"0")+"px")+";\n        }"},e.prototype.placeholderFallback=function(){this.placeholderView instanceof m&&this.placeholderView.destroy(),this.placeholderView=new p({},this._placeholderContainer)},Object.defineProperty(e.prototype,"playerContainer",{get:function(){return this._playerContainer},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"placeholderContainer",{get:function(){return this._placeholderContainer},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"errorView",{get:function(){return this._errorView},enumerable:!1,configurable:!0}),e}();return function(t){var n,r,s,m,v=new u;function g(){v.getChannelStatus(t.channelId).then((function(e){if(e.status&&"active"===e.status){var a=e.current_event;s!==a&&(s=a,E(),console.log("Attempting to initiate playback for "+t.channelId),function(e,a){s=a.current_event;var c=a.ssai||!1;(function(e,a){var s;return i(this,void 0,void 0,(function(){var i,c,d,u,p,m;return o(this,(function(o){switch(o.label){case 0:c=0,d=Date.now(),o.label=1;case 1:if(i)return[3,7];o.label=2;case 2:return o.trys.push([2,4,,6]),[4,v.getPlaylist(e,a)];case 3:return i=o.sent(),[3,6];case 4:if((u=o.sent())instanceof l&&403===u.status)throw u;return(p=Date.now()-d)>=6e4?(i={playlist:[{mediaid:e,file:v.getLiveManifestUrl(e)}]},[3,7]):(++c,[4,(f=Math.min(5*Math.pow(2,c-1)*1e3,6e4-p),new Promise((function(e){return setTimeout(e,f)})))]);case 5:return o.sent(),[3,6];case 6:return[3,1];case 7:return r?r.load(i.playlist):((m=t.playerConfig||{liveTimeout:null!==(s=t.liveTimeout)&&void 0!==s?s:75}).playlist=i.playlist,function(e){e.on("playlistComplete",(function(){C(h.IDLE),j()})),e.on("error",(function(e){230001===e.code&&C(h.IDLE),j()}))}(r=jwplayer(n.playerContainer).setup(m))),C(h.PLAYING),r.play(),[2]}var f}))}))})(s,c).catch((function(e){e instanceof l&&403===e.status&&I("Access to Live Channel denied","Content Signing is not supported when using Live Channel embeds.");var t="message"in e?e.message:"unknown error";console.error("Failed to start live event stream playback for channel: "+t),C(h.IDLE),j()}))}(t.channelId,e))}else C(h.IDLE)}),(function(e){if(e instanceof l){if(404===e.status)return void I("Live channel not found");if(403===e.status)return void I("Access to Live Channel denied","You are not authorized to watch this channel.")}var t="message"in e?e.message:"unknown error";console.error("Unable to fetch live stream channel status: "+t)}))}function j(){m||(m=window.setInterval(g,1e4),g())}function E(){m&&clearInterval(m),m=null}function C(e){n.setState(e)}function I(e,t){E(),console.error("Fatal Error: "+e+". "+(t||"")),n.errorView.setError(e,t),n.setState(h.ERROR)}!function(){try{!function(t){if(!t)throw new a("received invalid config");if(!t.channelId)throw new a("missing required channelId");if(t.placeholder){var n=t.placeholder;if(n.type&&-1===Object.values(e).indexOf(n.type))throw new a("invalid placeholder type: "+n.type);var r=n.type;if(!(r!==e.MEDIA&&r!==e.IMAGE||n.mediaId||n.url))throw new a(n.type.charAt(0).toUpperCase()+n.type.slice(1)+" placeholders must have a mediaId or URL")}}(t)}catch(e){var r="message"in e?e.message:"unknown error";return void console.error("Unable to initialize Channel Embed: "+r)}var i=t.embedContainer;if("string"==typeof i&&(i=document.getElementById(i)),!i){var o="jw_channel_embed_"+function(e){for(var t="";t.length<e;)t+=c();return t.slice(0,e)}(8);document.write("<div id='"+o+"'></div>"),i=document.getElementById(o)}i?(!function(r){if(n)return;var i,o=function(e){var t=document.createElement("div");return t.classList.add(e),r.appendChild(t),t},a=o("jw-live-error"),l=o("jw-live-placeholder"),s=o("jw-live-player"),c=function(){n.placeholderFallback()};t.placeholder&&(t.placeholder.type===e.IMAGE?i=new f(t.placeholder,l,c):t.placeholder.type===e.MEDIA&&(i=new w(t.placeholder,l,c)));i||(i=new p(t.placeholder||{},l));var h=d()&&jwplayer.defaults?jwplayer.defaults:{};n=new b(r,h,new y(a),s,l,i)}(i),d()?!function(){if(!d())return!1;var e=/^([0-9]+)\.([0-9]+)\.([0-9]+)\+/g.exec(jwplayer.version);return!!e&&Number(e[1])>=8}()?I("Unsupported JW Player version","Your JW Player version is not supported by Channel Embeds."):(C(h.IDLE),j()):I("No JW Player available","Please embed a JW Player into your page in order to use Channel Embeds.")):console.error("Unable to initialize Live Channel embed: could not locate/create UI container")}()}}();
