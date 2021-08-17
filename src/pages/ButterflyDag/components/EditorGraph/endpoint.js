import {Endpoint} from 'butterfly-dag';
import $ from 'jquery';

class BaseEndpoint extends Endpoint {
  draw(obj) {
    let point = super.draw(obj);
    if (obj.options && obj.options.color === 'system-gray') {
      // 系统灰色锚点
      $(point).addClass('system-gray-point');
    } else if (obj.options && obj.options.color === 'system-green') {
      // 系统锚点绿色
      $(point).addClass('system-green-point');
    }
    return point;
  }
}

export default BaseEndpoint;
