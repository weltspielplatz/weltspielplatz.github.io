function CSS3MultiColumn(){console.log('multicol loaded');var cssCache=new Object();var splitableTags=new Array("P","DIV","SPAN","BLOCKQUOTE","ADDRESS","PRE","A","EM","I","STRONG","B","CITE","OL","UL","LI","ARTICLE","SECTION","ASIDE","FIGURE","FIGCAPTION","HEADER","FOOTER");var pseudoCSSRules=new Object();var ut=new CSS3Utility();var debug=ut.debug;if(document.location.search.match("mode=debug")){var isDebug=true}else{var isDebug=false}var bestSplitPoint=null;var secondSplitPoint=null;var secondSplitBottom=0;var documentReady=false;ut.XBrowserAddEventHandler(window,"load",function(){documentReady=true;processElements()});loadStylesheets();function loadStylesheets(){if(document.styleSheets){for(var i=0;i<document.styleSheets.length;i++){cssCache[document.styleSheets[i].href]=false}for(var i=0;i<document.styleSheets.length;i++){loadCssCache(document.styleSheets[i],"parseStylesheets")}}else{if(document.getElementsByTagName){var Lt=document.getElementsByTagName("link");for(var i=0;i<Lt.length;i++){cssCache[Lt[i].href]=false}for(var i=0;i<Lt.length;i++){loadCssCache(Lt[i],"parseStylesheets")}}}}function loadCssCache(s,callback){if(s.href==null||s.href.indexOf(location.host)==-1||s.href.indexOf(location.host)>50){return false}if(s.href&&s.cssText){cssCache[s.href]=s.cssText;eval(callback)()}if(s.href&&typeof XMLHttpRequest!="undefined"){var xmlhttp=new XMLHttpRequest();xmlhttp.onreadystatechange=function(){if(xmlhttp.readyState==4){if(typeof xmlhttp.status=="undefined"||xmlhttp.status==200||xmlhttp.status==304){cssCache[s.href]=xmlhttp.responseText;eval(callback)()}}};xmlhttp.open("GET",s.href,true);xmlhttp.send(null)}}function parseStylesheets(){var allDone=true;for(var i in cssCache){if(cssCache[i]!=false){parseStylesheet(cssCache[i])}else{allDone=false}}if(allDone){processElements()}}function parseStylesheet(cssText){var cc=new ut.getPseudoCssRules("column-count",cssText);for(var i=0;cc&&i<cc.cssRules.length;i++){if(!pseudoCSSRules[cc.cssRules[i].selectorText]){pseudoCSSRules[cc.cssRules[i].selectorText]=new Object()}pseudoCSSRules[cc.cssRules[i].selectorText]["column-count"]=cc.cssRules[i].value}cc=new ut.getPseudoCssRules("column-width",cssText);for(var i=0;cc&&i<cc.cssRules.length;i++){if(!pseudoCSSRules[cc.cssRules[i].selectorText]){pseudoCSSRules[cc.cssRules[i].selectorText]=new Object()}pseudoCSSRules[cc.cssRules[i].selectorText]["column-width"]=cc.cssRules[i].value}cc=new ut.getPseudoCssRules("column-gap",cssText);for(var i=0;cc&&i<cc.cssRules.length;i++){if(!pseudoCSSRules[cc.cssRules[i].selectorText]){pseudoCSSRules[cc.cssRules[i].selectorText]=new Object()}pseudoCSSRules[cc.cssRules[i].selectorText]["column-gap"]=cc.cssRules[i].value}cc=new ut.getPseudoCssRules("column-rule",cssText);for(var i=0;cc&&i<cc.cssRules.length;i++){if(!pseudoCSSRules[cc.cssRules[i].selectorText]){pseudoCSSRules[cc.cssRules[i].selectorText]=new Object()}pseudoCSSRules[cc.cssRules[i].selectorText]["column-rule"]=cc.cssRules[i].value}}function processElements(){if(!documentReady){return}for(var i in pseudoCSSRules){debug(i+" cc:"+pseudoCSSRules[i]["column-count"]+" cw:"+pseudoCSSRules[i]["column-width"]+" cr:"+pseudoCSSRules[i]["column-rule"]+" cg:"+pseudoCSSRules[i]["column-gap"]);var affectedElements=ut.cssQuery(i);for(var j=0;j<affectedElements.length;j++){processElement(affectedElements[j],pseudoCSSRules[i]["column-count"],pseudoCSSRules[i]["column-width"],pseudoCSSRules[i]["column-gap"],pseudoCSSRules[i]["column-rule"])}}}function processElement(affectedElement,column_count,column_width,column_gap,column_rule){var widthUnit;var width;var column_rule_width=0;if(affectedElement.clientWidth&&affectedElement.clientWidth!=0){var padding;if(affectedElement.currentStyle){padding=parseInt(affectedElement.currentStyle.paddingLeft.replace(/[\D]*/gi,""))+parseInt(affectedElement.currentStyle.paddingRight.replace(/[\D]*/gi,""))}else{if(document.defaultView&&document.defaultView.getComputedStyle){padding=parseInt(document.defaultView.getComputedStyle(affectedElement,"").getPropertyValue("padding-left").replace(/[\D]*/gi,""))+parseInt(document.defaultView.getComputedStyle(affectedElement,"").getPropertyValue("padding-left").replace(/[\D]*/gi,""))}}if(isNaN(padding)){padding=0}width=(affectedElement.clientWidth-padding).toString()+"px"}else{if(affectedElement.scrollWidth){var borderWidth;var padding;if(affectedElement.currentStyle){padding=parseInt(affectedElement.currentStyle.paddingLeft.replace(/[\D]*/gi,""))+parseInt(affectedElement.currentStyle.paddingRight.replace(/[\D]*/gi,""))}else{if(document.defaultView&&document.defaultView.getComputedStyle){padding=parseInt(document.defaultView.getComputedStyle(affectedElement,"").getPropertyValue("padding-left").replace(/[\D]*/gi,""))+parseInt(document.defaultView.getComputedStyle(affectedElement,"").getPropertyValue("padding-left").replace(/[\D]*/gi,""))}}if(isNaN(padding)){padding=0}if(affectedElement.currentStyle){borderWidth=parseInt(affectedElement.currentStyle.borderLeftWidth.replace(/[\D]*/gi,""))+parseInt(affectedElement.currentStyle.borderRightWidth.replace(/[\D]*/gi,""))}else{if(document.defaultView&&document.defaultView.getComputedStyle){borderWidth=parseInt(document.defaultView.getComputedStyle(affectedElement,"").getPropertyValue("border-left-width").replace(/[\D]*/gi,""))+parseInt(document.defaultView.getComputedStyle(affectedElement,"").getPropertyValue("border-right-width").replace(/[\D]*/gi,""))}}if(isNaN(borderWidth)){borderWidth=0}width=(affectedElement.scrollWidth-padding-borderWidth).toString()+"px"}else{width="99%"}}var availableWidth=parseInt(width.replace(/[\D]*/gi,""));if(!column_width||column_width=="auto"){widthUnit=width.replace(/[\d]*/gi,"")}else{widthUnit=column_width.replace(/[\d]*/gi,"")}if(!widthUnit){widthUnit="px"}if(!column_gap){if(widthUnit=="%"){column_gap=1}else{column_gap=15}}else{column_gap=parseInt(column_gap.replace(/[\D]*/gi,""))}if(column_rule&&column_rule!="none"){column_gap=Math.floor(column_gap/2);column_rule_width=column_gap+parseInt(column_rule.substring(column_rule.search(/\d/),column_rule.search(/\D/)))}if(!column_width||column_width=="auto"){column_width=(availableWidth-((column_gap+column_rule_width)*(column_count-1)))/column_count}else{column_width=parseInt(column_width.replace(/[\D]*/gi,""));if(!column_count||column_count=="auto"){column_count=Math.floor(availableWidth/(column_width+column_gap))}}column_width-=1;var wrapper=document.createElement("div");var pn=affectedElement.parentNode;wrapper=pn.insertBefore(wrapper,affectedElement);var elem=pn.removeChild(affectedElement);elem=wrapper.appendChild(elem);wrapper.className=elem.className;elem.className="";elem.id=ut.randomId();elem.style.width=column_width.toString()+widthUnit;if(typeof elem.style.styleFloat!="undefined"){elem.style.styleFloat="left"}if(typeof elem.style.cssFloat!="undefined"){elem.style.cssFloat="left"}var newHeight=Math.floor(elem.offsetHeight/column_count)+14;if(!wrapper.id){wrapper.id=ut.randomId()}var j=1;for(var i=1;i<column_count&&elem&&j<(column_count+5);i++){bestSplitPoint=null;secondSplitPoint=null;secondSplitBottom=0;findSplitPoint(elem,newHeight*i,wrapper);if(isDebug){bestSplitPoint.style.border="1px solid #00FF00"}if(bestSplitPoint&&!isElementSplitable(bestSplitPoint)){newHeight=getElementRelativeTop(bestSplitPoint,wrapper)+bestSplitPoint.offsetHeight+10;i=1;debug("reset new Height = "+newHeight+" relativetop="+getElementRelativeTop(bestSplitPoint,wrapper)+" offsetHeight= "+bestSplitPoint.offsetHeight)}else{if(!bestSplitPoint){debug("No split point found with "+newHeight)}}j++}debug("<table><tr><td>Avail. Width</td><td>"+availableWidth+"</td><td>Units</td><td>"+widthUnit+"</td></tr><tr><td>column_width</td><td>"+column_width+"</td><td>column_count</td><td>"+column_count+"</td></tr><tr><td>column_gap</td><td>"+column_gap+"</td><td>column_rule</td><td>"+column_rule+"</td></tr><tr><td>New Height</td><td>"+newHeight+"</td><td></td><td></td></tr></table>");for(var i=1;i<column_count&&elem;i++){bestSplitPoint=null;secondSplitPoint=null;secondSplitBottom=0;findSplitPoint(elem,newHeight,wrapper);if(bestSplitPoint&&isElementSplitable(bestSplitPoint)&&elem.id!=bestSplitPoint.id){var splitE=bestSplitPoint;if(isDebug){secondSplitPoint.style.border="1px dotted #00F"}}else{var splitE=secondSplitPoint}if(!splitE){debug("<hr />No split point found for "+elem.tagName+" "+newHeight);return}if(isDebug){splitE.style.border="1px solid #F00"}var newCol=elem.cloneNode(false);newCol.id=ut.randomId();elem.parentNode.insertBefore(newCol,elem.nextSibling);newCol.style.paddingLeft=column_gap+widthUnit;if(column_rule&&column_rule!="none"){newCol.style.borderLeft=column_rule;elem.style.paddingRight=column_gap+widthUnit}if(document.all&&!window.opera){elem.style.height=newHeight+"px"}elem.style.minHeight=newHeight+"px";var insertPoint=createNodeAncestors(splitE,elem,newCol,"append");var refElement=splitE;while(refElement&&refElement.id!=elem.id){var littleSib=refElement.nextSibling;while(littleSib){moveNode(littleSib,elem,newCol);littleSib=refElement.nextSibling}refElement=refElement.parentNode}var strippedLine=splitElement(splitE,newHeight-getElementRelativeTop(splitE,wrapper),elem,newCol);var pn=splitE.parentNode;while(pn&&pn.id!=elem.id){var n=pn.firstChild;while(n){if((n.nodeType==1&&n.childNodes.length==0)||(n.nodeType==3&&n.nodeValue.replace(/[\u0020\u0009\u000A]*/,"")=="")){pn.removeChild(n);n=pn.firstChild}else{n=n.nextSibling}}pn=pn.parentNode}if(strippedLine){splitE=elem.lastChild;if(splitE&&(document.defaultView&&document.defaultView.getComputedStyle(splitE,"").getPropertyValue("text-align")=="justify")||(splitE.currentStyle&&splitE.currentStyle.textAlign=="justify")){var txtFiller=document.createTextNode(" "+strippedLine.replace(/./g,"\u00a0"));var filler=document.createElement("span");splitE.appendChild(filler);filler.style.lineHeight="1px";filler.appendChild(txtFiller)}}elem=newCol}if(elem){if(document.all&&!window.opera){elem.style.height=newHeight+"px"}elem.style.minHeight=newHeight+"px"}var clearFloatDiv=document.createElement("div");clearFloatDiv.style.clear="left";clearFloatDiv.appendChild(document.createTextNode(" "));wrapper.appendChild(clearFloatDiv);if(navigator.userAgent.toLowerCase().indexOf("safari")+1){wrapper.innerHTML+=" "}}function findSplitPoint(n,newHeight,wrapper){if(n.nodeType==1){var top=getElementRelativeTop(n,wrapper);var bot=top+n.offsetHeight;if(top<newHeight&&bot>newHeight){bestSplitPoint=n;if(isElementSplitable(n)){for(var i=0;i<n.childNodes.length;i++){findSplitPoint(n.childNodes[i],newHeight,wrapper)}}return}if(bot<=newHeight&&bot>=secondSplitBottom){secondSplitBottom=bot;secondSplitPoint=n}}return}function isElementSplitable(n){if(n.tagName){var tagName=n.tagName.toUpperCase();for(var i=0;i<splitableTags.length;i++){if(tagName==splitableTags[i]){return true}}}return false}function splitElement(n,targetHeight,col1,col2){var cn=n.lastChild;while(cn){if(cn.nodeType==3){var strippedText="dummmy";var allStrippedText="";while(n.offsetHeight>targetHeight+2&&strippedText!=""){strippedText=stripOneLine(cn);allStrippedText=strippedText+allStrippedText}if(allStrippedText!=""){var insertPoint=createNodeAncestors(cn,col1,col2,"insertBefore");insertPoint.insertBefore(document.createTextNode(allStrippedText),insertPoint.firstChild)}if(cn.nodeValue==""){cn.parentNode.removeChild(cn)}else{break}}else{var insertPoint=createNodeAncestors(cn,col1,col2,"insertBefore");insertPoint.insertBefore(cn.parentNode.removeChild(cn),insertPoint.firstChild)}cn=n.lastChild}return strippedText}function stripOneLine(n){while(n&&n.nodeType!=3){n=n.firstChild}if(!n){return}var e=n.parentNode;var h=e.offsetHeight;if(!h){return""}var str=n.nodeValue;var wIdx=n.nodeValue.lastIndexOf(" ");while(wIdx!=-1&&e.offsetHeight==h){n.nodeValue=n.nodeValue.substr(0,wIdx);wIdx=n.nodeValue.lastIndexOf(" ");if(wIdx==-1){wIdx=n.nodeValue.lastIndexOf("\n")}}if(e.offsetHeight==h){n.nodeValue=""}return str.substr(n.nodeValue.length)}function createNodeAncestors(n,col1,col2,method){var ancestors=new Array;var insertNode=col2;var pn=n.parentNode;while(pn&&pn.id!=col1.id){ancestors[ancestors.length]=pn;if(!pn.id){pn.id=ut.randomId()}pn=pn.parentNode}for(var i=ancestors.length-1;i>=0;i--){for(var j=0;j<insertNode.childNodes.length&&(insertNode.childNodes[j].nodeType==3||!insertNode.childNodes[j].className.match(ancestors[i].id+"-css3mc"));j++){}if(j==insertNode.childNodes.length){if(method=="append"){insertNode=insertNode.appendChild(document.createElement(ancestors[i].tagName))}else{insertNode=insertNode.insertBefore(document.createElement(ancestors[i].tagName),insertNode.firstChild)}insertNode.className=ancestors[i].className+" "+ancestors[i].id+"-css3mc";insertNode.style.marginTop="0";insertNode.style.paddingTop="0";if(insertNode.tagName.toUpperCase()=="OL"&&n.nodeType==1&&n.tagName.toUpperCase()=="LI"){var prevsib=n.previousSibling;var count=0;while(prevsib){if(prevsib.nodeType==1&&prevsib.tagName.toUpperCase()=="LI"){count++}prevsib=prevsib.previousSibling}insertNode.setAttribute("start",count)}}else{insertNode=insertNode.childNodes[j];if(insertNode.tagName.toUpperCase()=="OL"&&(insertNode.start==-1||insertNode.start==1)&&n.nodeType==1&&n.tagName.toUpperCase()=="LI"){var prevsib=n.previousSibling;var count=0;while(prevsib){if(prevsib.nodeType==1&&prevsib.tagName.toUpperCase()=="LI"){count++}prevsib=prevsib.previousSibling}insertNode.setAttribute("start",count)}}}return insertNode}function moveNode(n,col1,col2){var insertNode=createNodeAncestors(n,col1,col2,"append");var movedNode=insertNode.appendChild(n.parentNode.removeChild(n));if(insertNode.id==col2.id&&movedNode.nodeType==1){movedNode.style.paddingTop="0px";movedNode.style.marginTop="0px"}return movedNode}function getElementRelativeTop(obj,refObj){var cur=0;if(obj.offsetParent){while(obj.offsetParent){cur+=obj.offsetTop;obj=obj.offsetParent}}var cur2=0;if(refObj.offsetParent){while(refObj.offsetParent){cur2+=refObj.offsetTop;refObj=refObj.offsetParent}}return cur-cur2}}function CSS3Utility(){this.handlerList=new Array()}CSS3Utility.prototype.cssQuery=function(){var e="1.0.1";var H=/^[^>\+~\s]/;var v=/[\s>\+~:@#\.]|[^\s>\+~:@#\.]+/g;var g=/\|/;var G=/([\s>\+~\,]|^)([\.:#@])/g;var b="$1*$2";var F=/^\s+|\s*([\+\,>\s;:])\s*|\s+$/g;var a="$1";var t=1;var y=3;var s=9;var p=/MSIE/.test(navigator.appVersion),d;var m={};function c(N,S){if(!N){return[]}var J=arguments.callee.caching&&!S;S=(S)?(S.constructor==Array)?S:[S]:[document];d=false;var T=x(N).split(",");var Q=[];for(var P in T){N=E(T[P]);var O=0,M,K,L="",R=S;while(O<N.length){M=N[O++];K=N[O++];L+=M+K;R=(J&&m[L])?m[L]:r(R,M,K);if(J){m[L]=R}}Q=Q.concat(R)}return Q}c.caching=false;c.reset=function(){m={}};c.toString=function(){return"function cssQuery() {\n  [version "+e+"]\n}"};var k=(p)?function(J){if(J.nodeType!=s){J=J.document}return J.mimeType=="XML Document"}:function(J){if(J.nodeType==s){J=J.documentElement}return J.localName!="HTML"};function x(J){return J.replace(F,a).replace(D.ALL,D.ID).replace(G,b)}function E(J){if(H.test(J)){J=" "+J}return J.match(v)||[]}var j={link:function(K){for(var J=0;J<document.links;J++){if(document.links[J]==K){return true}}},visited:function(J){},"first-child":function(J){return !l(J)},"last-child":function(J){return !h(J)},root:function(K){var J=K.ownerDocument||K.document;return Boolean(K==J.documentElement)},empty:function(K){for(var J=0;J<K.childNodes.length;J++){if(q(K.childNodes[J])||K.childNodes[J].nodeType==y){return false}}return true}};var o=/([\'\"])[^\1]*\1/;function B(J){return(o.test(J))?J:"'"+J+"'"}function A(J){return(o.test(J))?J.slice(1,-1):J}var z=[];function D(J,L,K){this.id=z.length;var M="element.";switch(J.toLowerCase()){case"id":M+="id";break;case"class":M+="className";break;default:M+="getAttribute('"+J+"')"}switch(L){case"=":M+="=="+B(K);break;case"~=":M="/(^|\\s)"+A(K)+"(\\s|$)/.test("+M+")";break;case"|=":M="/(^|-)"+A(K)+"(-|$)/.test("+M+")";break}i(z,new Function("element","return "+M))}D.prototype.toString=function(){return D.PREFIX+this.id};D.PREFIX="@";D.ALL=/\[([^~|=\]]+)([~|]?=?)([^\]]+)?\]/g;D.ID=function(J,K,M,L){return new D(K,M,L)};function r(R,L,J){var K="";if(g.test(J)){J=J.split("|");K=J[0];J=J[1]}var P=[],O;switch(L){case" ":for(O in R){if(typeof R[O]=="function"){continue}var M=n(R[O],J,K);for(var N=0;N<M.length;N++){if(q(M[N])&&(!K||w(M[N],K))){i(P,M[N])}}}break;case">":for(O in R){var M=R[O].childNodes;for(var N=0;N<M.length;N++){if(u(M[N],J,K)){i(P,M[N])}}}break;case"+":for(O in R){var Q=h(R[O]);if(Q&&u(Q,J,K)){i(P,Q)}}break;case"~":for(O in R){var Q=R[O];while(Q=h(Q)){if(Q&&u(Q,J,K)){i(P,Q)}}}break;case".":J=new RegExp("(^|\\s)"+J+"(\\s|$)");for(O in R){if(J.test(R[O].className)){i(P,R[O])}}break;case"#":for(O in R){if(R[O].id==J){i(P,R[O])}}break;case"@":J=z[J];for(O in R){if(J(R[O])){i(P,R[O])}}break;case":":J=j[J];for(O in R){if(J(R[O])){i(P,R[O])}}break}return P}var n=(p)?function(K,J){return(J=="*"&&K.all)?K.all:K.getElementsByTagName(J)}:function(L,J,K){return(K)?L.getElementsByTagNameNS("*",J):L.getElementsByTagName(J)};function u(K,J,L){if(L&&!w(K,L)){return false}return(J=="*")?q(K):(d)?(K.tagName==J):(K.tagName==J.toUpperCase())}var f=(p)?"scopeName":"prefix";function w(J,K){return J[f]==K}function l(J){while((J=J.previousSibling)&&!q(J)){continue}return J}function h(J){while((J=J.nextSibling)&&!q(J)){continue}return J}function q(J){return Boolean(J.nodeType==t&&J.tagName!="!")}function i(K,J){K[K.length]=J}if("i".replace(/i/,function(){return""})){var C=String.prototype.replace;var I=function(N,M){var K,L="",J=this;while((K=N.exec(J))){L+=J.slice(0,K.index)+M(K[0],K[1],K[2],K[3],K[4]);J=J.slice(K.lastIndex)}return L+J};String.prototype.replace=function(K,J){this.replace=(typeof J=="function")?I:C;return this.replace(K,J)}}return c}();CSS3Utility.prototype.XBrowserAddEventHandler=function(target,eventName,handlerName){if(!target){return}if(target.addEventListener){target.addEventListener(eventName,function(e){eval(handlerName)(e)},false)}else{if(target.attachEvent){target.attachEvent("on"+eventName,function(e){eval(handlerName)(e)})}else{var originalHandler=target["on"+eventName];if(originalHandler){target["on"+eventName]=function(e){originalHandler(e);eval(handlerName)(e)}}else{target["on"+eventName]=eval(handlerName)}}}var l=this.handlerList.length;this.handlerList[l]=new Array(2);this.handlerList[l][0]=target.id;this.handlerList[l][1]=eventName};CSS3Utility.prototype.getPseudoCssRules=function(f,g){this.cssRules=new Array();var b=f.replace("-","-")+"[\\s]*:[\\s]*([^;}]*)[;}]";var i="$";var c=new RegExp(b,"g");var d=c.exec(g);var e=0;while(d){var h=g.substr(0,g.substr(0,g.indexOf(d[0])).lastIndexOf("{"));var a=h.substr(h.lastIndexOf("}")+1).replace(/^\s*|\s*$/g,"");this.cssRules[e]=new Object();this.cssRules[e].selectorText=a;this.cssRules[e].property=f;this.cssRules[e].value=d[1].replace(/(\r?\n)*/g,"");e++;d=c.exec(g)}};CSS3Utility.prototype.randomId=function(){var b="";for(var a=0;a<6;a++){b+=String.fromCharCode(97+Math.floor((Math.random()*24)))}return b};CSS3Utility.prototype.debug=function(b){var a=document.getElementById("debugOutput");if(typeof a!="undefined"&&a){a.innerHTML+=b}};

/*! flip - v1.0.0 - 2015-04-04
* https://github.com/nnattawat/flip
* Copyright (c) 2015 Nattawat Nonsung; Licensed MIT */
!function(a){var b=function(a){a.data("fliped",!0);var b="rotate"+a.data("axis");a.find(".front").css({transform:b+(a.data("reverse")?"(-180deg)":"(180deg)")}),a.find(".back").css({transform:b+"(0deg)"})},c=function(a){a.data("fliped",!1);var b="rotate"+a.data("axis");a.find(".front").css({transform:b+"(0deg)"}),a.find(".back").css({transform:b+(a.data("reverse")?"(180deg)":"(-180deg)")})};a.fn.flip=function(d){return this.each(function(){var e=a(this);if(void 0!==d&&"boolean"==typeof d)d?b(e):c(e);else{var f=a.extend({axis:"y",reverse:!1,trigger:"click",speed:500},d);if(e.data("reverse",f.reverse),e.data("axis",f.axis),"x"==f.axis.toLowerCase())var g=2*e.outerHeight(),h="rotatex";else var g=2*e.outerWidth(),h="rotatey";e.find(".back").css({transform:h+"("+(f.reverse?"180deg":"-180deg")+")"}),e.css({perspective:g,position:"relative"});var i=f.speed/1e3||.5;if(e.find(".front, .back").outerHeight(e.height()).outerWidth(e.width()).css({"transform-style":"preserve-3d",position:"absolute",transition:"all "+i+"s ease-out","backface-visibility":"hidden"}),"click"==f.trigger.toLowerCase())e.find('button, a, input[type="submit"]').click(function(a){a.stopPropagation()}),e.click(function(){e.data("fliped")?c(e):b(e)});else if("hover"==f.trigger.toLowerCase()){var j=function(){e.unbind("mouseleave",k),b(e),setTimeout(function(){e.bind("mouseleave",k),e.is(":hover")||c(e)},f.speed+150)},k=function(){c(e)};e.mouseenter(j),e.mouseleave(k)}}}),this}}(jQuery);

(function ($) {
	$.fn.cyclotron = function (options) {

		var settings = $.extend({
			dampingFactor: 0.93,
			historySize: 5
		}, options);
		return this.each(function () {
			var container, sx, dx = 0, armed, offset = 0, tick, prev, h = [];
			container = $(this);

			var startEventType = 'mousedown',
			endEventType = 'mouseup',
			moveEventType = 'mousemove',
			modernTouch = Modernizr.touch;

			if (modernTouch) {
				startEventType += ' touchstart ';
				endEventType   += ' touchend ';
				moveEventType += ' touchmove';
			}

			//Console.log(startEventType + endEventType + moveEventType);
			container.bind(startEventType,function (e) {

				if (modernTouch && e.originalEvent.touches) {
					sx = e.originalEvent.touches[0].pageX - offset;
				} else {
					sx = e.pageX - offset;
				};
				armed = true;
				e.preventDefault();
			});

			container.bind(moveEventType ,function (e) {
				var px;
				if (armed) {
					px = e.pageX;
					if (modernTouch && e.originalEvent.touches) {
						px = e.originalEvent.touches[0].pageX;
					} else {
						px = e.pageX;
					};
					if (prev === undefined) {
						prev = px;
					}
					offset = px - sx;
					if (h.length > settings.historySize) {
						h.shift();
					}
					h.push(prev - px);

					container.css('background-position', offset);

					prev = px;
				}
			});
			container.bind('mouseleave mouseup touchend touchleave', function () {
				if (armed) {
					var i, len = h.length, v = h[len - 1];
					for (i = 0; i < len; i++) {
						v = (v * len + (h[i])) / (len + 1);
					}
					dx = v;
				}
				armed = false;
			});
			tick = function () {
				if (!armed && dx) {
					dx *= settings.dampingFactor;
					offset -= dx;
					container.css('background-position', offset);
					if (Math.abs(dx) < 0.001) {
						dx = 0;
					}
				}
			};
			setInterval(tick, 16);
		});
	};
}(jQuery));


$(document).ready(function ($) {


var news = {
	toggleNews: function() {
		var button = $(document.getElementByClassName('news-toggle')),
		p = p.prev();
		console.log(button);
		console.log(p);
		button.on('click', function(){
			p.toggleClass('show-overflow');
			console.log('clicked');
		})
	}
}
news.toggleNews();

var navigation = $('#navigation');
var menuParentWidth = navigation.closest('.menu').css('width');

    (function stickyNavigation($) {

        menuOffsetTop = navigation.offset().top;
        menuHeight = navigation.height();
        function makeSticky() {
            windowOffsetTop = $(window).scrollTop();
            menuParentWidth = navigation.closest('.menu').css('width');
            if (windowOffsetTop > menuOffsetTop){
                navigation.css({'position':'fixed', 'top':'0', 'width':menuParentWidth}).addClass('sticky');
                $('.menu').css({'height':menuHeight});
            } else {
                navigation.css({'position':'relative', 'top':'inital'}).removeClass('sticky');
            }
        };

        makeSticky();

        $(window).scroll(function() {
            makeSticky();
        });

    }(jQuery));

    $('a[href^="#"]').on('click', function(elem) {

	    elem.preventDefault();
	    var target = this.hash,
	    $target = $(target);
			var p = window.location.hash;
			var plusHeight = navigation.css('height');
        plusHeight = 60;
			var offset = $target.offset().top;
        //console.log(plusHeight);
        //console.log(offset + ' ' + plusHeight + ' ' + (offset-plusHeight-165));
				offset = navigation.hasClass('sticky') == true ? offset-plusHeight : offset-plusHeight-80;
        shout = navigation.hasClass('sticky') == true ? true : false;
        //alert(shout);
        $('html, body').stop().animate({
	        'scrollTop': offset },900,'easeInOutCubic'
        );
	});

	$('.videos').fitVids();

	$(window).resize(function () {
		menuParentWidth = navigation.closest('.menu').css('width');
		//console.log(menuParentWidth);
		navigation.css({'width': menuParentWidth});
		$('img.lazy').css('height', function(index, value) {
			image = this;
			return blockLazyImage(image, 'height', false);
		});
		$('img.lazy').css('width', function(index, value) {
			image = this;
			return blockLazyImage(image, 'width', false);
		});
	});

	function blockLazyImage(elem, prop, auto) {
		var heightBlock, widthBlock;
		elem = $(elem);
		heightBlock =	elem.closest('.block').height();
		widthBlock = elem.closest('.block').width();
		landscape = heightBlock <= widthBlock ? true : false;
		heightBlock += 'px';
		widthBlock += 'px';
		//auto = landscape === true ? true : false;
		heightBlock = auto === true ? 'auto' : heightBlock;
		auto = $(window).width() < 768 ? true : false;
		widthBlock = auto === true ? 'auto' : widthBlock;
		propName = prop;
		prop = prop === 'height' ? heightBlock : widthBlock;
		console.log(propName + ': ' + prop);
		return prop;
	};

	images = $('img.lazy');
	$('img.lazy').css('height', function(index, value) {
		image = this;
		return blockLazyImage(image, 'height', false);
	});
	$('img.lazy').css('width', function(index, value) {
		image = this;
		return blockLazyImage(image, 'width', false);
	});

	$('.popBig').magnificPopup({
		type: 'image',
		gallery: {
	    enabled: true,
	    preload: [0,2],
	    navigateByImgClick: true,
	  },
	});
//$('.front').append('<p class="anweisung">Dreh mich</p>');
//$('.back').append('<p class="anweisung">Entwurfsskizze</p>');
	$('.lazy').lazyload({
		placeholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP4/x8AAwAB/2+Bq7YAAAAASUVORK5CYII=',
		effect : "fadeIn",
		load: function() {
			//$(this).addClass('animated slideInUp');

		}
	});
	if(Modernizr.csscolumns == false) {
		var css3MC = new CSS3MultiColumn();
	}
//	$('.flipper').flip({
//		'trigger': 'hover',
//	});
	$('.pano').cyclotron({
		dampingFactor: 0.6
	});
	$('.pano').css('background-repeat','no-repeat');
})
