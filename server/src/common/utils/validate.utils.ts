export function validateNumber (val: any) {
  const result = Number(val);
  return isNaN(result) ? null : result
}