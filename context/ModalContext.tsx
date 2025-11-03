import { createContext, ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogOverlay } from "tamagui";

type ModalType = 'alert' | 'dialog';

interface ModalConfig {
  type: ModalType;
  title: string;
  description?: string;
  content: ReactNode;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

interface ModalContextValue {
  showModal: (config: ModalConfig) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const showModal = (config: ModalConfig) => {
    setModalConfig(config);
    setOpen(true);
  }

  const hideModal = () => {
    setOpen(false);
    setTimeout(() => setModalConfig(null), 300);
  }

  const handleConfirm = async () => {
    if(modalConfig?.onConfirm) {
      await modalConfig.onConfirm();
    }

    hideModal();
  }

  const handleCancel = async () => {
    modalConfig?.onCancel?.();
    hideModal();
  }

  return (
    <ModalContext.Provider  value={{ showModal, hideModal }}>
      {children}

      {
        modalConfig?.type === 'dialog' && (
          <Dialog
            modal={true}
            open={open}
            onOpenChange={setOpen}
          >
            <DialogOverlay 
              key={'overlay'}
              animation={'quick'}
              opacity={0.5}
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
              onPress={hideModal}
            />

            <DialogContent
              bordered={true}
              elevate={true}
              key="content"
              animateOnly={["transform", "opacity"]}
              animation={[
                "quick",
                {
                  opacity: {
                    overshootClamping: true,
                  }
                }
              ]}
              enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
              exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
              gap="$4"
            >
              
            </DialogContent>
          </Dialog>
        )
      }
    </ModalContext.Provider>
  )
}