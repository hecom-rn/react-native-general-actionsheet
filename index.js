import React from 'react';
import { ActionSheetIOS, Platform } from 'react-native';
import ActionSheetContainer from './ActionSheetContainer';
import RootSiblings from 'react-native-root-siblings';

let instance = null;
let show = false;

const ActionSheet = {
    Container: ActionSheetContainer,
    useActionSheetIOS: true,
    showActionSheetWithOptions: (config, callback) => {
        if (show) {
            return;
        }
        if (Platform.OS === 'ios' && ActionSheet.useActionSheetIOS && !config.useRootSiblings) {
            show = true;
            ActionSheetIOS.showActionSheetWithOptions(config, (buttonIndex) => {
                show = false;
                callback && callback(buttonIndex);
            });
            return;
        }
        if (instance) {
            return;
        }
        instance = new RootSiblings(
            <ActionSheet.Container
                config={config}
                backgroundColor={config.backgroundColor}
                callback={(index) => {
                    instance && instance.destroy(() => {
                        instance = null;
                        setTimeout(() => {
                            callback && callback(index);
                        }, 100);
                    });
                }}
            />
        );
    },
};

export default ActionSheet;