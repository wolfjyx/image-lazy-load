/**
 * Created by wolfjyx on 2017/3/30.
 */

;(function (global,factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports= factory():
      typeof define === 'function' && define.amd ? define(factory):
  (global.LazyLoadImg=factory());
}(this,function () {
  'use strict';

  function addHandler (el,type,handler) {
    if(el.addEventListener){
      el.addEventListener(type,handler,false);
    }else if(el.attachEvent){
      el.attachEvent('on'+type,handler);
    }else {
      el['on+type'] = handler;
    }
  }
  function debounce(func, wait, immediate,self) {
    var timeout;
    return function() {
      var context = self||this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  /**
   * @param  {Number} offsetLeft 容器距左边距离
   * @param  {Number} offsetBottom 容器距下边距离
   * @param  {Number} offsetRight 容器距右边距离
   * @param  {Number} offsetTop 容器距上边距离
   * @param  {Number} timer     scroll每次执行间隔时间
   * @param  {dom} container 根元素
   * @param  {string} selector 放置图片地址的元素属性名
   */
  var LazyLoadImg = function (opts) {
    var top=0,bottom=0,right=0,left=0,timer=300,
        container=document.body,
        selector='data-src';
    if(opts) {
      if(opts.offsetLeft &&  Number(opts.offsetLeft) !=='number'){
        throw new Error('offsetLeft should be number');
        left = Number(opts.offsetLeft);
      }
      if(opts.offsetBottom &&  Number(opts.offsetBottom) !=='number'){
        throw new Error('offsetBottom should be number');
        bottom = Number(opts.offsetBottom);
      }
      if(opts.offsetRight && Number(opts.offsetRight) !=='number'){
        throw new Error('offsetRight should be number');
        right = Number(opts.offsetRight);
      }
      if(opts.offsetTop && Number(opts.offsetTop) !== 'number'){
        throw new Error('offsetBottom should be number');
       top= Number(opts.offsetTop);
      }
      if(opts.timer && Number(opts.timer) !=='number'){
        throw new Error('offsetLeft should be number');
        timer =  Number(opts.timer);
      }
      if(opts.container && opts.container.nodeType != 1){
        throw new Error('container should be html element');
        container = opts.container;
      }
      if(opts.selector && typeof  opts.container.selector !== 'string'){
        throw new Error('selector should be string');
        selector = opts.selector;
      }
    }
    this.opts = {
      offsetLeft:left,
      offsetBottom:bottom,
      offsetRight:right,
      offsetTop:top,
      timer:timer,
      container:container,
      selector:selector
    };
    this.view = {};
    this.init();
  };

  LazyLoadImg.prototype = {
    contructor: LazyLoadImg,
    init:function () {
      this.view = {
        left:0+this.opts.offsetLeft,
        top:0+this.opts.offsetTop ,
        bottom:this.opts.container.clientHeight-this.opts.offsetBottom,
        right:this.opts.container.clientWidth-this.opts.offsetRight
      };
      this.change();
      addHandler(this.opts.container,'scroll',debounce(this.change,this.opts.timer,false,this))
    },
    isHidden:function (ele) {
      return ele.offsetParent===null;
    },
    inView:function (ele,view) {
      if(this.isHidden(ele)){
        return false;
      }
      var box = ele.getBoundingClientRect();
      return (box.right>= view.left && box.bottom >= view.top && box.left <= view.right && box.top <= view.bottom);
    },
    change:function () {
      var nodes = document.querySelectorAll('['+this.opts.selector+']');
      var length = nodes.length;
      var elem,originImage ;
      var view  =this.view;
      for(var i=0;i<length;i++){
        elem = nodes[i];
        if(this.inView(elem,view)){
          originImage  = elem.getAttribute(this.opts.selector);
          if(originImage){
            elem.src = originImage;
            elem.removeAttribute(this.opts.selector);
          }
        }
      }
    }
  }
  return LazyLoadImg;
}));
