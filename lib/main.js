
import Famous from 'famous';
import {AppView} from 'views/AppView';

export function main () {
  var mainContext = Famous.core.Engine.createContext();
  var appView = new AppView();
  mainContext.add(appView);
}
