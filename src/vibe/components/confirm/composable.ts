import { ref } from 'vue';

export interface ConfirmationOptions {
  title: string;
  message: string;
  accept: () => Promise<void>;
  reject?: () => Promise<void>;
}

const confirmation = ref<ConfirmationOptions | null>(null);

function requireConfirmation(options: ConfirmationOptions): void {
  confirmation.value = options;
}

function closeConfirmation(): void {
  confirmation.value = null;
}

export { confirmation, requireConfirmation, closeConfirmation };
