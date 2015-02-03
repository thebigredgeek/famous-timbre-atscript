/*** MenuView.js ***/

import View from 'famous/core/View';
import Surface from 'famous/core/Surface';
import Transform from 'famous/core/Transform';
import StateModifier from 'famous/modifiers/StateModifier';
import Timer from 'famous/utilities/Timer';

import {StripView} from 'views/StripView';

/*
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Timer = require('famous/utilities/Timer');
    var StripView     = require('views/StripView');
 */

export class MenuView extends View {
  constructor (data) {
    let self = this;
    super(data);
    self._createStripViews();
  }
  animateStrips () {
    let self = this;
    self.resetStrips();
    var delay = self.options.staggerDelay;
    for(var i = 0; i < self.stripModifiers.length; i++) {
      Timer.setTimeout(self._getTimer(i), i * delay);
    }
  }
  resetStrips () {
    let self = this;
    for(var i = 0; i < self.stripModifiers.length; i++) {
      var initX = -self.options.stripWidth;
      var initY = self.options.topOffset
        + self.options.stripOffset * i
        + self.options.stripWidth * Math.tan(-self.options.angle);

      self.stripModifiers[i].setTransform(Transform.translate(initX, initY, 0));
    }
  }
  _getTimer (i) {
    let self = this;
    return function () {
      var stripOffset = self.options.stripOffset;
      var topOffset = self.options.topOffset;
      var transition = self.options.transition;
      var yOffset = topOffset + stripOffset * i;
      self.stripModifiers[i].setTransform(
        Transform.translate( 0, yOffset, 0),
        transition
      );
    }
  }
  _createStripViews () {
    let self = this;
    self.stripModifiers = [];
    var yOffset = self.options.topOffset;

    for (var i = 0; i < self.options.stripData.length; i++) {
      var stripView = new StripView({
        iconUrl: self.options.stripData[i].iconUrl,
        title: self.options.stripData[i].title
      });

      var stripModifier = new StateModifier({
        transform: Transform.translate(0, yOffset, 0)
      });

      self.stripModifiers.push(stripModifier);
      self.add(stripModifier).add(stripView);

      yOffset += this.options.stripOffset;
    }
  }
}

MenuView.DEFAULT_OPTIONS = {
  stripData: {},
  angle: -0.2,
  stripWidth: 320,
  stripHeight: 54,
  topOffset: 37,
  stripOffset: 58,
  staggerDelay: 35,
  transition: {
      duration: 400,
      curve: 'easeOut'
  }
};
