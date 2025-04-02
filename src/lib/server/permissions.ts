export const allPossibleRoles = ["default", "editor", "admin"] as const;
export type AllPossibleRoles = (typeof allPossibleRoles)[number];

export const ROLES = {
  default: ["list:all-users", "list:diary", "readOwn:diary", "read:diary"] as const,
  editor: [
    "list:all-users",
    "list:diary",
    "listAll:diary",
    "read:diary",
    "readOwn:diary",
    "create:diary",
    "editOwn:diary",
    "deleteOwn:diary",
  ] as const,
  admin: [
    "list:all-users",
    "list:diary",
    "listAll:diary",
    "read:diary",
    "readOwn:diary",
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

export function hasPermission(
  permission: Permission,
  user?: { id: string; role: Role | string },
): boolean {
  if ((ROLES["default"] as readonly Permission[]).includes(permission)) return true;
  if (!user) return false;

  if (user.role === "admin") return true;
  if (!(user.role in ROLES)) return false;

  return (ROLES[user.role as Role] as readonly Permission[]).includes(permission);
}
