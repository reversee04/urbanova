import type { TeamInvitationContext } from '@/types';

export default function TeamInvitationAlert({
    invitation,
    action,
}: {
    invitation: TeamInvitationContext;
    action: string;
}) {
    return (
        <div
            role="status"
            className="rounded-md border border-border bg-muted p-4 text-sm"
        >
            You were invited to join {invitation.teamName}. {action} to
            continue.
        </div>
    );
}
