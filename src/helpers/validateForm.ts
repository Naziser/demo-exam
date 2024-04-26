import { unref } from 'vue';
import type { Ref } from 'vue';
import type { Validation } from '@vuelidate/core';
import { useNotificationsStore } from '@/stores/NotificationsStore';

export async function validateForm(v$: Ref<Validation>) {
  const notificationsStore = useNotificationsStore();
  const isFormCorrect = await unref(v$).$validate();
  if (!isFormCorrect) {
    let hasRequiredError = false;
    for (const error of unref(v$).$errors) {
      if (error.$validator === 'required') {
        if (hasRequiredError) continue;
        hasRequiredError = true;
      }
      notificationsStore.createNotification({ type: 'error', message: unref(error.$message) });
    }
    return false;
  }
  return true;
}
