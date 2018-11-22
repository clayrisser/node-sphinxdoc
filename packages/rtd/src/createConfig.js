export default function(config) {
  return {
    ...config,
    output: 'html',
    serve: config.output === 'html'
  };
}
