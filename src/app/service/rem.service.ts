import { Injectable } from '@angular/core';

@Injectable()
export class RemService {

  constructor() { }

  dpr: number = window.devicePixelRatio || 1;
  docEl: any = document.documentElement;//根元素
  rem: number;
  fontSize: number;
  metaEl: any = document.querySelector('meta[name="viewport"]');
  setDpr(): void{
    // 假设在设计图宽度是375px，10rem等于375px，那么 1rem = 37.5px
    this.rem = this.docEl.clientWidth*this.dpr/10;
    // 为了达到 1rem = 20px便于计算
    this.fontSize = this.rem/this.dpr*(20/37.5);
    // 设置data-dpr属性，留作的css hack之用
    this.docEl.setAttribute('data-dpr', this.dpr);
    if(this.docEl.clientWidth>=640){
      this.fontSize = 64;
    }
    this.docEl.setAttribute('style','font-size:' + this.fontSize + 'px!important;');
    // 设置viewport
    this.metaEl.setAttribute('content', 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0');
    // 给js调用的，某一dpr下rem和px之间的转换函数
    window['rem2px'] = (v => {
      v = parseFloat(v);
      return v * this.rem;
    });
    window['px2rem'] = (v => {
      v = parseFloat(v);
      return v / this.rem;
    });
    window['dpr'] = this.dpr;
    window['rem'] = this.rem;
  }
}
