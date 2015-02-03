import Engine from 'famous/core/Engine';
import {AppView} from 'views/AppView';

export function main () {
  var mainContext = Engine.createContext();
  var appView = new AppView();
  mainContext.add(appView);
}
