import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/pages';

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
  publicImages: es.imageBucket(),
});

export default createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});
