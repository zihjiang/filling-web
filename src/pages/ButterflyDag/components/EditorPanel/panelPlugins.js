import _ from 'lodash';
import $ from 'jquery';

import BaseNode from '../EditorGraph/node';

import './index.less';

class panelPlugins {
  constructor() {
    // 渲染的一次的img数组（包括内置的和用户注册的）
    this.imgData = [];
    // 用户注册内容的数组
    this.userImgData = [];
    // 绑定过的canvas，用于防止重复绑定
    this.addCanvas = [];
  }

  guid = () => {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4());
  }

  addNode = (canvas, node) => {
    canvas.addNode(node);
  }

  register = (registerArray, callback) => {
    if (!_.isArray(registerArray)) {
      console.warn('register数据必须是数组', registerArray);
      return;
    }

    for (let registerData of registerArray) {
      if (!registerData.root) {
        console.warn('register数据root字段不存在=>', registerData);
        break;
      }
      if (!registerData.canvas) {
        console.warn('register数据canvas字段不存在=>', registerData);
        break;
      }

      if (registerData.data) {
        for (let item of registerData.data) {
          item.width = item.width || 36;
          item.height = item.height || 36;
          this.imgData.push(item);
          this.userImgData.push(item);
        }
      }

      for (let item of this.imgData) {
        let nodeItem = $('<div class="panel-node-dnd" drag></div>')
          .css('width', item.width + 'px')
          .css('height', item.height + 'px');

        let img = new Image();
        img.src = item.content;

        let jqImg = $(img).addClass('panel-img');
        jqImg.on('dragstart', (e) => {
          e.originalEvent.dataTransfer.setData('id', item.id + '-' + this.guid());
          e.originalEvent.dataTransfer.setData('originId', item.id);
          // e.originalEvent.dataTransfer.setData('data', JSON.stringify(item.Data));
          e.originalEvent.dataTransfer.setData('pluginType', item['pluginType']);
          e.originalEvent.dataTransfer.setData('pluginName', item['pluginName']);
          e.originalEvent.dataTransfer.setData('pluginOptions', JSON.stringify(item['pluginOptions']));

          e.originalEvent.dataTransfer.setData('endpoints', JSON.stringify(item['endpoints']));
          e.originalEvent.dataTransfer.setDragImage(img, 0, 0);
        })

        nodeItem.append(img);
        nodeItem.append(`<div class='panel-lab'> ${item['text']} </div>`);
        $(registerData.root).append(nodeItem);
      }

      if (!this.addCanvas.includes(registerData.canvas.root)) {
        this.addCanvas.push(registerData.canvas.root);

        $(registerData.canvas.root).on('dragover', (e) => {
          e.preventDefault();
        });

        $(registerData.canvas.root).on('drop', (e) => {
          let { clientX, clientY } = e;
          let coordinates = registerData.canvas.terminal2canvas([clientX, clientY]);
          let id = e.originalEvent.dataTransfer.getData('id');
          let content = e.originalEvent.dataTransfer.getData('originId');
          // let data = JSON.parse(e.originalEvent.dataTransfer.getData('data'));

          let endpoints = JSON.parse(e.originalEvent.dataTransfer.getData('endpoints'));
          let PluginType = e.originalEvent.dataTransfer.getData('PluginType');
          let pluginName = e.originalEvent.dataTransfer.getData('pluginName');
          let pluginOptions = e.originalEvent.dataTransfer.getData('pluginOptions');

          let text = pluginName;

          let node = {
            id,
            left: coordinates[0],
            top: coordinates[1],
            Class: BaseNode,
            pluginName: pluginName,
            pluginOptions: pluginOptions,
            // Data: data,
            PluginType: PluginType,
            endpoints: endpoints,
            content,
            text: text
          }

          this.addNode(registerData.canvas, node);

        });
      }

      this.imgData = [];

    };

    if (_.isFunction(callback)) {
      callback();
    }

  }

}

let panelPluginsInstance = new panelPlugins();
panelPluginsInstance.PanelNode = BaseNode;

console.log(panelPluginsInstance);

export { panelPluginsInstance };