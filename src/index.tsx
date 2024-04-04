import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { getByProps } from 'enmity/metro';
import { Toasts } from 'enmity/metro/common';
import {getIDByName} from "enmity/api/assets";
import { create } from 'enmity/patcher';
import manifest from '../manifest.json';

const Patcher = create('ActionSheetFinder');
const LazyActionSheet = getByProps("openLazy", "hideActionSheet");

function SheetOutput(text) {
   console.log("[ActionSheetFinder] Found ActionSheet: " + text); 

   Toasts.open({
      content: "[ActionSheetFinder] Found ActionSheet: " + text,
      icon: getIDByName('Check')
   });
}


const ActionSheetFinder: Plugin = {
   ...manifest,

   onStart() {
      console.log("[ActionSheetFinder] Hello world!")
      const unpatchOpenLazy = Patcher.before(LazyActionSheet, 'openLazy', (_, [component, key]) => {
         return SheetOutput(key); 
         unpatchOpenLazy();
      });
   },
   onStop() {
      Patcher.unpatchAll();
   },
};

registerPlugin(ActionSheetFinder);
