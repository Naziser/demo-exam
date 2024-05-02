import { ref, reactive, watch } from 'vue';
import { defineStore } from 'pinia';
import { useApi } from '@/composables/api';
import type { ProfileData } from '@/types/ProfileData';

const { checkLogin, getUserProfile } = useApi();

export const useProfileStore = defineStore('profile', () => {
  const isAuthenticated = ref(false);
  const isAuthenticatedLoaded = ref(false);

  const profileData = ref<ProfileData>();

  const loading = reactive({
    get: false,
    edit: false,
  });
  const errors = reactive({
    get: false,
    edit: false,
  });

  watch(isAuthenticated, (newValue) => {
    if (newValue) getProfileData();
    else profileData.value = undefined;
  });

  async function updateAuthStatus() {
    isAuthenticated.value = (await checkLogin()).data.payload.active;
    isAuthenticatedLoaded.value = true;
  }

  async function getProfileData() {
    loading.get = true;
    errors.get = false;

    try {
      profileData.value = (await getUserProfile()).data;
    } catch {
      errors.get = true;
    }

    loading.get = false;
  }

  return {
    loading,
    errors,
    isAuthenticated,
    isAuthenticatedLoaded,
    updateAuthStatus,
    profileData,
    getProfileData,
  };
});
