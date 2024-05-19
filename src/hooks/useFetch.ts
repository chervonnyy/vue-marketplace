import { ref, type Ref } from "vue";

type Props = {
  endpoint: string;
  single?: boolean;
}

export const useFetch = <T>({ endpoint, single }: Props) => {
  const data: Ref<T | null> = ref(null);
  const error = ref<Error | null>(null);
  const loading = ref(true);

  // hardcoded values for the sake of the example
  // better to be placed in a separate .env file
  const storeId = '58958138';
  const token = 'public_7BxbJGWyDaZfSQqjVS5Ftr4jzXkS43UD';

  try {
    loading.value = true;
    fetch(`https://app.ecwid.com/api/v3/${storeId}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then(async (res) => {
        console.log(res)
        data.value = (single ? res : res.items) as T;
      });
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }

  return { data, error, loading };
}
