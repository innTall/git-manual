import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useLazyQuery, useApolloClient } from '@vue/apollo-composable';
import { CURRENT_USER } from '../graphql/queries.js';
import { useRouter } from 'vue-router';

export const useAuth = defineStore('auth', () => {
  const router = useRouter()
  const { client } = useApolloClient()
  const currentUser = ref(null)

  const { onResult, load, networkStatus, refetch, onError } = useLazyQuery(
    CURRENT_USER,
    null,
    {
      fetchPolicy: 'no-cache'
    }
  );

  const getUser = () => {
    return new Promise((resolve) => {
      if (!localStorage.getItem('todoapp-token')) {
        currentUser.value = null
        return resolve(null)
      }
      if (currentUser.value !== null) {
        return resolve(currentUser)
      }
      if (networkStatus.value) {
        refetch()
      } else {
        load()
      }
      onResult((result) => {
        if (result.data?.currentUser) {
          currentUser.value = result.data.currentUser
          resolve(currentUser)
        }
      })
      onError(() => {
        resolve(null)
      })
    })
  };
  const logout = () => {
    localStorage.removeItem('todoapp-token')
    client.cache.reset()
    router.push({ name: 'Login' })
  }
  return { currentUser, getUser, logout }
});