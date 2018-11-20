import Sphinx from '../sphinx';

export default async function build(config) {
  const sphinx = new Sphinx(config);
  await sphinx.init();
}
