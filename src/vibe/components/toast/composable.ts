import { ref } from "vue"

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  delay: number
}

const useToast = () => {
  const toasts = ref<Toast[]>([]);

  const addToast = (message: string, options: { type?: 'success' | 'error' | 'warning' | 'info', delay?: number } = {}) => {
    const id = Math.random().toString(36).substring(2, 9);
    const toast: Toast = {
      id,
      message,
      type: options.type || 'info',
      delay: options.delay || 1500,
    };
    toasts.value.push(toast);

    // Auto dismiss after delay
    setTimeout(() => {
      removeToast(id);
    }, toast.delay);
  };

  const removeToast = (id: string) => {
    toasts.value = toasts.value.filter(t => t.id !== id);
  };

  return {
    toasts,
    addToast,
    removeToast,
  };
};

const { toasts, addToast, removeToast } = useToast();

const toast = {
  info: (msg: string) => addToast(msg, { type: "info" }),
  success: (msg: string) => addToast(msg, { type: "success" }),
  warning: (msg: string) => addToast(msg, { type: "warning" }),
  error: (msg: string) => addToast(msg, { type: "error" }),
  remove: removeToast,
}

export { toasts, toast }