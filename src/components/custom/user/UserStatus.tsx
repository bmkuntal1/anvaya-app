import { Badge } from '@/components/ui/badge';

export const UserStatus = ({ status }: { status: string }) => {
  return <Badge variant={status === 'active' ? 'default' : 'destructive'} className="capitalize text-xs pt-0">{status}</Badge>;
};