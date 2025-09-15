// Dynamic imports to reduce initial compilation time
const loadDependencies = async () => {
  const [
    { DataAPIClient },
    { AstraDBVectorStore },
    { OpenAIEmbeddings }
  ] = await Promise.all([
    import("@datastax/astra-db-ts"),
    import("@langchain/community/vectorstores/astradb"),
    import("@langchain/openai")
  ]);
  
  return { DataAPIClient, AstraDBVectorStore, OpenAIEmbeddings };
};

const endpoint = process.env.ASTRA_DB_API_ENDPOINT || "";
const token = process.env.ASTRA_DB_APPLICATION_TOKEN || "";
const collection = process.env.ASTRA_DB_COLLECTION || "";

if (!endpoint || !token || !collection) {
  throw new Error("Please set environmental variables for Astra DB!");
}

export async function getVectorStore() {
  const { AstraDBVectorStore, OpenAIEmbeddings } = await loadDependencies();
  
  return AstraDBVectorStore.fromExistingIndex(
    new OpenAIEmbeddings({ model: "text-embedding-3-small" }),
    {
      token,
      endpoint,
      collection,
      collectionOptions: {
        vector: { dimension: 1536, metric: "cosine" },
      },
    },
  );
}

export async function getEmbeddingsCollection() {
  const { DataAPIClient } = await loadDependencies();
  
  const client = new DataAPIClient(token);
  const db = client.db(endpoint);

  return db.collection(collection);
}
