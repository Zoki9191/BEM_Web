export async function getDataFromApis() {
  const datas = [
    { name: "Fakestore", url: "https://fakestoreapi.com/products" },
    { name: "DummyJson", url: "https://dummyjson.com/products" },
  ];

  const responses = await Promise.allSettled(
    datas.map((el) =>
      fetch(el.url).then((response) => {
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        return response.json();
      }),
    ),
  );

  const successfulData = responses.flatMap((result, index) => {
    if (result.status === "fulfilled") {
      const apiName = datas[index].name;

      if (apiName === "DummyJson") {
        console.log(result.value);
        return result.value.products.map((product) => ({
          ...product,
          image: product.thumbnail,
        }));
      }
      console.log(result.value);

      return result.value;
    } else {
      console.error(`API ${datas[index].name} Fehler:`, result.reason);
      return [];
    }
  });

  return successfulData;
}
