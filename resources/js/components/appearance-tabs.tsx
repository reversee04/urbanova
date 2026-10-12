import { useAppearance, type Appearance } from '@/hooks/use-appearance';
import { Button } from '@/components/ui/button';

const options: Appearance[] = ['light', 'dark', 'system'];

export default function AppearanceTabs() {
    const { appearance, updateAppearance } = useAppearance();

    return (
        <div className="flex flex-wrap gap-2" aria-label="Appearance">
            {options.map((option) => (
                <Button
                    key={option}
                    type="button"
                    variant={appearance === option ? 'default' : 'outline'}
                    aria-pressed={appearance === option}
                    onClick={() => updateAppearance(option)}
                >
                    {option[0].toUpperCase() + option.slice(1)}
                </Button>
            ))}
        </div>
    );
}
