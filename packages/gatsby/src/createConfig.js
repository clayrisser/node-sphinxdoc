export default function(config) {
  return {
    ...config,
    output: 'gatsby',
    serve: config.output === 'html' || config.output === 'gatsby'
  };
}
