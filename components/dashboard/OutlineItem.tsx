export default function OutlineItem({count, title, icon}:any) {
    return (
        <div className="col-3 m-2 bg-blue-400 text-white border-round-sm">
            <div className="flex justify-content-between">
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