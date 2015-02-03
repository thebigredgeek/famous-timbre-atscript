/*** PageView.js ***/

import View from 'famous/core/View';
import Surface from 'famous/core/Surface';
import Transform from 'famous/core/Transform';
import StateModifier from 'famous/modifiers/StateModifier';
import HeaderFooter from 'famous/views/HeaderFooterLayout';
import ImageSurface from 'famous/surfaces/ImageSurface';
import FastClick from 'famous/inputs/FastClick';
/*
  var View = require('famous/core/View');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');
  var HeaderFooter = require('famous/views/HeaderFooterLayout');
  var ImageSurface = require('famous/surfaces/ImageSurface');
  var FastClick = require('famous/inputs/FastClick');
*/
export class PageView extends View {

  constructor (data) {
    let self = this;
    super(data);
    self._createLayout();
    self._createHeader();
    self._createBody();
    self._createBacking();
    self._setListeners();
  }

  _createLayout () {
    let self = this;
    self.layout = new HeaderFooter({
      headerSize: self.options.headerSize
    });
    self.layoutModifier = new StateModifier({
      transform: Transform.translate(0, 0, 0.1)
    });
    self.add(self.layoutModifier).add(self.layout);
  }

  _createHeader () {
    let self = this;
    self.hamburgerSurface = new ImageSurface({
      size: [44, 44],
      content: 'img/hamburger.png'
    });

    var searchSurface = new ImageSurface({
      size: [232, 44],
      content: 'img/search.png'
    });

    var iconSurface = new ImageSurface({
      size: [44, 44],
      content: 'img/icon.png'
    });
    var backgroundSurface = new Surface({
      properties: {
        backgroundColor: 'black'
      }
    });

    var hamburgerModifier = new StateModifier({
      origin: [0, 0.5],
      align : [0, 0.5]
    });

    var searchModifier = new StateModifier({
      origin: [0.5, 0.5],
      align : [0.5, 0.5]
    });

    var iconModifier = new StateModifier({
      origin: [1, 0.5],
      align : [1, 0.5]
    });

    var backgroundModifier = new StateModifier({
      transform: Transform.behind
    });

    self.layout.header.add(hamburgerModifier).add(self.hamburgerSurface);
    self.layout.header.add(searchModifier).add(searchSurface);
    self.layout.header.add(iconModifier).add(iconSurface);
    self.layout.header.add(backgroundModifier).add(backgroundSurface);
  }

  _createBody () {
    let self = this;
    self.bodySurface = new ImageSurface({
      size : [undefined, true],
      content : 'img/body.png'
    });

    self.layout.content.add(self.bodySurface);
  }

  _createBacking () {
    let self = this;
    var backing = new Surface({
      properties: {
        backgroundColor: 'black',
        boxShadow: '0 0 20px rgba(0,0,0,0.5)'
      }
    });
    self.add(backing);
  }

  _setListeners () {
    let self = this;
    self.hamburgerSurface.on('click', function() {
      self._eventOutput.emit('menuToggle');
    });
    self.bodySurface.pipe(self._eventOutput);
  }

}

PageView.DEFAULT_OPTIONS = {
  headerSize: 44
};
