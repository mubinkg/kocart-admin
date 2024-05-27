export default function OutlineItem({count, title, icon}:any) {
    return (
        <div className="col-3 text-white">
            <div className="border-round-sm bg-blue-400 px-4 flex justify-content-between m-2">
                <div>
                    <h2>{count}</h2>
                    <p>{title}</p>
                </div>
                <div>
                    {icon}
                </div>
            </div>
        </div>
    )
}