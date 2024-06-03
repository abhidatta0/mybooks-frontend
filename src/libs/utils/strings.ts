export const pluralize = function(str: string, count: number, append="s"){
  return str+(count > 1 ? append:'');
}