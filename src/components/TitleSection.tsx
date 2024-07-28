type titleProps = {
    title: string;
    subtitle?: string;
    color?: string;
}

export default function TitleSection({ title, subtitle, color }: Readonly<titleProps>) {
    return (
        <h1 className={`text-4xl font-bold text-left ${color} font-stroke-out drop-shadow-custom uppercase -rotate-2 lg:text-5xl animate-float`}>
            {title}
            {subtitle && <span className="block -mt-2">{subtitle}</span>}
        </h1>
    );
}