
if(typeof SlideShowProRefs!='object'){SlideShowProRefs={};SlideShowPro=function(options){if(this instanceof SlideShowPro){this.opts={attributes:{width:550,height:400,autoMobile:false,mobileFlash:true,onEmbed:false,onReady:false},mobile:{auto:false,showBackButton:false,showInfoButton:true,flash:false,poster:'default',linkToPlayer:true,sharpening:true},params:{bgcolor:'#000000',allowFullScreen:true,allowscriptaccess:'always'},flashvars:{initialURL:escape(document.location),useExternalInterface:"false",id:options.attributes.id,xmlFileType:'Director'}};if(document.location.host!=''){var h=document.location.host;if(h.indexOf(':')!==-1){h=h.substr(0,h.indexOf(':'));};this.opts.flashvars.allowedDomains=h;};this.listeners={};this._autoMobile=false;for(var i in this.opts){for(var j in options[i]){this.opts[i][j]=options[i][j];};};if(this.opts.attributes.autoMobile){this.opts.mobile.auto=true;};if(!this.opts.attributes.mobileFlash){this.opts.mobile.flash=false;};if(!this.opts.flashvars.paramXMLPath){this.opts.flashvars.loadParams=false;};if(this.opts.flashvars.xmlFileType=='Single Content'){this.opts.flashvars.startup="Open album";this.opts.flashvars.panZoom="Off";this.opts.flashvars.navAppearance="Hidden";}
this.target=document.getElementById(this.opts.attributes.id);var divs=this.target.getElementsByTagName('div');for(var i=0;i<divs.length;i++){if(divs[i].className=='ssp-mobile-poster'){this.customPoster=divs[i];this.target.removeChild(divs[i]);};};this.fallbackText=this.target.innerHTML;this.target.innerHTML='';this.parseXMLPath(this.opts.flashvars.xmlFilePath);if(!this.opts.attributes.src){this.opts.attributes.src=this.host+'/m/slideshowpro.swf';};this.normPaths();if(this.opts.mobile.auto&&this.isMobile()&&(!this.hasFlash()||!this.opts.mobile.flash)){this._autoMobile=true;var cover=this.e('div',{position:'absolute',width:'10000px',height:'10000px',background:'#060606',top:0,left:0,zIndex:1000000});document.body.appendChild(cover);window.scrollTo(0,1);this.fallback();}else{if(this.opts.mobile.devMode||(this.isMobile()&&(!this.hasFlash()||!this.opts.mobile.flash))){this.fallback();}else{this.embed();}};SlideShowProRefs[this.opts.attributes.id]=this;return this;}else{return new SlideShowPro(options);};};SlideShowPro.prototype.parseXMLPath=function(path){var parts=/^(https?:\/\/)?(.*)?\/images.php\?(album|gallery)=(\d+)$/.exec(path);if(parts===null){parts=/^(https?:\/\/)?(.*)?\/[A-Za-z]+\/album-\d+\/lg\/.*$/.exec(path);}
if(parts[2]){this.host=parts[1]+parts[2];}else{this.host='';};this.contentType=parts[3];this.contentId=parts[4];};SlideShowPro.prototype.formOutlink=function(data){this.outlink=this.host+'/m/?'+this.contentType+'='+data.internal_id+data.id+'&back='+Number(this.opts.mobile.showBackButton)+'&info='+Number(this.opts.mobile.showInfoButton)+'&sharpening='+Number(this.opts.mobile.sharpening);if(this._autoMobile){top.location.replace(this.outlink);return true;};return false;};SlideShowPro.prototype.normPaths=function(){if(document.location.host==''){this.opts.flashvars.permalinks='Off';return false;};String.prototype.cleanWWW=function(){return this.replace('//www.','//');};var host=document.location.protocol+'//'+document.location.host;var hostClean=host.cleanWWW();var check=[this.host,this.opts.attributes.src,this.opts.flashvars.xmlFilePath];if(this.opts.flashvars.paramXMLPath){check.push(this.opts.flashvars.paramXMLPath);};for(var i=0;i<check.length;i++){var _s=check[i];var _clean=_s.cleanWWW();if(_clean.indexOf(hostClean)!==-1){_s=_clean.replace(hostClean,'');};check[i]=_s;};this.host=check[0];this.opts.attributes.src=check[1];this.opts.flashvars.xmlFilePath=check[2];if(check.length>3){this.opts.flashvars.paramXMLPath=check[3];};};SlideShowPro.prototype.isMobile=function(){return/iPad|iPhone|iPod|Android 2\.\d/.exec(navigator.userAgent)!==null;};SlideShowPro.prototype.hasFlash=function(){var p=navigator.plugins;if(p&&p['Shockwave Flash']&&p['Shockwave Flash'].description){return true;}else{return false;};};SlideShowPro.prototype.ready=function(){if(typeof this.opts.attributes.onReady=='function'){this.opts.attributes.onReady.call(this);};var evs=['albumData','albumEnd','albumStart','displayMode','galleryClosed','galleryClosing','galleryData','galleryHidden','galleryInfo','galleryOpen','galleryOpening','galleryToggled','imageAlign','imageClick','imageData','imageFormat','imageLoad','imageRollOut','imageRollOver','imageZone','nextImage','nextImageGroup','nextScreen','netStreamStatus','permalink','preloadEnd','preloadInit','preloadProgress','prevImage','prevImageGroup','prevScreen','transEffectStart','transEffectEnd','transPauseStart','transPauseEnd','videoCuePoint','videoEnd','videoMetadata','videoPause','videoPlayRelease','videoPreviewLoad','videoPreviewRemove','videoResume','videoStart','videoXMPData','xmlData'];for(var i in evs){this.api.addEventListener(evs[i],'SlideShowProRefs["'+this.opts.attributes.id+'"].answer');};var fns=['enterFullScreenDisplayState','getAlbumData','getGalleryData','halt','loadAlbum','loadContent','muteMedia','nextGalleryScreen','nextImage','nextImageGroup','pauseMedia','playMedia','previousGalleryScreen','previousImage','previousImageGroup','removeEventListener','setMediaVolume','setSize','setStartAlbum','toggleDisplayMode','toggleGallery','toggleNav','unloadContent','unMuteMedia'];for(var i in fns){var exec="this."+fns[i]+" = function() { var n = '"+fns[i]+"'; var _str = ''; if (arguments.length > 0) { var _a = []; for (i = 0; i < arguments.length; i++) { _a.push(\"'\" + arguments[i] + \"'\"); }; if (n == 'loadAlbum' && _a.length == 1) { _a.push(0); }; _str = _a.join(','); }; eval('this.api."+fns[i]+"(' + _str + ')'); }";eval(exec);}};SlideShowPro.prototype.addEventListener=function(name,fn){if(!this.listeners[name]){this.listeners[name]=[];};this.listeners[name].push(fn);};SlideShowPro.prototype.embed=function(){var f=this.opts.flashvars||{};var p=this.opts.params||{};var a=this.opts.attributes||{};var self=this;if(typeof flashPutHref!=='function'){flashPutHref=function(href){location.href=href;};};swfobjectSSP.embedSWF(a.src,a.id,a.width,a.height,"10.0.0",false,f,p,a,function(e){self.embedCallback(e);});};function onSlideShowProReady(id){SlideShowProRefs[id].ready();};SlideShowPro.prototype.answer=function(obj){if(this.listeners[obj.name]){for(var i in this.listeners[obj.name]){this.listeners[obj.name][i].apply(this,[obj]);}}}
SlideShowPro.prototype.embedCallback=function(e){if(e.success){this.api=e.ref;}else{if(this.isMobile()){this.fallback();}else{this.target.innerHTML=this.fallbackText;}};if(this.opts.attributes.onEmbed){this.opts.attributes.onEmbed.apply(this,[e.success]);};return e.success;};SlideShowPro.prototype.videoFallback=function(){var mimes={'mov':'video/quicktime','mp4':'video/mp4','m4v':'video/x-m4v'};var path=this.opts.flashvars.xmlFilePath
var ext=path.substr(path.lastIndexOf('.')+1,path.length);if(mimes[ext]){var video=document.createElement('video');if(typeof(video.canPlayType)!==undefined&&video.canPlayType(mimes[ext])!=''){video.width=this.opts.attributes.width;video.height=this.opts.attributes.height;video.controls=true;video.autoplay=true;video.src=path;this.target.appendChild(video);return;};};this.target.innerHTML=this.fallbackText;};SlideShowPro.prototype.e=function(element,style,klass){if(typeof element=='string'){element=document.createElement(element);element.style.fontWeight='normal';element.style.textTransform='none';element.style.textAlign='left';element.style.float='none';element.style.lineHeight='1em';var zeros=['margin','padding','border'];for(var i=0;i<zeros.length;i++){element.style[zeros[i]]='0px';};var autos=['top','left','right','bottom'];for(var i=0;i<autos.length;i++){element.style[autos[i]]='auto';};};for(var i in style){element.style[i]=style[i];};element.style.zoom=1;if(klass){element.className=klass;};return element;};SlideShowPro.prototype.computeStyle=function(e,p){if(p=='width'){return e.offsetWidth;}else if(p=='height'){return e.offsetHeight;}else{if(e.currentStyle){return e.currentStyle[p];}else if(window.getComputedStyle){return document.defaultView.getComputedStyle(e,null).getPropertyValue(p);}else{return false;};};};SlideShowPro.prototype.fallback=function(){if(this.opts.flashvars.xmlFileType=='Single Content'){this.videoFallback();return;};if(this.opts.mobile.xmlFilePath){this.parseXMLPath(this.opts.mobile.xmlFilePath);};var w=this.opts.attributes.width;var h=this.opts.attributes.height;var computeW=true,computeH=true;if(!isNaN(w)){w+='px';computeW=false;}
if(!isNaN(h)){h+='px';computeH=false;}
var css={position:'relative',width:w,height:h,backgroundColor:this.opts.params.bgcolor,overflow:'hidden'};if(this.opts.mobile.linkToPlayer){css.cursor='pointer';};this.e(this.target,css);var _w,_h;if(computeW){_w=parseInt(this.computeStyle(this.target,'width'),10);}else{_w=this.opts.attributes.width;}
if(computeH){_h=parseInt(this.computeStyle(this.target,'height'));}else{_h=this.opts.attributes.height;};this.realH=_h;this.realW=_w;var self=this;if(this.opts.mobile.linkToPlayer){this.target.onclick=function(){if(self.bttn){self.e(self.bttn,{background:'#333'});};top.location.href=self.outlink;};};DirectorJS.setHost(this.host);if(this.contentType=='album'){DirectorJS.Format.preview({width:100,height:100,square:1});DirectorJS.Album.get(this.contentId,function(data){self.startDraw(data);},{with_content:false});}else{DirectorJS.Gallery.get(this.contentId,function(data){self.startDraw(data);},{with_content:false});};};SlideShowPro.prototype.startDraw=function(data){if(this.formOutlink(data)){return;};if(!data.description){data.description='';};if(this.customPoster){this.e(this.customPoster,{position:'absolute',top:'0px',left:'0px',width:'100%',height:'100%'});var _html=this.customPoster.innerHTML.replace('{{title}}',data.name).replace('{{description}}',data.description).replace('{{mobile_link}}',this.outlink);this.customPoster.innerHTML=_html;this.target.appendChild(this.customPoster);}else{var mjs=this.host+'/m/posters/'+this.opts.mobile.poster+'.js';var j=document.createElement('script');j.src=mjs;j.charset='utf-8';var self=this;j.onload=function(){self.drawPoster(data);};document.body.appendChild(j);};};var DirectorJS={req:[],userScope:{},formats:{},selfHosted:true,setHost:function(h){this.host=h;if(this.selfHosted){this.host+='/index.php?';};},initReq:function(salt){var key=salt+Math.floor(Math.random()*1000);this.req[key]=new Object;this.req[key].params=[];return this.req[key]},conn:function(req){if(req){var handler=req.apiMethod+Math.floor(Math.random()*10000);req.params.push('callback='+handler);for(i in this.formats){var f=this.formats[i];req.params.push('size['+i+']='+f);};if(this.previewFormat){req.params.push('preview='+this.previewFormat);};req.params=req.params.join('&');var qs='?'+req.params;var url=this.host+'/api/'+req.apiMethod+qs;var head=document.getElementsByTagName('head')[0];window[handler]=function(response){if(response.stat=='fail'){if(console){console.log('SlideShowPro API error: '+response.error);}
return;}else{req.callback.apply(this,[response.data]);}
window[handler]=null;head.removeChild(script);};var script=document.createElement('script');script.src=url;script.charset='utf-8';head.appendChild(script);};},Format:{add:function(options){var defaults={square:0,quality:85,sharpening:1};for(i in options){defaults[i]=options[i];};DirectorJS.formats[options.name]=[defaults.name,defaults.width,defaults.height,defaults.square,defaults.quality,defaults.sharpening].join(',');},preview:function(options){var defaults={square:0,quality:85,sharpening:1};for(i in options){defaults[i]=options[i];};DirectorJS.previewFormat=[defaults.width,defaults.height,defaults.square,defaults.quality,defaults.sharpening].join(',');}},Album:{get:function(id,callback,options){var req=DirectorJS.initReq('album.get.');var defaults={only_active:1};DirectorJS.prepAndSendObjs(defaults,options,req);req.apiMethod='get_album';req.callback=callback;req.params.push("album_id="+id);DirectorJS.conn(req);}},Gallery:{get:function(id,callback,options){var req=DirectorJS.initReq('gallery.get.');var defaults={limit:null,order:'display',with_content:true};DirectorJS.prepAndSendObjs(defaults,options,req);req.apiMethod='get_gallery';req.callback=callback;req.params.push("gallery_id="+id);DirectorJS.conn(req);}},prepAndSendObjs:function(obj1,obj2,req){if(typeof obj2=='object'){if(typeof obj2.tags=='object'){var tmp={};var tags=obj2.tags[0];if(obj2.tags[1]=='all'){var all=1;}else{var all=0;};obj2.tags=tags;obj2.tags_exclusive=all;};if(typeof obj2.scope=='object'){var tmp={};var scope=obj2.scope[0];var scope_id=obj2.scope[1];obj2.scope=scope;obj2.scope_id=scope_id;};for(i in obj2){obj1[i]=obj2[i];};};for(i in obj1){if(i=='sort_on'&&obj1[i]=='random'){req.params.push('buster='+String(Math.round(Math.random()*10)));};if(String(obj1[i])=='true'||String(obj1[i])=='false'){obj1[i]=Number(obj1[i]);};req.params.push(i+'='+obj1[i]);};}};SlideShowPro.prototype.drawPreview=function(h,data,top){top=top||0;var self=this;if(this.contentType=='album'){DirectorJS.Format.preview({width:Number(this.realW),height:Number(h),square:1});DirectorJS.Album.get(this.contentId,function(data){var w=self.realW,left=0;if(data.preview.width<self.realW){w=data.preview.width;left=(self.realW-w)/2};if(data.preview.height<h){top+=(h-data.preview.height)/2;h=data.preview.height;};var img=self.e('img',{width:w+'px',height:h+'px',position:'absolute',top:top+'px',left:left+'px',zIndex:1,opacity:0,webkitTransition:'opacity 750ms 500ms'});img.onload=function(){self.e(this,{opacity:1});};self.target.appendChild(img);img.src=data.preview.url;},{with_content:false});}else{var c=data.albums.length;var d=4;if(c<4){d=c;}else if(c%4==1){d=3;};var _w=self.realW;var _h=self.realH;var rows=Math.min(Math.ceil(c/d),Math.floor(_h/(_w/d)));rows=Math.max(rows,1);this.galleryH=Math.ceil(h/rows);this.galleryW=Math.ceil(_w/d);DirectorJS.Format.preview({width:self.galleryW,height:self.galleryH,square:1});DirectorJS.Gallery.get(this.contentId,function(data){var wrap=self.e('div',{position:'absolute',top:'0px',left:'0px',height:h+'px',width:'100%'});self.target.appendChild(wrap);var row=0,pos=0;for(i in data.albums){var a=data.albums[i];if(a.preview){var l=pos*self.galleryW;if(l>=self.realW){l=0;row++;pos=0;};var img=self.e('img',{position:'absolute',top:top+(row*self.galleryH)+'px',left:l+'px',width:self.galleryW+'px',height:self.galleryH+'px',opacity:0,webkitTransition:'opacity 750ms 500ms'});img.onload=function(){self.e(this,{opacity:1});};wrap.appendChild(img);img.src=a.preview.url;pos++;};};},{with_content:false,limit:d*rows});}};swfobjectSSP=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return!a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobjectSSP){swfobjectSSP[X]=null}swfobjectSSP=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();};