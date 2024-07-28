import { ReactNode} from "react";

type containerProps = {
    children: ReactNode
}

export default function Container({ children }: Readonly<containerProps>) {
    return (
        <div className="container mx-auto px-3 flex justify-between items-center sm:px-10 lg:px-20">
            {children}
        </div>
    );
}