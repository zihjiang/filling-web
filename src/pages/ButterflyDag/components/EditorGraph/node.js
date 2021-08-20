
import {Node} from 'butterfly-dag';
import $ from 'jquery';
class BaseNode extends Node {
  constructor(opts) {
    super(opts);
    this.titleBox = null;
    this.state = {
    }

  }
  mounted() {
    if (this.grayDom_3) {
      this.addEndpoint({
        id: 'gamepad_0',
        dom: this.grayDom_3,
      });
    }
    if (this.greenDom_1) {
      this.addEndpoint({
        id: 'gamepad_1',
        dom: this.greenDom_1
      });
    }
    if (this.grayDom_2) {
      this.addEndpoint({
        id: 'gamepad_2',
        dom: this.grayDom_2
      });
    }
    if (this.logEventDom) {
      this.addEndpoint({
        id: 'log_event_01',
        dom: this.logEventDom,
      });
    }
    if (this.widEndpointDom) {
      this.addEndpoint({
        id: 'widgest_1',
        orientation: [1, 0],
        dom: this.widEndpointDom,
      });
    }
  }

  
  draw = (data) => {
    console.log('draw', data);
    console.log('draw this', this.options);
    let container = $('<div class= "test-base-node"></div>')
      .css('top', data.top)
      .css('left', data.left)
      .css('width', data.options.width)
      .css('height', 90);
    switch (this.options.PluginType) {
      case 'source' :
        this.logEventDom = $('<div class="butterflie-circle-endpoint system-green-point"></div>');
        break;
      case 'transfrom':
        this.logEventDom = $('<div class="custom-green-rectangle-point system-green-point"></div>');
        break;
      case 'sink':
        this.widEndpointDom = $(`<div class="custom-green-circle-point widgest-point_1"></div>`);
        break;
      default:
    }

    // if (this.logEventDom) {
    //   container.append(this.logEventDom);
    // }

    // if (this.widEndpointDom) {
    //   container.append(this.widEndpointDom);
    // }

    container.append(`<span class='text'>${data.options.text}</span>`);


    $(container).on('dblclick', () => {
      // paramsFrom
      window.selectNode = data;
      $("#ParamsFrom > div").trigger('click');
    });
    return container[0];
  }

  unFocus = () => {

  }
}
export default BaseNode;
