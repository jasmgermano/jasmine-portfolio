import { ReactNode} from "react";

type containerProps = {
    children: ReactNode
}

export default function Container({ children }: Readonly<containerProps>) {
    return (
        <div className="container mx-auto px-3 flex justify-between items-center lg:px-10">
            {children}
        </div>
    );
}