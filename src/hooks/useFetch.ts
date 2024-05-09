import { ref } from "vue";

type Props = {
  endpoint: string;
  single?: boolean;
}

export const useFetch = ({ endpoint, single }: Props) => {
  const data = ref(null);

  // error and loading are not used in this example
  const error = ref(null);
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
      .then((res) => {
        console.log(res)
        data.value = (single) ? res : res.items;
      });
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }

  return { data, error, loading };
}
