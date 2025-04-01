import { CircleHelpIcon, UserIcon } from "lucide-react";
import { Badge } from "~/lib/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/lib/components/ui/hover-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/lib/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "~/lib/components/ui/avatar";

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  provider?: string;
  sessions?: {
    expiresAt: string;
    ipAddress?: string;
    userAgent?: string;
  }[];
}

const users: User[] = [
  {
    id: "1",
    name: "Max Mustermann",
    email: "max@example.com",
    emailVerified: true,
    image: "https://example.com/avatar1.jpg",
    createdAt: "2023-10-01T12:00:00Z",
    updatedAt: "2024-02-15T09:30:00Z",
    lastLogin: "2024-02-20T14:25:00Z",
    provider: "google",
    sessions: [
      {
        expiresAt: "2024-03-20T14:25:00Z",
        ipAddress: "192.168.1.1",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    ]
  },
  {
    id: "2",
    name: "Erika Musterfrau",
    email: "erika@example.com",
    emailVerified: false,
    image: null,
    createdAt: "2023-11-05T08:15:00Z",
    updatedAt: "2024-01-30T11:20:00Z",
    lastLogin: "2024-01-30T11:20:00Z",
    provider: "github"
  },
  {
    id: "3",
    name: "John Doe",
    email: "john@example.com",
    emailVerified: true,
    image: "https://example.com/avatar3.jpg",
    createdAt: "2024-01-10T16:45:00Z",
    updatedAt: "2024-02-18T10:10:00Z",
    lastLogin: "2024-02-18T10:10:00Z",
    provider: "email"
  },
];

/*
function VerificationBadge({ verified }: { verified: boolean }) {
  return (
    <Badge variant={verified ? "default" : "warning"} className="rounded">
      {verified ? "Verified" : "Unverified"}
    </Badge>
  );
}

function ProviderBadge({ provider }: { provider?: string }) {
  if (!provider) return null;

  const variants = {
    google: "destructive",
    github: "secondary",
    email: "outline"
  } as const;

  return (
    <Badge variant={variants[provider as keyof typeof variants] || "outline"} className="rounded">
      {provider}
    </Badge>
  );
}
*/

export function UserTable() {
  return (
    <Table>
      <TableHeader className="select-none">
        <TableRow>
          <TableHead className="w-[60px]">User</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          {/*
          <TableHead>Status</TableHead>
          <TableHead>Provider</TableHead>
          */}
          <TableHead className="text-right">Last Login</TableHead>
          <TableHead className="text-right w-[65px]">Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <Avatar className="h-8 w-8">
                {user.image && <AvatarImage src={user.image} alt={user.name} />}
                <AvatarFallback>
                  <UserIcon size={16} />
                </AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            {/*
            <TableCell>
              <VerificationBadge verified={user.emailVerified} />
            </TableCell>
            <TableCell>
              <ProviderBadge provider={user.provider} />
            </TableCell>
            */}
            <TableCell className="text-right">
              {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}
            </TableCell>
            <TableCell className="flex justify-end items-center">
              <UserDetailsTooltip user={user} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function UserDetailsTooltip({ user }: { user: User }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="inline-block">
          <div className="flex items-center gap-1.5">
            <Badge className="p-0.5 rounded-full" variant="outline">
              <CircleHelpIcon size={16} />
            </Badge>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-[350px] text-left">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              {user.image && <AvatarImage src={user.image} alt={user.name} />}
              <AvatarFallback>
                <UserIcon size={24} />
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">{user.name}</h2>
              <p className="text-muted-foreground text-sm">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">Status</p>
              <p>{user.emailVerified ? "Verified" : "Unverified"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Provider</p>
              <p>{user.provider || "Unknown"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Created</p>
              <p>{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Last Login</p>
              <p>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}</p>
            </div>
          </div>

          {user.sessions && user.sessions.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium text-sm">Session Info</h3>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="text-muted-foreground">Expires:</span>{" "}
                  {new Date(user.sessions[0].expiresAt).toLocaleString()}
                </p>
                {user.sessions[0].ipAddress && (
                  <p>
                    <span className="text-muted-foreground">IP:</span>{" "}
                    {user.sessions[0].ipAddress}
                  </p>
                )}
                {user.sessions[0].userAgent && (
                  <p className="truncate">
                    <span className="text-muted-foreground">Device:</span>{" "}
                    {user.sessions[0].userAgent}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
