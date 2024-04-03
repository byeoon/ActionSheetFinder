import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { React } from 'enmity/metro/common';
import { getByProps } from 'enmity/metro';
import { create } from 'enmity/patcher';
import manifest from '../manifest.json';
import Settings from './components/Settings';

const Patcher = create('ActionSheetFinder');
const LazyActionSheet = getByProps("openLazy", "hideActionSheet");
const ActionSheetFinder: Plugin = {
   ...manifest,

   onStart() {
      const unpatchOpenLazy = Patcher.before(LazyActionSheet, 'openLazy', (_, [component, key]) => {
         return console.log("[ActionSheetFinder] Found actionsheet: " + key);
         unpatchOpenLazy();
      });
   },

   onStop() {
      Patcher.unpatchAll();
   },

   getSettingsPanel({ settings }) {
      return <Settings settings={settings} />;
   }
};

registerPlugin(ActionSheetFinder);
