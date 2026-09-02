import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { Button } from '@/components/ui/button'
import type { ConfirmDialogProps } from './types'

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  theme = 'primary',
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onClose={isLoading ? () => {} : onCancel} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-slate-900/40" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
          <DialogTitle className="text-lg font-semibold text-slate-900">{title}</DialogTitle>
          <p className="mt-2 text-sm text-slate-600">{message}</p>
          <div className="mt-6 flex justify-end gap-3">
            <Button theme="secondary" onClick={onCancel} disabled={isLoading}>
              {cancelLabel}
            </Button>
            <Button theme={theme} onClick={onConfirm} disabled={isLoading}>
              {isLoading ? 'Please wait...' : confirmLabel}
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
