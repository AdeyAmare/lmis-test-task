function Header() {
    return (
        <div className="flex justify-between px-10 items-center py-2 border-b-2">
            <h1 className="font-bold text-xl">Ethiopian National COC</h1>
            <div className="flex items-center gap-x-2">
                <div className="flex flex-col">
                    <p className="font-semibold">Amanuel Belay</p>
                    <p className="text-sm">Medical Doctor</p>
                </div>
                <img src='src/assets/profilepic.jpeg' width={50} className="rounded-full" />
            </div>
        </div>

    )
}

export default Header