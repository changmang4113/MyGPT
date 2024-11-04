import { useContext, useState } from 'react';
import { Stack, Dropdown, IDropdownOption, Panel, IconButton } from '@fluentui/react';
import { AppStateContext } from '../../state/AppProvider';
import styles from './ModelSelector.module.css';

interface AIModel {
    key: string;  // keyをstring型に限定
    text: string;
    endpoint: string;
    deploymentName: string;
}

const availableModels: AIModel[] = [
    {
        key: 'gpt-4o',
        text: 'GPT-4 Optimized',
        endpoint: 'https://aoai-mygpt4tkgreen03s.openai.azure.com/',
        deploymentName: 'gpt-4o'
    },
    {
        key: 'gpt-35',
        text: 'GPT-3.5 Turbo',
        endpoint: 'https://aoai-mygpt4tkgreen03s.openai.azure.com/',
        deploymentName: 'gpt-35'
    }
];

// ドロップダウン用のオプションを作成
const modelOptions: IDropdownOption[] = availableModels.map(model => ({
    key: model.key,
    text: model.text
}));

export const ModelSelector = () => {
    const [isOpen, setIsOpen] = useState(false);
    const appStateContext = useContext(AppStateContext);
    const [selectedModel, setSelectedModel] = useState<string>(appStateContext?.state.model || availableModels[0].key);

    // onModelChangeの型を修正
    const onModelChange = (_: any, option?: IDropdownOption): void => {
        if (option && typeof option.key === 'string') {  // keyがstring型であることを確認
            const selectedModelConfig = availableModels.find(model => model.key === option.key);
            if (selectedModelConfig) {
                appStateContext?.dispatch({
                    type: 'UPDATE_MODEL_CONFIG',
                    payload: {
                        model: selectedModelConfig.key,
                        endpoint: selectedModelConfig.endpoint,
                        deploymentName: selectedModelConfig.deploymentName
                    }
                });
                setSelectedModel(option.key);
            }
        }
    };

    return (
        <>
            <IconButton
                className={styles.modelButton}
                iconProps={{ iconName: 'Robot' }}
                onClick={() => setIsOpen(true)}
                title="Select AI Model"
            />
            <Panel
                isOpen={isOpen}
                onDismiss={() => setIsOpen(false)}
                headerText="AI Model Settings"
                closeButtonAriaLabel="Close"
            >
                <Stack tokens={{ childrenGap: 10 }}>
                    <Dropdown
                        label="Select Model"
                        selectedKey={selectedModel}
                        options={modelOptions}
                        onChange={onModelChange}
                    />
                    {selectedModel && (
                        <div className={styles.modelInfo}>
                            <p>Selected Model: {availableModels.find(m => m.key === selectedModel)?.text}</p>
                            <p className={styles.endpoint}>
                                Endpoint: {availableModels.find(m => m.key === selectedModel)?.endpoint}
                            </p>
                        </div>
                    )}
                </Stack>
            </Panel>
        </>
    );
};