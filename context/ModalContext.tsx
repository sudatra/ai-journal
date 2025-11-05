import { AlertTriangle, Info } from "@tamagui/lucide-icons";
import { createContext, ReactNode, useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogOverlay, AlertDialogTitle, Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogTitle, XStack, YStack } from "tamagui";

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
              <YStack
                gap={'$3'}
                style={{ alignItems: 'center' }}
              >
                <Info 
                  size={48}
                  color={'$purple10'}
                />

                <DialogTitle style={{ textAlign: 'center' }}>
                  {modalConfig.title}
                </DialogTitle>
              </YStack>

              {
                modalConfig.description && (
                  <DialogDescription style={{ textAlign: 'center' }}>
                    {modalConfig.description}
                  </DialogDescription>
                )
              }

              {modalConfig.content}

              <XStack
                pb={'$4'}
                gap={'$3'}
                style={{ justifyContent: 'center' }}
              >
                <DialogClose
                  displayWhenAdapted
                  asChild
                >
                  <Button
                    onPress={handleConfirm}
                    flex={1}
                  >
                    {modalConfig.cancelText || 'Cancel'}
                  </Button>
                </DialogClose>

                {
                  modalConfig.onConfirm && (
                    <DialogClose
                      displayWhenAdapted
                      asChild
                    >
                      <Button
                        onPress={handleConfirm}
                        flex={1}
                      >
                        {modalConfig.confirmText || 'Confirm'}
                      </Button>
                    </DialogClose>
                  )
                }
              </XStack>
            </DialogContent>
          </Dialog>
        )
      }

      {
        modalConfig?.type === 'alert' && (
          <AlertDialog
            modal={true}
            open={open}
            onOpenChange={setOpen}
          >
            <AlertDialogOverlay 
              key={'overlay'}
              animation={'lazy'}
              opacity={0.5}
              enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
              exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
              onPress={hideModal}
            />

            <AlertDialogContent
              bordered={true}
              elevate={true}
              key="content"
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
              <YStack
                gap={'$3'}
                style={{ alignItems: 'center' }}
              >
                <AlertTriangle 
                  size={48}
                  color={'$red10'}
                />

                <AlertDialogTitle style={{ textAlign: 'center' }}>
                  {modalConfig.title}
                </AlertDialogTitle>
              </YStack>

              {
                modalConfig.description && (
                  <AlertDialogDescription style={{ textAlign: 'center' }}>
                    {modalConfig.description}
                  </AlertDialogDescription>
                )
              }

              {modalConfig.content}

              <XStack
                pb={'$4'}
                gap={'$3'}
                style={{ justifyContent: 'center' }}
              >
                <AlertDialogCancel
                  displayWhenAdapted
                  asChild
                >
                  <Button
                    onPress={handleConfirm}
                    flex={1}
                  >
                    {modalConfig.cancelText || 'Cancel'}
                  </Button>
                </AlertDialogCancel>

                {
                  modalConfig.onConfirm && (
                    <AlertDialogAction
                      displayWhenAdapted
                      asChild
                    >
                      <Button
                        onPress={handleConfirm}
                        flex={1}
                      >
                        {modalConfig.confirmText || 'Confirm'}
                      </Button>
                    </AlertDialogAction>
                  )
                }
              </XStack>
            </AlertDialogContent>
          </AlertDialog>
        )
      }
    </ModalContext.Provider>
  )
}