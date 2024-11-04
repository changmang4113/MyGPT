import { useContext, useState } from 'react';
import { Stack, TextField, IconButton, Panel, DefaultButton } from '@fluentui/react';
import { Settings24Regular } from '@fluentui/react-icons';
import { AppStateContext } from '../../state/AppProvider';
import styles from './SystemMessageEditor.module.css';

export const SystemMessageEditor = () => {
    const [isOpen, setIsOpen] = useState(false);
    const appStateContext = useContext(AppStateContext);
    const [tempMessage, setTempMessage] = useState(appStateContext?.state.systemMessage || '');

    const onSave = () => {
        appStateContext?.dispatch({
            type: 'UPDATE_SYSTEM_MESSAGE',
            payload: tempMessage
        });
        setIsOpen(false);
    };

    return (
        <>
            <IconButton
                className={styles.settingsButton}
                iconProps={{ iconName: 'Settings' }}
                onClick={() => setIsOpen(true)}
                title="System Message Settings"
            />
            <Panel
                isOpen={isOpen}
                onDismiss={() => setIsOpen(false)}
                headerText="System Message Settings"
                closeButtonAriaLabel="Close"
            >
                <Stack tokens={{ childrenGap: 10 }}>
                    <TextField
                        label="System Message"
                        multiline
                        rows={10}
                        value={tempMessage}
                        onChange={(_, newValue) => setTempMessage(newValue || '')}
                    />
                    <DefaultButton onClick={onSave}>Save</DefaultButton>
                </Stack>
            </Panel>
        </>
    );
};