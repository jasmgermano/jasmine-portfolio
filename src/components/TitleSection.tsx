type titleProps = {
    title: string;
    subtitle?: string;
}

export default function TitleSection({ title, subtitle }: Readonly<titleProps>) {
    return (
        <h1 className="text-4xl font-bold text-left text-light-green font-stroke-out drop-shadow-custom uppercase -rotate-2 lg:text-5xl">
            {title}
            {subtitle && <span className="block -mt-2">{subtitle}</span>}
        </h1>
    );
}