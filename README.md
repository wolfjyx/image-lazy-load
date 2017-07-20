# image-lazy-load
图片懒加载组件

支持AMD、commonjs,以及外联script调用  
调用实例 


           var load = new  LazyLoadImg({
                               offsetLeft:"",
                               offsetBottom:"",
                               offsetRight:"",
                               offsetTop:"",
                               timer:"",
                               container:"",
                               selector:""
                           });
                           
 
   /**  
    * @param  {Number} offsetLeft 容器距左边距离  
    * @param  {Number} offsetBottom 容器距下边距离  
    * @param  {Number} offsetRight 容器距右边距离  
    * @param  {Number} offsetTop 容器距上边距离  
    * @param  {Number} timer     scroll每次执行间隔时间  
    * @param  {dom} container 根元素  
    * @param  {string} selector 放置图片地址的元素属性名  
    */  
