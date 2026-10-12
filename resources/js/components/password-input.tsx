import { Eye, EyeOff } from 'lucide-react';
import { forwardRef, useState, type InputHTMLAttributes } from 'react';
import { Input } from '@/components/ui/input';

const PasswordInput = forwardRef<
    HTMLInputElement,
    InputHTMLAttributes<HTMLInputElement>
>(function PasswordInput(props, ref) {
    const [visible, setVisible] = useState(false);

    return (
        <div className="relative">
            <Input
                {...props}
                ref={ref}
                type={visible ? 'text' : 'password'}
                className={`${props.className ?? ''} pr-10`}
            />
            <button
                type="button"
                className="absolute inset-y-0 right-0 inline-flex items-center px-3 text-muted-foreground"
                aria-label={visible ? 'Hide password' : 'Show password'}
                aria-pressed={visible}
                onClick={() => setVisible((current) => !current)}
            >
                {visible ? (
                    <EyeOff aria-hidden="true" className="h-4 w-4" />
                ) : (
                    <Eye aria-hidden="true" className="h-4 w-4" />
                )}
            </button>
        </div>
    );
});

export default PasswordInput;
