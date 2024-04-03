import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { getByProps } from 'enmity/metro';
import { create } from 'enmity/patcher';
import manifest from '../manifest.json';

const Patcher = create('ActionSheetFinder');
const LazyActionSheet = getByProps("openLazy", "hideActionSheet");
const ActionSheetFinder: Plugin = {
   ...manifest,

   onStart() {
      console.log("[ActionSheetFinder] Hello world!")
      const unpatchOpenLazy = Patcher.before(LazyActionSheet, 'openLazy', (_, [component, key]) => {
         return console.log("[ActionSheetFinder] Found ActionSheet: " + key);
         unpatchOpenLazy();
      });
   },
   onStop() {
      Patcher.unpatchAll();
   },
};

registerPlugin(ActionSheetFinder);
