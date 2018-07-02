export default (errors: (string | false)[]) => errors.filter(Boolean).length !== 0;
