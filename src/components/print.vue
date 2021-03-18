<template>
  <div class="print">
    <iframe id="iframe" style="display: none;"></iframe>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class uiPrint extends Vue {
  private printHtml = "";
  private oldHtml = "";
  private iframe = "";

  print(html) {
    const document = window.document;
    this.iframe = window.frames[0];
    this.iframe.document.head.innerHTML = document.head.innerHTML; // 获取当前文档的头部给iframe
    this.printHtml = html.cloneNode(true);
    this.oldHtml = html;

    // 图片和样式加载完成
    Promise.all([this.loadCanvas(), this.loadStyle(), this.loadImage()]).then(
      res => {
        //   打印
        // 把传过来的html给iframe头部
        window.frames[0].window.print();
      }
    );
  }

  // 替换canvas
  loadCanvas() {
    const printCanvas = this.printHtml.getElementsByTagName("canvas"); // <img>
    const oldCanvas = this.oldHtml.getElementsByTagName("canvas"); // <img>
    let parentNode = [];
    for (let i = 0, length = printCanvas.length; i < length; i++) {
      parentNode.push(printCanvas[i].parentNode);
    }

    return new Promise((resolve, reject) => {
      let nowLength = 0;
      let totalLenth = printCanvas.length;
      for (let i = 0; i < totalLenth; i++) {
        let img = new Image();
        img.onload = () => {
          parentNode[nowLength].removeChild(printCanvas[0]);
          parentNode[nowLength].appendChild(img);
          // 替换完成
          nowLength++;
          if (nowLength === totalLenth) {
            window.frames[0].document.body.innerHTML = this.printHtml.innerHTML;
            resolve(true);
          }
        };

        img.src = oldCanvas[i].toDataURL("image/jpg");
      }
    });
  }

  // 加载样式
  loadStyle() {
    const iframe = window.frames[0];
    const styles = iframe.document.head.getElementsByTagName("style"); // <style>
    const links = iframe.document.head.getElementsByTagName("link"); // <link>
    let arrs = [];
    arrs = arrs.concat(...styles, ...links);

    return new Promise((resolve, reject) => {
      for (let i = 0; i < arrs.length; i++) {
        arrs[i].onload = function() {
          if (i === arrs.length - 1) {
            resolve(true);
          }
        };
      }
    });
  }

  // 加载图片
  loadImage() {
    let imgs = window.frames[0].document.body.getElementsByTagName("img"); // <img>
    return new Promise((resolve, reject) => {
      for (let i = 0; i < imgs.length; i++) {
        imgs[i].onload = function() {
          if (i === imgs.length - 1) {
            resolve(true);
          }
        };
      }

      setTimeout(() => {
        resolve(true);
      }, 100);
    });
  }
}
</script>
