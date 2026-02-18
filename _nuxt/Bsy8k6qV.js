import{O as g}from"./CTb0WEnQ.js";import{s as k}from"./DIrRRzww.js";import{Q as H,T as d,U as y,Z as p,g as L,v as h,x as f,D as b,A as v,X as a,B as m,_ as M,y as c}from"./BR31ycDK.js";import{s as C}from"./lENxip1h.js";var S={root:function(e){var t=e.props;return["p-colorpicker p-component",{"p-colorpicker-overlay":!t.inline}]},input:function(e){var t=e.props;return["p-colorpicker-preview p-inputtext",{"p-disabled":t.disabled}]},panel:function(e){var t=e.instance,o=e.props;return["p-colorpicker-panel",{"p-colorpicker-overlay-panel":!o.inline,"p-disabled":o.disabled,"p-ripple-disabled":t.$primevue.config.ripple===!1}]},content:"p-colorpicker-content",selector:"p-colorpicker-color-selector",color:"p-colorpicker-color",colorHandle:"p-colorpicker-color-handle",hue:"p-colorpicker-hue",hueHandle:"p-colorpicker-hue-handle"},B=H.extend({name:"colorpicker",classes:S}),D={name:"BaseColorPicker",extends:C,props:{modelValue:{type:null,default:null},defaultColor:{type:null,default:"ff0000"},inline:{type:Boolean,default:!1},format:{type:String,default:"hex"},disabled:{type:Boolean,default:!1},tabindex:{type:String,default:null},autoZIndex:{type:Boolean,default:!0},baseZIndex:{type:Number,default:0},appendTo:{type:[String,Object],default:"body"},panelClass:null},style:B,provide:function(){return{$parentInstance:this}}},x={name:"ColorPicker",extends:D,inheritAttrs:!1,emits:["update:modelValue","change","show","hide"],data:function(){return{overlayVisible:!1}},hsbValue:null,outsideClickListener:null,documentMouseMoveListener:null,documentMouseUpListener:null,scrollHandler:null,resizeListener:null,hueDragging:null,colorDragging:null,selfUpdate:null,picker:null,colorSelector:null,colorHandle:null,hueView:null,hueHandle:null,watch:{modelValue:{immediate:!0,handler:function(e){this.hsbValue=this.toHSB(e),this.selfUpdate?this.selfUpdate=!1:this.updateUI()}}},beforeUnmount:function(){this.unbindOutsideClickListener(),this.unbindDragListeners(),this.unbindResizeListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.picker&&this.autoZIndex&&p.clear(this.picker),this.clearRefs()},mounted:function(){this.updateUI()},methods:{pickColor:function(e){var t=this.colorSelector.getBoundingClientRect(),o=t.top+(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0),s=t.left+document.body.scrollLeft,i=Math.floor(100*Math.max(0,Math.min(150,(e.pageX||e.changedTouches[0].pageX)-s))/150),l=Math.floor(100*(150-Math.max(0,Math.min(150,(e.pageY||e.changedTouches[0].pageY)-o)))/150);this.hsbValue=this.validateHSB({h:this.hsbValue.h,s:i,b:l}),this.selfUpdate=!0,this.updateColorHandle(),this.updateInput(),this.updateModel(e)},pickHue:function(e){var t=this.hueView.getBoundingClientRect().top+(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0);this.hsbValue=this.validateHSB({h:Math.floor(360*(150-Math.max(0,Math.min(150,(e.pageY||e.changedTouches[0].pageY)-t)))/150),s:100,b:100}),this.selfUpdate=!0,this.updateColorSelector(),this.updateHue(),this.updateModel(e),this.updateInput()},updateModel:function(e){var t=this.modelValue;switch(this.format){case"hex":t=this.HSBtoHEX(this.hsbValue);break;case"rgb":t=this.HSBtoRGB(this.hsbValue);break;case"hsb":t=this.hsbValue;break}this.$emit("update:modelValue",t),this.$emit("change",{event:e,value:t})},updateColorSelector:function(){if(this.colorSelector){var e=this.validateHSB({h:this.hsbValue.h,s:100,b:100});this.colorSelector.style.backgroundColor="#"+this.HSBtoHEX(e)}},updateColorHandle:function(){this.colorHandle&&(this.colorHandle.style.left=Math.floor(150*this.hsbValue.s/100)+"px",this.colorHandle.style.top=Math.floor(150*(100-this.hsbValue.b)/100)+"px")},updateHue:function(){this.hueHandle&&(this.hueHandle.style.top=Math.floor(150-150*this.hsbValue.h/360)+"px")},updateInput:function(){this.$refs.input&&(this.$refs.input.style.backgroundColor="#"+this.HSBtoHEX(this.hsbValue))},updateUI:function(){this.updateHue(),this.updateColorHandle(),this.updateInput(),this.updateColorSelector()},validateHSB:function(e){return{h:Math.min(360,Math.max(0,e.h)),s:Math.min(100,Math.max(0,e.s)),b:Math.min(100,Math.max(0,e.b))}},HEXtoRGB:function(e){var t=parseInt(e.indexOf("#")>-1?e.substring(1):e,16);return{r:t>>16,g:(t&65280)>>8,b:t&255}},HEXtoHSB:function(e){return this.RGBtoHSB(this.HEXtoRGB(e))},RGBtoHSB:function(e){var t={h:0,s:0,b:0},o=Math.min(e.r,e.g,e.b),s=Math.max(e.r,e.g,e.b),i=s-o;return t.b=s,t.s=s!==0?255*i/s:0,t.s!==0?e.r===s?t.h=(e.g-e.b)/i:e.g===s?t.h=2+(e.b-e.r)/i:t.h=4+(e.r-e.g)/i:t.h=-1,t.h*=60,t.h<0&&(t.h+=360),t.s*=100/255,t.b*=100/255,t},HSBtoRGB:function(e){var t={r:null,g:null,b:null},o=Math.round(e.h),s=Math.round(e.s*255/100),i=Math.round(e.b*255/100);if(s===0)t={r:i,g:i,b:i};else{var l=i,r=(255-s)*i/255,u=(l-r)*(o%60)/60;o===360&&(o=0),o<60?(t.r=l,t.b=r,t.g=r+u):o<120?(t.g=l,t.b=r,t.r=l-u):o<180?(t.g=l,t.r=r,t.b=r+u):o<240?(t.b=l,t.r=r,t.g=l-u):o<300?(t.b=l,t.g=r,t.r=r+u):o<360?(t.r=l,t.g=r,t.b=l-u):(t.r=0,t.g=0,t.b=0)}return{r:Math.round(t.r),g:Math.round(t.g),b:Math.round(t.b)}},RGBtoHEX:function(e){var t=[e.r.toString(16),e.g.toString(16),e.b.toString(16)];for(var o in t)t[o].length===1&&(t[o]="0"+t[o]);return t.join("")},HSBtoHEX:function(e){return this.RGBtoHEX(this.HSBtoRGB(e))},toHSB:function(e){var t;if(e)switch(this.format){case"hex":t=this.HEXtoHSB(e);break;case"rgb":t=this.RGBtoHSB(e);break;case"hsb":t=e;break}else t=this.HEXtoHSB(this.defaultColor);return t},onOverlayEnter:function(e){this.updateUI(),this.alignOverlay(),this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),this.autoZIndex&&p.set("overlay",e,this.baseZIndex,this.$primevue.config.zIndex.overlay),this.$emit("show")},onOverlayLeave:function(){this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener(),this.clearRefs(),this.$emit("hide")},onOverlayAfterLeave:function(e){this.autoZIndex&&p.clear(e)},alignOverlay:function(){this.appendTo==="self"?d.relativePosition(this.picker,this.$refs.input):d.absolutePosition(this.picker,this.$refs.input)},onInputClick:function(){this.disabled||(this.overlayVisible=!this.overlayVisible)},onInputKeydown:function(e){switch(e.code){case"Space":this.overlayVisible=!this.overlayVisible,e.preventDefault();break;case"Escape":case"Tab":this.overlayVisible=!1;break}},onColorMousedown:function(e){this.disabled||(this.bindDragListeners(),this.onColorDragStart(e))},onColorDragStart:function(e){this.disabled||(this.colorDragging=!0,this.pickColor(e),this.$el.setAttribute("p-colorpicker-dragging","true"),!this.isUnstyled&&d.addClass(this.$el,"p-colorpicker-dragging"),e.preventDefault())},onDrag:function(e){this.colorDragging&&(this.pickColor(e),e.preventDefault()),this.hueDragging&&(this.pickHue(e),e.preventDefault())},onDragEnd:function(){this.colorDragging=!1,this.hueDragging=!1,this.$el.setAttribute("p-colorpicker-dragging","false"),!this.isUnstyled&&d.removeClass(this.$el,"p-colorpicker-dragging"),this.unbindDragListeners()},onHueMousedown:function(e){this.disabled||(this.bindDragListeners(),this.onHueDragStart(e))},onHueDragStart:function(e){this.disabled||(this.hueDragging=!0,this.pickHue(e),!this.isUnstyled&&d.addClass(this.$el,"p-colorpicker-dragging"))},isInputClicked:function(e){return this.$refs.input&&this.$refs.input.isSameNode(e.target)},bindDragListeners:function(){this.bindDocumentMouseMoveListener(),this.bindDocumentMouseUpListener()},unbindDragListeners:function(){this.unbindDocumentMouseMoveListener(),this.unbindDocumentMouseUpListener()},bindOutsideClickListener:function(){var e=this;this.outsideClickListener||(this.outsideClickListener=function(t){e.overlayVisible&&e.picker&&!e.picker.contains(t.target)&&!e.isInputClicked(t)&&(e.overlayVisible=!1)},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null)},bindScrollListener:function(){var e=this;this.scrollHandler||(this.scrollHandler=new y(this.$refs.container,function(){e.overlayVisible&&(e.overlayVisible=!1)})),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var e=this;this.resizeListener||(this.resizeListener=function(){e.overlayVisible&&!d.isTouchDevice()&&(e.overlayVisible=!1)},window.addEventListener("resize",this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},bindDocumentMouseMoveListener:function(){this.documentMouseMoveListener||(this.documentMouseMoveListener=this.onDrag.bind(this),document.addEventListener("mousemove",this.documentMouseMoveListener))},unbindDocumentMouseMoveListener:function(){this.documentMouseMoveListener&&(document.removeEventListener("mousemove",this.documentMouseMoveListener),this.documentMouseMoveListener=null)},bindDocumentMouseUpListener:function(){this.documentMouseUpListener||(this.documentMouseUpListener=this.onDragEnd.bind(this),document.addEventListener("mouseup",this.documentMouseUpListener))},unbindDocumentMouseUpListener:function(){this.documentMouseUpListener&&(document.removeEventListener("mouseup",this.documentMouseUpListener),this.documentMouseUpListener=null)},pickerRef:function(e){this.picker=e},colorSelectorRef:function(e){this.colorSelector=e},colorHandleRef:function(e){this.colorHandle=e},hueViewRef:function(e){this.hueView=e},hueHandleRef:function(e){this.hueHandle=e},clearRefs:function(){this.picker=null,this.colorSelector=null,this.colorHandle=null,this.hueView=null,this.hueHandle=null},onOverlayClick:function(e){g.emit("overlay-click",{originalEvent:e,target:this.$el})}},components:{Portal:k}},w=["tabindex","disabled"];function R(n,e,t,o,s,i){var l=L("Portal");return f(),h("div",a({ref:"container",class:n.cx("root")},n.ptmi("root")),[n.inline?b("",!0):(f(),h("input",a({key:0,ref:"input",type:"text",class:n.cx("input"),readonly:"readonly",tabindex:n.tabindex,disabled:n.disabled,onClick:e[0]||(e[0]=function(){return i.onInputClick&&i.onInputClick.apply(i,arguments)}),onKeydown:e[1]||(e[1]=function(){return i.onInputKeydown&&i.onInputKeydown.apply(i,arguments)})},n.ptm("input")),null,16,w)),v(l,{appendTo:n.appendTo,disabled:n.inline},{default:m(function(){return[v(M,a({name:"p-connected-overlay",onEnter:i.onOverlayEnter,onLeave:i.onOverlayLeave,onAfterLeave:i.onOverlayAfterLeave},n.ptm("transition")),{default:m(function(){return[n.inline||s.overlayVisible?(f(),h("div",a({key:0,ref:i.pickerRef,class:[n.cx("panel"),n.panelClass],onClick:e[10]||(e[10]=function(){return i.onOverlayClick&&i.onOverlayClick.apply(i,arguments)})},n.ptm("panel")),[c("div",a({class:n.cx("content")},n.ptm("content")),[c("div",a({ref:i.colorSelectorRef,class:n.cx("selector"),onMousedown:e[2]||(e[2]=function(r){return i.onColorMousedown(r)}),onTouchstart:e[3]||(e[3]=function(r){return i.onColorDragStart(r)}),onTouchmove:e[4]||(e[4]=function(r){return i.onDrag(r)}),onTouchend:e[5]||(e[5]=function(r){return i.onDragEnd()})},n.ptm("selector")),[c("div",a({class:n.cx("color")},n.ptm("color")),[c("div",a({ref:i.colorHandleRef,class:n.cx("colorHandle")},n.ptm("colorHandle")),null,16)],16)],16),c("div",a({ref:i.hueViewRef,class:n.cx("hue"),onMousedown:e[6]||(e[6]=function(r){return i.onHueMousedown(r)}),onTouchstart:e[7]||(e[7]=function(r){return i.onHueDragStart(r)}),onTouchmove:e[8]||(e[8]=function(r){return i.onDrag(r)}),onTouchend:e[9]||(e[9]=function(r){return i.onDragEnd()})},n.ptm("hue")),[c("div",a({ref:i.hueHandleRef,class:n.cx("hueHandle")},n.ptm("hueHandle")),null,16)],16)],16)],16)):b("",!0)]}),_:1},16,["onEnter","onLeave","onAfterLeave"])]}),_:1},8,["appendTo","disabled"])],16)}function V(n,e){e===void 0&&(e={});var t=e.insertAt;if(!(typeof document>"u")){var o=document.head||document.getElementsByTagName("head")[0],s=document.createElement("style");s.type="text/css",t==="top"&&o.firstChild?o.insertBefore(s,o.firstChild):o.appendChild(s),s.styleSheet?s.styleSheet.cssText=n:s.appendChild(document.createTextNode(n))}}var E=`
.p-colorpicker {
    display: inline-block;
}
.p-colorpicker-dragging {
    cursor: pointer;
}
.p-colorpicker-overlay {
    position: relative;
}
.p-colorpicker-panel {
    position: relative;
    width: 193px;
    height: 166px;
}
.p-colorpicker-overlay-panel {
    position: absolute;
    top: 0;
    left: 0;
}
.p-colorpicker-preview {
    cursor: pointer;
}
.p-colorpicker-panel .p-colorpicker-content {
    position: relative;
}
.p-colorpicker-panel .p-colorpicker-color-selector {
    width: 150px;
    height: 150px;
    top: 8px;
    left: 8px;
    position: absolute;
}
.p-colorpicker-panel .p-colorpicker-color {
    width: 150px;
    height: 150px;
}
.p-colorpicker-panel .p-colorpicker-color-handle {
    position: absolute;
    top: 0px;
    left: 150px;
    border-radius: 100%;
    width: 10px;
    height: 10px;
    border-width: 1px;
    border-style: solid;
    margin: -5px 0 0 -5px;
    cursor: pointer;
    opacity: 0.85;
}
.p-colorpicker-panel .p-colorpicker-hue {
    width: 17px;
    height: 150px;
    top: 8px;
    left: 167px;
    position: absolute;
    opacity: 0.85;
}
.p-colorpicker-panel .p-colorpicker-hue-handle {
    position: absolute;
    top: 150px;
    left: 0px;
    width: 21px;
    margin-left: -2px;
    margin-top: -5px;
    height: 10px;
    border-width: 2px;
    border-style: solid;
    opacity: 0.85;
    cursor: pointer;
}
`;V(E);x.render=R;export{x as default};
