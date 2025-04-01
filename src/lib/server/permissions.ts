const ROLES = {
  default: ["list:diary", "read:diary"] as const,
  editor: [
    "list:diary",
    "read:diary",
    "create:diary",
    "editOwn:diary",
    "deleteOwn:diary",
  ] as const,
  admin: [
    "list:diary",
    "read:diary",
    "create:diary",
    "editOwn:diary",
    "edit:diary",
    "deleteOwn:diary",
    "delete:diary",
  ] as const,
} as const;

export type Role = keyof typeof ROLES;
export type Permission = (typeof ROLES)[Role][number];

export const allPossiblePermissions = Object.values(
  ROLES,
).flat() as readonly Permission[];
export const allPossibleRoles = Object.keys(ROLES) as readonly Role[];

export function hasPermission(
  permission: Permission,
  user?: { id: string; role: Role },
): boolean {
  if ((ROLES["default"] as readonly Permission[]).includes(permission)) return true;
  if (!user) return false;
  if (user.role === "admin") return true;
  return (ROLES[user.role] as readonly Permission[]).includes(permission);
}
