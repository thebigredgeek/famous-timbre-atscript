/*** StripView.js ***/

import View from 'famous/core/View';
import Surface from 'famous/core/Surface';
import Transform from 'famous/core/Transform';
import StateModifier from 'famous/modifiers/StateModifier';
import ImageSurface from 'famous/surfaces/ImageSurface';

/*
  var View          = require('famous/core/View');
  var Surface       = require('famous/core/Surface');
  var Transform     = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');
  var ImageSurface  = require('famous/surfaces/ImageSurface');
 */

export class StripView extends View {
  constructor (data) {
    let self = this;
    super(data);
    self._createBackground();
    self._createIcon();
    self._createTitle();
  }

  _createBackground () {
    let self = this;
    var backgroundSurface = new Surface({
      size: [self.options.width, self.options.height],
      properties: {
        backgroundColor: 'black',
        // on certain devices, a skewed surface can have jagged edges
        // the 1px box-shadow provides some anti-aliasing to soften this
        boxShadow: '0 0 1px rgba(0,0,0,1)',
      }
    });

    var rotateModifier = new StateModifier({
      transform: Transform.rotateZ(self.options.angle)
    });

    var skewModifier = new StateModifier({
      transform: Transform.skew(0, 0, self.options.angle)
    });

    // we're first skewing our surface then rotating it
    self.add(rotateModifier).add(skewModifier).add(backgroundSurface);
  }

  _createIcon () {
    let self = this;
    var iconSurface = new ImageSurface({
      size: [self.options.iconSize, self.options.iconSize],
      content : self.options.iconUrl,
      properties: {
        pointerEvents : 'none'
      }
    });

    var iconModifier = new StateModifier({
      // places the icon in the proper location
      transform: Transform.translate(24, 2, 0)
    });

    self.add(iconModifier).add(iconSurface);
  }

  _createTitle () {
    let self = this;
    var titleSurface = new Surface({
      size: [true, true],
      content: self.options.title,
      properties: {
        color: 'white',
        fontSize: self.options.fontSize + 'px',
        textTransform: 'uppercase',
        pointerEvents : 'none'
      }
    });

    var titleModifier = new StateModifier({
      transform: Transform.thenMove(Transform.rotateZ(self.options.angle), [75, -5, 0])
    });

    self.add(titleModifier).add(titleSurface);
  }

}

StripView.DEFAULT_OPTIONS = {
  width: 320,
  height: 55,
  angle: -0.2,
  iconSize: 32,
  iconUrl: 'img/strip-icons/starred.png',
  title: 'Famo.us',
  fontSize: 26,
};

