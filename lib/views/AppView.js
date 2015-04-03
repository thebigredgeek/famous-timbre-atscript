/*** AppView.js ***/

import Famous from 'famous';
import {PageView} from 'views/PageView';
import {MenuView} from 'views/MenuView';
import {StripData} from 'data/StripData';

var View = Famous.core.View
  , Surface = Famous.core.Surface
  , Transform = Famous.core.Transform
  , StateModifier = Famous.modifiers.StateModifier
  , Modifier = Famous.core.Modifier
  , Transitionable = Famous.transitions.Transitionable
  , GenericSync = Famous.inputs.GenericSync
  , MouseSync = Famous.inputs.MouseSync
  , TouchSync = Famous.inputs.TouchSync;

/*import View from 'famous/core/View';
import Surface from 'famous/core/Surface';
import Transform from 'famous/core/Transform';
import StateModifier from 'famous/modifiers/StateModifier';
import Modifier from 'famous/core/Modifier';
import Transitionable from 'famous/transitions/Transitionable';
import GenericSync from 'famous/inputs/GenericSync';
import MouseSync from 'famous/inputs/MouseSync';
import TouchSync from 'famous/inputs/TouchSync';*/


GenericSync.register({'mouse': MouseSync, 'touch': TouchSync});

export class AppView extends View {
  constructor (data) {
    let self = this;
    super(data);
    self.menuToggle = false;
    self.pageViewPos = new Transitionable(0);

    self._createPageView();
    self._createMenuView();
    self._setListeners();
    self._handleSwipe();
  }
  _createPageView () {
    let self = this;
    self.pageView = new PageView();
    self.pageModifier = new Modifier({
      transform: function() {
        return Transform.translate(self.pageViewPos.get(), 0, 0);
      }
    });
    self.add(self.pageModifier).add(self.pageView);
  }
  _createMenuView () {
    let self = this;
    self.menuView = new MenuView({stripData: StripData});
    var menuModifier = new StateModifier({
      transform: Transform.behind
    });
    self.add(menuModifier).add(self.menuView);
  }
  _setListeners () {
    let self = this;
    self.pageView.on('menuToggle', self.toggleMenu.bind(self));
  }
  _handleSwipe () {
    let self = this;

    var sync = new GenericSync(
      ['mouse', 'touch'],
      {direction : GenericSync.DIRECTION_X}
    );

    self.pageView.pipe(sync);

    sync.on('update', function(data) {
      var currentPosition = self.pageViewPos.get();
      if(currentPosition === 0 && data.velocity > 0) {
        self.menuView.animateStrips();
      }
      self.pageViewPos.set(Math.max(0, currentPosition + data.delta));
    });

    sync.on('end', function(data) {
      var velocity = data.velocity;
      var position = self.pageViewPos.get();
      if(position > self.options.posThreshold) {
        if(velocity < -self.options.velThreshold) {
          self.slideLeft();
        } else {
          self.slideRight();
        }
      } else {
        if(velocity > self.options.velThreshold) {
          self.slideRight();
        } else {
          self.slideLeft();
        }
      }
    });
  }
  slideRight () {
    let self = this;
    self.pageViewPos.set(self.options.openPosition, self.options.transition, function() {
      self.menuToggle = true;
    });
  }
  slideLeft () {
    let self = this;
    self.pageViewPos.set(0, self.options.transition, function() {
      self.menuToggle = false;
    });
  }
  toggleMenu () {
    let self = this;
    if(self.menuToggle) {
      self.slideLeft();
    } else {
      self.slideRight();
      self.menuView.animateStrips();
    }
  }
}

AppView.DEFAULT_OPTIONS = {
  openPosition: 276,
  transition: {
    duration: 300,
    curve: 'easeInOut'
  },
  posThreshold: 138,
  velThreshold: 0.75
};
