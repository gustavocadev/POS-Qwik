import {
  type NoSerialize,
  noSerialize,
  useStore,
  useVisibleTask$,
} from '@builder.io/qwik';
import { type FirebaseStorage, getStorage } from 'firebase/storage';
import { firebaseApp } from '~/lib/firebase';

// this  returns a storage
export const useFireBaseStorage = () => {
  const store = useStore<{ storageInstance: NoSerialize<FirebaseStorage> }>({
    storageInstance: undefined,
  });

  useVisibleTask$(() => {
    // This works only in the browser
    const storage = getStorage(firebaseApp);
    store.storageInstance = noSerialize(storage);
  });

  return store.storageInstance;
};
