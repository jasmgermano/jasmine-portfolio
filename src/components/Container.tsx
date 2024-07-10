import { ReactNode} from "react";

type containerProps = {
    children: ReactNode
}

export default function Container({ children }: Readonly<containerProps>) {
    return (
        <div className="container px-4 flex justify-between items-center mx-auto">
            {children}
        </div>
    );
}