import Menu from "./Menu";

export default function Header() {
    return (
        <header className="bg-pattern bg-center h-[700px] bg-no-repeat bg-cover">
            <div className="bg-opacity-55 bg-white h-full">
                <div className="pt-2">
                    <Menu />
                </div>
            </div>
        </header>
    )
}