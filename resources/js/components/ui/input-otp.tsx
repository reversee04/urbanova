import { OTPInput, OTPInputContext } from 'input-otp';
import type { ComponentProps, HTMLAttributes } from 'react';
import { useContext } from 'react';
import { cn } from '@/lib/utils';

export function InputOTP({
    className,
    containerClassName,
    ...props
}: ComponentProps<typeof OTPInput>) {
    return (
        <OTPInput
            containerClassName={cn(
                'flex items-center gap-2 has-[:disabled]:opacity-50',
                containerClassName,
            )}
            className={className}
            {...props}
        />
    );
}

export function InputOTPGroup({
    className,
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('flex items-center', className)} {...props} />;
}

export function InputOTPSlot({
    className,
    index,
    ...props
}: HTMLAttributes<HTMLDivElement> & { index: number }) {
    const { slots } = useContext(OTPInputContext);
    const slot = slots[index];

    if (!slot) {
        return null;
    }

    return (
        <div
            data-active={slot.isActive}
            className={cn(
                'relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm first:rounded-l-md first:border-l last:rounded-r-md',
                slot.isActive && 'z-10 ring-2 ring-ring',
                className,
            )}
            {...props}
        >
            {slot.char}
            {slot.hasFakeCaret && (
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <span className="h-4 w-px animate-caret-blink bg-foreground" />
                </span>
            )}
        </div>
    );
}
