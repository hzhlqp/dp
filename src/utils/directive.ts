export const clickOutSide = {
  // 初始化指令
  bind(el: any, binding: any, node: any) {
    function documentHandler(e: any) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        node.context.controlLogout(!node.context.isShowLogout);
      } else {
        // 如果绑定了函数 则调用那个函数
        node.context.controlLogout(false);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener("click", documentHandler);
  },
  update() {},
  unbind(el: any, binding: any) {
    // 解除事件监听
    document.removeEventListener("click", el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  }
};
