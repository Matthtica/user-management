export function serialize_permission(permission: boolean[]): string {
  return permission.map((value) => {
    value ? 'T' : 'F'
  }).join('|');
}

export function deserialize_permission(permission: string): boolean[] {
  return permission.split('|').map((value) => {
    return value === 'T';
  });
}

export function deserializeToDisplayString(permission: string): string {
  const lookup = ['Create', 'Read', 'Update', 'Delete'];
  let result_stack: string[] = [];
  permission.split('|').forEach((value, index) => {
    if (value === 'T') {
      result_stack.push(lookup[index]);
    }
  });
  return result_stack.join(' | ');
}
