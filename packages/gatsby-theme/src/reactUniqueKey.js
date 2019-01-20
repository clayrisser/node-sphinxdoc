export default function reactUniqueKey(id = '') {
  return (
    (+new Date()).toString(32) +
    Math.random()
      .toString(32)
      .substr(2) +
    id.toString(32)
  );
}
