import VirtualScroll from "virtual-scroll";
import Raf from "raf"

export default class DelayHorizontalScroller {
  constructor(opts) {
    this._bind();

    this.options = Object.assign({
			container: opts.container,
			item: opts.item,
      delayItem: opts.delayItem || []
		}, opts);

    this.elements = {
      container: document.querySelector(this.options.container),
      itens: document.querySelectorAll(this.options.item),
      roller: document.createElement("div")
    }

    this.virtualScroll = new VirtualScroll({
      "passive": false
    });

    this.vars = {
      "scrollValue": 0,
      "oldScrollValue": 0,
      "delayCount": []
    }

    this.raf = Raf;

    this._setItemPosition();
    this._setEvents();
  }

  _setItemPosition() {
    Object.assign(document.body.style, {
      "overflow": "hidden"
    });

    this.elements.roller.setAttribute("class", "horizontal-scroller");

    Object.assign(this.elements.roller.style, {
      "display": "table",
      "transition": "transform .5s ease-in-out"
    });

    Object.assign(this.elements.container.style, {
      "position": "relative",
      "white-space": "nowrap"
    });

    Array.prototype.forEach.call(this.elements.itens, block => {
      block.style.display = "inline-block";
      this.elements.container.replaceChild(this.elements.roller, block);
      this.elements.roller.appendChild(block);
    })

    this.elements.container.appendChild(this.elements.roller);
  }

  _bind() {
    this._animate = this._animate.bind(this);
  }

  _setEvents() {
    this.virtualScroll.on(this._onScroll, this);
    this.raf(this._animate);
  }

  _onScroll(e) {
    document.getElementById("logger").innerHTML = JSON.stringify(e);
    var deltaY = e.deltaY;

    this.vars.scrollValue += deltaY;

    var widthContainer = this.elements.container.clientWidth;
    var widthRoller = this.elements.roller.clientWidth;
    var widthScroll = widthContainer - widthRoller;

    if(this.vars.scrollValue < widthScroll) {
      this.vars.scrollValue = widthScroll;
    } else if(this.vars.scrollValue > 0) {
      this.vars.scrollValue = 0;
    }
  }

  _animate() {
    if(this.vars.scrollValue == this.vars.oldScrollValue) {
      this.elements.roller.style.transform = `translateX(${this.vars.scrollValue}px)`;

    }

    var delayItem = this.options.delayItem;
    var delayValue = this.vars.oldScrollValue - this.vars.scrollValue;

    for(var i=0;i<delayItem.length;i++){
      this._delay(delayItem[i], i, delayValue);
    }

    this.vars.oldScrollValue = this.vars.scrollValue;

    this.raf(this._animate);
  }

  _delay(options, index, value) {
    var delayItens = document.querySelectorAll(options.selector)
    if(value){
      this.vars.delayCount[index] = 0;
      for(var i=0;i<delayItens.length;i++){
        Object.assign(delayItens[i].style, {
          "transform": `translateX(${value}px)`,
          "transition": "transform .5s ease-in-out"
        });
      }
    } else {
      this.vars.delayCount[index] += 1;
    }

    if(this.vars.delayCount[index] == options.delayTime){
      for(var i=0;i<delayItens.length;i++){
        Object.assign(delayItens[i].style, {
          "transform": `translateX(${value}px)`
        });
      }
    }
  }
}
